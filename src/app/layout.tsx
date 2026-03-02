import type { Metadata } from "next";
import { Inter, Noto_Sans_JP } from "next/font/google";
import "@/styles/globals.css";
import { PageLayout } from "@/components/layout/PageLayout";

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
  title: "Portfolio",
  description: "Showcasing my works and skills",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${inter.variable} ${notoSansJp.variable}`}>
      <body className="antialiased font-sans bg-bg-gradation min-h-svh h-full">
        <PageLayout>{children}</PageLayout>
      </body>
    </html>
  );
}
