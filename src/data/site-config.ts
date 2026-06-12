// src/data/site-config.ts
import { SiteConfig } from "@/types/site";

export const siteConfig: SiteConfig = {
  name: '松葉一八',
  title:
    '松葉一八のポートフォリオサイト | フロントエンドエンジニア',
  description:
    'フロントエンドエンジニアである松葉一八のポートフォリオサイトです。Next.js・TypeScript・TailwindCSSを中心に用いたSPAライクなサイトです。画面に見える部分ではユーザーにとっての快適さにこだわり、見えない部分では拡張や修正をしやすい保守性重視のコード設計にしました。',
  url: 'https://matuba-code.com',
  author: 'Kazuya Matuba',
  links: {
    github: 'https://github.com/matuiti',
    contact: '/#contact',
  },
  email: {
    from: 'Contact Form <contact@matuba-code.com>', // 認証済み独自ドメイン
    admin: 'matubakazuya@gmail.com', // 通知を受け取る実アドレス
    directUser: 'contact', // 直接連絡用の設定
    directDomain: 'matuba-code.com', // 直接連絡用の設定
  },
} as const;
