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
import { InAppBrowserHint } from "@/components/InAppBrowserHint";

export default function HomePageZh() {
  const content = loadContentSync("zh");

  return (
    <>
      <InAppBrowserHint />
      <Hero hero={content.hero} locale="zh" ui={content.ui} />
      <IntroSection intro={content.intro} />
      <Timeline entries={content.timeline} locale="zh" ui={content.ui} />
      <ProductGallery products={content.products} ui={content.ui} />
      <NewsletterForm locale="zh" ui={content.ui} />
      <EcosystemLinks locale="zh" />
      <SwitchCTA locale="zh" ui={content.ui} />
      <ClosingCTA closing={content.closing} ui={content.ui} />
      <Footer locale="zh" ui={content.ui} />
    </>
  );
}
