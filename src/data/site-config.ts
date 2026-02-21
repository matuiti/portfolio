// src/data/site-config.ts
import { SiteConfig } from "@/types/site";

export const siteConfig: SiteConfig = {
  name: "My Portfolio",
  url: "https://matuba-code.com",
  description: "Next.jsとTypeScriptで構築されたポートフォリオサイト",
  author: "Kazuya Matuba",
  links: {
    github: "https://github.com/your-id",
  },
  email: {
    from: "Contact Form <contact@matuba-code.com>", // 認証済み独自ドメイン
    admin: "ichi.animo@gmail.com", // 通知を受け取る実アドレス
    directUser: "contact", // 直接連絡用の設定
    directDomain: "matuba-code.com", // 直接連絡用の設定
  },
} as const;
