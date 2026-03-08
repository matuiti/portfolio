// src/data/site-config.ts
import { SiteConfig } from "@/types/site";

export const siteConfig: SiteConfig = {
  name: "松葉一八",
  title: "松葉一八 ポートフォリオ | 技術的証明と品質の高いコーディング",
  description:
    "Webコーダー 松葉一八のポートフォリオサイトです。React 19 / Next.jsを用いた「技術的証明」をテーマに、保守性と再現性の高いコーディングスキルを体現しています。",
  url: "https://matuba-code.com",
  author: "Kazuya Matuba",
  links: {
    github: "https://github.com/matuiti",
    contact: "/#contact",
  },
  email: {
    from: "Contact Form <contact@matuba-code.com>", // 認証済み独自ドメイン
    admin: "ichi.animo@gmail.com", // 通知を受け取る実アドレス
    directUser: "contact", // 直接連絡用の設定
    directDomain: "matuba-code.com", // 直接連絡用の設定
  },
} as const;
