import { loadContentSync } from "@/lib/content";
import { Footer } from "@/components/Footer";
import { NotFoundContent } from "@/components/NotFoundContent";

export default function NotFoundZh() {
  const content = loadContentSync("zh");
  return (
    <>
      <NotFoundContent locale="zh" ui={content.ui} />
      <Footer locale="zh" ui={content.ui} />
    </>
  );
}
