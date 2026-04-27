# dsnb.help 部署手册

R6（`43.226.38.244`）上 host nginx 已占 80/443，反代多个 docker/k3s 服务。
dsnb 复用此 nginx，自身只跑一个绑 loopback 的 Next.js 容器。

## 拓扑

```
公网 → R6 nginx (host, 80/443)
        ├── *.lurus.cn → 各服务（已存在）
        └── dsnb.help / www.dsnb.help → 127.0.0.1:18301 (dsnb-web)
```

## 一次性准备

1. **DNS（阿里云控制台手动）**

   ```
   类型   主机   值              TTL
   A     @     43.226.38.244   600
   A     www   43.226.38.244   600
   ```

2. **GHCR 镜像** — 已配置 GitHub Actions 推 `ghcr.io/hanmahong5-arch/2c-bs-dsnb:latest`，仓库 public，R6 直接 pull 不需 secret。

## 部署

```bash
ssh root@43.226.38.244
mkdir -p /data/dsnb && cd /data/dsnb
# 把 deploy/docker-compose.yml + nginx-dsnb.conf 拷过来
# scp deploy/docker-compose.yml deploy/nginx-dsnb.conf root@43.226.38.244:/data/dsnb/

# 1. 启动 dsnb-web 容器（绑 127.0.0.1:18301）
docker compose pull
docker compose up -d
docker compose logs --tail=30
curl -I http://127.0.0.1:18301   # 期望 200

# 2. 安装 nginx vhost
cp /data/dsnb/nginx-dsnb.conf /etc/nginx/sites-enabled/dsnb
nginx -t && systemctl reload nginx
curl -I -H "Host: dsnb.help" http://127.0.0.1   # 期望 200，nginx 转发到 18301
```

## TLS（DNS 生效后）

DNS A 记录添加后等 5-10 分钟传播，然后：

```bash
# 安装 snap certbot（如未装）
snap install --classic certbot 2>/dev/null
ln -sf /snap/bin/certbot /usr/bin/certbot

# 申请证书 + 自动改 vhost 加 443 server block
certbot --nginx -d dsnb.help -d www.dsnb.help \
  --non-interactive --agree-tos -m ops@lurus.cn --redirect

# 验证
curl -I https://dsnb.help
```

certbot 会自动写 `/etc/letsencrypt/live/dsnb.help/`，配 nginx 自动续期 timer。

## 更新（CI 推完镜像后）

```bash
ssh root@43.226.38.244 'cd /data/dsnb && docker compose pull && docker compose up -d'
```

GHCR :latest tag 每次 main push 自动刷新。

## 回滚

```bash
ssh root@43.226.38.244 'cd /data/dsnb && \
  docker pull ghcr.io/hanmahong5-arch/2c-bs-dsnb:main-<旧sha7> && \
  docker compose stop dsnb-web && \
  sed -i "s|:latest|:main-<旧sha7>|" docker-compose.yml && \
  docker compose up -d dsnb-web'
```

## 资源占用

dsnb-web ≈ 80MB RAM，单 pod。R6 (32G) 完全无压。

## 已知风险

- 申请 LE 证书前 DNS 必须先生效（HTTP-01 challenge 走 80 端口，需要 dsnb.help 已解析到 R6）
- nginx 已存在多个 vhost，不要 `nginx -s stop`，只用 `systemctl reload nginx`
- `dsnb` 这个 vhost 文件名不要与已有冲突（`ls /etc/nginx/sites-enabled/` 现有：lurus-stage, zhongtie-oa, zhongtie-oa-test）
