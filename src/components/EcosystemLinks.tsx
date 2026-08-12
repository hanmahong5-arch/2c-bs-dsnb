// DeepSeek ecosystem links — grouped by category.
// Links verified via web search as of May 2026.

type LinkItem = {
  label: string
  href: string
  tagline: string
}

type Group = {
  title: string
  links: LinkItem[]
}

const GROUPS_EN: Group[] = [
  {
    title: 'Official',
    links: [
      { label: 'deepseek.com', href: 'https://www.deepseek.com', tagline: 'DeepSeek homepage' },
      { label: 'chat.deepseek.com', href: 'https://chat.deepseek.com', tagline: 'DeepSeek Chat' },
      { label: 'platform.deepseek.com', href: 'https://platform.deepseek.com', tagline: 'API platform' },
      { label: 'api-docs.deepseek.com', href: 'https://api-docs.deepseek.com', tagline: 'API documentation' },
      { label: 'GitHub · deepseek-ai', href: 'https://github.com/deepseek-ai', tagline: '34+ open-source repos' },
      { label: 'Hugging Face · deepseek-ai', href: 'https://huggingface.co/deepseek-ai', tagline: 'Model weights & collections' },
    ],
  },
  {
    title: 'Landmark Models',
    links: [
      { label: 'DeepSeek-V3 (HF)', href: 'https://huggingface.co/deepseek-ai/DeepSeek-V3', tagline: '671B MoE, frontier open-source' },
      { label: 'DeepSeek-R1 (HF)', href: 'https://huggingface.co/deepseek-ai/DeepSeek-R1', tagline: 'Reasoning model, o1-class' },
      { label: 'DeepSeek-V3 (GitHub)', href: 'https://github.com/deepseek-ai/DeepSeek-V3', tagline: 'Tech report & training code' },
      { label: 'DeepSeek-R1 (GitHub)', href: 'https://github.com/deepseek-ai/DeepSeek-R1', tagline: 'Pure RL reasoning training' },
    ],
  },
  {
    title: 'Inference Infrastructure',
    links: [
      { label: 'vLLM', href: 'https://github.com/vllm-project/vllm', tagline: 'Production serving, PagedAttention' },
      { label: 'SGLang', href: 'https://github.com/sgl-project/sglang', tagline: 'RadixAttention, DeepSeek-recommended' },
      { label: 'Ollama', href: 'https://github.com/ollama/ollama', tagline: 'Local inference, one command' },
      { label: 'llama.cpp', href: 'https://github.com/ggml-org/llama.cpp', tagline: 'CPU/GPU, GGUF format' },
    ],
  },
  {
    title: 'Hosted Access',
    links: [
      { label: 'OpenRouter', href: 'https://openrouter.ai/deepseek', tagline: '22+ DeepSeek models, free tier' },
      { label: 'Together AI', href: 'https://www.together.ai', tagline: 'H100/H200 clusters, SLA-backed' },
      { label: 'Fireworks AI', href: 'https://fireworks.ai', tagline: 'Fast inference, 250% higher throughput' },
    ],
  },
  {
    title: 'Chinese Resources',
    links: [
      { label: 'ModelScope · deepseek-ai', href: 'https://modelscope.cn/organization/deepseek-ai', tagline: '国内模型下载，无需翻墙' },
    ],
  },
]

