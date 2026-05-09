export function SwitchCTA() {
  return (
    <section className="py-16 text-center">
      <h2 className="text-3xl font-bold mb-4">Start Distributing AI</h2>
      <p className="text-[var(--color-text-secondary)] mb-8 max-w-lg mx-auto">
        Join the LurusTech Reseller Program. Earn commissions distributing Switch to your network.
      </p>
      <div className="flex gap-4 justify-center flex-wrap">
        <a
          href="https://switch.lurustech.com/partner"
          className="px-6 py-3 bg-[var(--color-primary)] text-white rounded-lg font-semibold hover:bg-[var(--color-primary-deep)] transition-colors"
        >
          Become a Reseller Partner
        </a>
        <a
          href="https://switch.lurustech.com/download"
          className="px-6 py-3 border border-[var(--color-border)] text-[var(--color-text-primary)] rounded-lg font-semibold hover:border-[var(--color-border-hover)] transition-colors"
        >
          Download Switch
        </a>
      </div>
    </section>
  );
}
