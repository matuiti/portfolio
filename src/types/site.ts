// src/types/site.ts
export type SiteConfig = {
  name: string;
  title: string;
  url: string;
  description: string;
  author: string;
  links: {
    github: string;
    contact?: string;
    twitter?: string;
  };
  email: {
    from: string; // 送信元（独自ドメインのアドレス）
    admin: string; // 宛先（ichi.animo@gmail.com）
    directUser: string; // 直接連絡用
    directDomain: string; // 直接連絡用
  };
};
