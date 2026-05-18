import { loadContentSync } from "@/lib/content";
import { Footer } from "@/components/Footer";
import { NotFoundContent } from "@/components/NotFoundContent";

export default function NotFoundEn() {
  const content = loadContentSync("en");
  return (
    <>
      <NotFoundContent locale="en" ui={content.ui} />
      <Footer locale="en" ui={content.ui} />
    </>
  );
}
