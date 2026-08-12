'use client'
import { usePathname, useRouter } from 'next/navigation'

export function LangSwitch() {
  const pathname = usePathname()
  const router = useRouter()
  const isZh = !pathname.startsWith('/en')

  const targetLabel = isZh ? 'EN' : '中'

  // Strip current locale prefix and prepend opposite locale.
  // pathname '/' or '/zh/*' → '/en[/rest]'
  // pathname '/en' or '/en/*' → '/zh[/rest]'
  const rest = isZh
    ? pathname.replace(/^\/(zh)?/, '')  // remove leading /zh or /
    : pathname.replace(/^\/en/, '')     // remove leading /en
  const targetPath = isZh ? '/en' + (rest || '') : '/zh' + (rest || '')

  return (
    <button
      onClick={() => router.push(targetPath)}
      className="fixed top-4 right-4 z-50 px-3 py-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)]/80 backdrop-blur text-xs font-mono hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
      aria-label={isZh ? 'Switch to English' : '切换到中文'}
    >
      {targetLabel}
    </button>
  )
}
