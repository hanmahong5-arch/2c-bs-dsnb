import { loadContentSync } from "@/lib/content";
import { Hero } from "@/components/Hero";
import { IntroSection } from "@/components/IntroSection";
import { Timeline } from "@/components/Timeline";
import { ProductGallery } from "@/components/ProductGallery";
import { ClosingCTA } from "@/components/ClosingCTA";
import { Footer } from "@/components/Footer";
import { InAppBrowserHint } from "@/components/InAppBrowserHint";

export default function HomePageZh() {
  const content = loadContentSync("zh");

  return (
    <>
      <InAppBrowserHint />
      <Hero hero={content.hero} />
      <IntroSection intro={content.intro} />
      <Timeline entries={content.timeline} locale="zh" ui={content.ui} />
      <ProductGallery products={content.products} ui={content.ui} />
      <ClosingCTA closing={content.closing} ui={content.ui} />
      <Footer locale="zh" ui={content.ui} />
    </>
  );
}
