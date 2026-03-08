import type { Metadata } from "next";
import { Inter, Noto_Sans_JP } from "next/font/google";
import "@/styles/globals.css";
import { PageLayout } from "@/components/layout/PageLayout";
import { siteConfig } from "@/data/site-config";

// 英数字用: Inter
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// 日本語用: Noto Sans JP
const notoSansJp = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-noto-sans-jp",
  display: "swap",
  weight: ["400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.name + " ポートフォリオ",
    description:
      "実務における習熟度とエビデンスを可視化したポートフォリオです。",
    url: siteConfig.url,
    siteName: siteConfig.name + " ポートフォリオ",
    locale: "ja_JP",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${inter.variable} ${notoSansJp.variable}`}>
      <body className="text-black antialiased font-sans bg-bg-gradation min-h-svh h-full leading-normal tracking-wider text-[calc(14 / 16 * 1rem)] tablet:text-[calc(14 / 16 * 1rem)]">
        <PageLayout>{children}</PageLayout>
      </body>
    </html>
  );
}