const GROUPS_ZH: Group[] = [
  {
    title: '官方入口',
    links: [
      { label: 'deepseek.com', href: 'https://www.deepseek.com', tagline: 'DeepSeek 官网' },
      { label: 'chat.deepseek.com', href: 'https://chat.deepseek.com', tagline: 'DeepSeek Chat 对话' },
      { label: 'platform.deepseek.com', href: 'https://platform.deepseek.com', tagline: 'API 开放平台' },
      { label: 'api-docs.deepseek.com', href: 'https://api-docs.deepseek.com', tagline: 'API 文档' },
      { label: 'GitHub · deepseek-ai', href: 'https://github.com/deepseek-ai', tagline: '34+ 开源仓库' },
      { label: 'Hugging Face · deepseek-ai', href: 'https://huggingface.co/deepseek-ai', tagline: '模型权重与合集' },
    ],
  },
  {
    title: '代表模型',
    links: [
      { label: 'DeepSeek-V3 (HF)', href: 'https://huggingface.co/deepseek-ai/DeepSeek-V3', tagline: '671B MoE，前沿开源模型' },
      { label: 'DeepSeek-R1 (HF)', href: 'https://huggingface.co/deepseek-ai/DeepSeek-R1', tagline: '推理模型，媲美 o1' },
      { label: 'DeepSeek-V3 (GitHub)', href: 'https://github.com/deepseek-ai/DeepSeek-V3', tagline: '技术报告与训练代码' },
      { label: 'DeepSeek-R1 (GitHub)', href: 'https://github.com/deepseek-ai/DeepSeek-R1', tagline: '纯强化学习推理训练' },
    ],
  },
  {
    title: '推理基础设施',
    links: [
      { label: 'vLLM', href: 'https://github.com/vllm-project/vllm', tagline: '生产首选，PagedAttention' },
      { label: 'SGLang', href: 'https://github.com/sgl-project/sglang', tagline: 'DeepSeek 推荐，RadixAttention' },
      { label: 'Ollama', href: 'https://github.com/ollama/ollama', tagline: '本地推理，一键启动' },
      { label: 'llama.cpp', href: 'https://github.com/ggml-org/llama.cpp', tagline: 'CPU/GPU，GGUF 格式标准' },
    ],
  },
  {
    title: '第三方托管',
    links: [
      { label: 'OpenRouter', href: 'https://openrouter.ai/deepseek', tagline: '22+ DeepSeek 模型，含免费配额' },
      { label: 'Together AI', href: 'https://www.together.ai', tagline: 'H100/H200 集群，SLA 保障' },
      { label: 'Fireworks AI', href: 'https://fireworks.ai', tagline: '高吞吐快速推理' },
    ],
  },
  {
    title: '国内资源',
    links: [
      { label: 'ModelScope · deepseek-ai', href: 'https://modelscope.cn/organization/deepseek-ai', tagline: '国内模型下载，无需翻墙' },
    ],
  },
]

function LinkCard({ item }: { item: LinkItem }) {
  return (
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col gap-0.5 px-4 py-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-primary)] transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
    >
      <span className="text-sm font-mono text-[var(--color-text-secondary)] group-hover:text-[var(--color-primary-light)] transition-colors duration-150 truncate">
        {item.label}
      </span>
      <span className="text-xs text-[var(--color-text-muted)] leading-snug">
        {item.tagline}
      </span>
    </a>
  )
}

function GroupCard({ group }: { group: Group }) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-xs font-semibold tracking-widest uppercase text-[var(--color-text-muted)]">
        {group.title}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {group.links.map((link) => (
          <LinkCard key={link.href} item={link} />
        ))}
      </div>
    </div>
  )
}

type EcosystemLinksProps = {
  locale?: 'en' | 'zh'
}

export function EcosystemLinks({ locale = 'en' }: EcosystemLinksProps) {
  const groups = locale === 'zh' ? GROUPS_ZH : GROUPS_EN
  const heading = locale === 'zh' ? 'DeepSeek 生态导航' : 'DeepSeek Ecosystem'
  const subheading =
    locale === 'zh'
      ? '官方工具、开源模型、推理框架与托管服务一览'
      : 'Official tools, open-source models, inference frameworks, and hosted services'

  return (
    <section className="max-w-4xl mx-auto px-6 py-16">
      <div className="mb-10 text-center">
        <p className="eyebrow mb-3">Resources</p>
        <h2 className="text-2xl sm:text-3xl font-bold text-[var(--color-text-primary)] mb-3">
          {heading}
        </h2>
        <p className="text-sm text-[var(--color-text-muted)] max-w-xl mx-auto">
          {subheading}
        </p>
      </div>
      <div className="flex flex-col gap-8">
        {groups.map((group) => (
          <GroupCard key={group.title} group={group} />
        ))}
      </div>
    </section>
  )
}
