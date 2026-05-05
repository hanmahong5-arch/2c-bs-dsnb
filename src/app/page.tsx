import { loadContentSync } from "@/lib/content";
import { Hero } from "@/components/Hero";
import { IntroSection } from "@/components/IntroSection";
import { Timeline } from "@/components/Timeline";
import { ProductGallery } from "@/components/ProductGallery";
import { ClosingCTA } from "@/components/ClosingCTA";
import { Footer } from "@/components/Footer";
import { InAppBrowserHint } from "@/components/InAppBrowserHint";

// Server component — content is loaded at build/request time.
export default function HomePage() {
  const content = loadContentSync();

  return (
    <>
      <InAppBrowserHint />
      <Hero hero={content.hero} />
      <IntroSection intro={content.intro} />
      <Timeline entries={content.timeline} />
      <ProductGallery products={content.products} />
      <ClosingCTA closing={content.closing} />
      <Footer />
    </>
  );
}
