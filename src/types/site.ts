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
    admin: string; // 宛先（問い合わせ通知を受け取るアドレス。値は環境変数 CONTACT_EMAIL_TO で設定）
    directUser: string; // 直接連絡用
    directDomain: string; // 直接連絡用
  };
};
