import { loadContentSync } from "@/lib/content";
import { Hero } from "@/components/Hero";
import { IntroSection } from "@/components/IntroSection";
import { Timeline } from "@/components/Timeline";
import { ProductGallery } from "@/components/ProductGallery";
import { NewsletterForm } from "@/components/NewsletterForm";
import { EcosystemLinks } from "@/components/EcosystemLinks";
import { SwitchCTA } from "@/components/SwitchCTA";
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
      <NewsletterForm locale="en" ui={content.ui} />
      <EcosystemLinks locale="en" />
      <SwitchCTA locale="en" ui={content.ui} />
      <ClosingCTA closing={content.closing} ui={content.ui} />
      <Footer locale="en" ui={content.ui} />
    </>
  );
}
