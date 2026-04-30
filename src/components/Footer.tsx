export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] py-10 px-6">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-sm text-[var(--color-text-muted)]">
        {/* Left — project description */}
        <div className="text-center sm:text-left">
          <p className="font-medium text-[var(--color-text-secondary)] mb-1">
            dsnb.help
          </p>
          <p>
            DeepSeek 情感叙事落地页 ·{" "}
            <a
              href="https://github.com/hanmahong5-arch/lurus-switch"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--color-primary-light)] transition-colors duration-150"
            >
              Switch Desktop
            </a>{" "}
            出品
          </p>
        </div>

        {/* Center — ICP placeholder (.help 无需 ICP) */}
        <p className="text-xs opacity-60 hidden sm:block">
          .help 域名无需 ICP 备案
        </p>

        {/* Right — contact & social */}
        <div className="flex items-center gap-5">
          <a
            href="mailto:marvin.uu@gmail.com"
            className="hover:text-[var(--color-primary-light)] transition-colors duration-150"
          >
            邮件
          </a>
          <a
            href="https://github.com/hanmahong5-arch/2c-bs-dsnb"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--color-primary-light)] transition-colors duration-150 flex items-center gap-1"
          >
            <GitHubIcon />
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}

function GitHubIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}
