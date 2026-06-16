import type { Metadata } from 'next';
import { Inter, Noto_Sans_JP } from 'next/font/google';
import { PageLayout } from '@/components/layout/PageLayout';
import { SITE_CONFIG } from '@/data/site';
import '@/styles/globals.css';

// 英数字用
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

// 日本語用
const notoSansJp = Noto_Sans_JP({
  subsets: ['latin'],
  variable: '--font-noto-sans-jp',
  display: 'swap',
  weight: ['400', '500', '700', '900'],
});

export const metadata: Metadata = {
  title: SITE_CONFIG.title,
  description: SITE_CONFIG.description,
  openGraph: {
    title: SITE_CONFIG.name + ' ポートフォリオ',
    description: '実績と実装力の可視化を目指したポートフォリオサイトです。',
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name + ' ポートフォリオ',
    locale: 'ja_JP',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ja' className={`${inter.variable} ${notoSansJp.variable}`}>
      <body className='text-black antialiased font-sans bg-bg-gradation min-h-svh h-full leading-normal tracking-wider text-[calc(14 / 16 * 1rem)] tablet:text-[calc(14 / 16 * 1rem)]'>
        <PageLayout>{children}</PageLayout>
      </body>
    </html>
  );
}
