import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DeepSeek 的故事 — 从海底到星空",
  description:
    "一个关于 DeepSeek 的情感叙事时间线。从幻方量化的 AI 实验到撼动硅谷的开源突破，用 Switch 桌面应用一键接入 DeepSeek。",
  metadataBase: new URL("https://dsnb.help"),
  openGraph: {
    type: "website",
    locale: "zh_CN",
    siteName: "dsnb.help",
    images: ["/og-image.png"],
    title: "DeepSeek 的故事 — 从海底到星空",
    description:
      "情感叙事时间线：DeepSeek 如何在质疑声中崛起，以最小成本挑战最强模型。",
  },
  twitter: {
    card: "summary_large_image",
    title: "DeepSeek 的故事 — 从海底到星空",
    description: "情感叙事时间线：DeepSeek 如何以最小成本挑战最强模型。",
  },
  keywords: ["DeepSeek", "AI", "大语言模型", "开源", "Switch", "桌面应用"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="antialiased">
      <body className="min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)]">
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
