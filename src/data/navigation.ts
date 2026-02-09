// src/data/navigation.ts
import { NavItem } from "@/types/navigation";

export const NAV_ITEMS: NavItem[] = [
  { label: "トップ", href: "/", isPublished: true },
  { label: "制作実績", href: "/works", isPublished: true },
  { label: "UIギャラリー", href: "/gallery", isPublished: true },
  { label: "サービス内容", href: "/#service", isPublished: true },
  { label: "スキル", href: "/skills", isPublished: true },
  { label: "私について", href: "/#about", isPublished: true },
  { label: "ブログ", href: "/#blog", isPublished: false },
  { label: "お問い合わせ", href: "/#contact", isPublished: true },
  // { label: "Workbench", href: "/workbench", isPublished: true }, // 開発用
];
