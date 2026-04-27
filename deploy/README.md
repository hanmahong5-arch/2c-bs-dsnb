# dsnb.help 部署手册

落地策略：R6（`43.226.38.244`，三丰云，32C/32G/300G）docker-compose + Caddy 自动 TLS。

## 一次性准备

1. **DNS（阿里云控制台手动）**
   ```
   类型   主机   值              TTL
   A     @     43.226.38.244   600
   A     www   43.226.38.244   600
   ```

2. **GHCR 镜像构建**
   - 把 `2c-bs-dsnb/` 推到 `https://github.com/hanmahong5-arch/2c-bs-dsnb`（私有 OK）
   - GitHub Actions 自动构建 + push 到 `ghcr.io/hanmahong5-arch/2c-bs-dsnb:latest`
   - 包可见性设为 public（或在 R6 配置 ghcr-pull-secret）

3. **R6 端口检查**（必须，docker-compose 占用 80/443）
   ```bash
   ssh root@43.226.38.244 'ss -tlnp | grep -E ":(80|443) "'
   ```
   如果有冲突，先停掉占用进程或改 `Caddyfile` + compose ports。

## 部署

```bash
ssh root@43.226.38.244
mkdir -p /data/dsnb && cd /data/dsnb
# 把 deploy/docker-compose.yml + deploy/Caddyfile 拷过来
# scp -r deploy/ root@43.226.38.244:/data/dsnb/

docker compose pull
docker compose up -d
docker compose logs -f --tail=50
```

首次启动 Caddy 会向 Let's Encrypt 申请证书（30-60 秒），等 `dsnb-caddy` 日志看到 `certificate obtained` 即成功。

## 验证

```bash
curl -I https://dsnb.help
# 期望 HTTP/2 200 + Strict-Transport-Security 头

curl -I https://www.dsnb.help
# 期望 301 → https://dsnb.help
```

## 更新

```bash
ssh root@43.226.38.244 'cd /data/dsnb && docker compose pull && docker compose up -d'
```

GitHub Actions 每次 push 到 main 就会刷新 `:latest` tag，R6 上 `pull` 一下即可热更新。

## 回滚

镜像是 `main-<sha7>` 双 tag，回滚：
```bash
docker compose stop dsnb-web
docker pull ghcr.io/hanmahong5-arch/2c-bs-dsnb:main-<上一个sha>
# 临时改 docker-compose.yml 的 image tag → docker compose up -d dsnb-web
```

## 资源占用

预估：dsnb-web ≈ 80MB RAM, caddy ≈ 30MB RAM。R6 32G 完全无压力。

## 已知风险

- R6 已有 supabase（zhongtie-oa）跑在 8100/8443，不冲突。但若 R6 主机有 nginx 监听 80/443 需要先 stop。
- Caddy 申请 LE 证书需要 80 端口能从公网访问 → 三丰云防火墙必须开放 80/443。
- `.help` 是 nTLD，不需要 ICP 备案，三丰云直接承载。
