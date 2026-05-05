import { loadContentSync } from "@/lib/content";
import { Hero } from "@/components/Hero";
import { IntroSection } from "@/components/IntroSection";
import { Timeline } from "@/components/Timeline";
import { ProductGallery } from "@/components/ProductGallery";
import { ClosingCTA } from "@/components/ClosingCTA";
import { Footer } from "@/components/Footer";

export default function HomePageEn() {
  const content = loadContentSync("en");

  return (
    <>
      <Hero hero={content.hero} />
      <IntroSection intro={content.intro} />
      <Timeline entries={content.timeline} locale="en" ui={content.ui} />
      <ProductGallery products={content.products} ui={content.ui} />
      <ClosingCTA closing={content.closing} ui={content.ui} />
      <Footer locale="en" ui={content.ui} />
    </>
  );
}
