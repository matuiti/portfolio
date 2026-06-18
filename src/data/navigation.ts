// src/data/navigation.ts
import { NavItem } from "@/types/navigation";

export const NAV_ITEMS: NavItem[] = [
  { label: "トップ", href: "/", isPublished: true },
  { label: "制作実績", href: "/works", isPublished: true },
  { label: "UIギャラリー", href: "/gallery", isPublished: false },// 現在未公開
  { label: "サービス内容", href: "/#service", isPublished: true },
  { label: "スキル", href: "/skills", isPublished: true },
  { label: "私について", href: "/#about", isPublished: true },
  { label: "お問い合わせ", href: "/#contact", isPublished: true },
  // { label: "Workbench", href: "/workbench", isPublished: true }, // UIギャラリーパーツの開発用レビューページ
];

/**
 * ユーティリティナビゲーション（フッター下部用）
 * プライバシーポリシー等の法的情報を管理します。
 */
export const UTILITY_ITEMS: NavItem[] = [
  { label: "プライバシーポリシー", href: "/privacy-policy", isPublished: true },
  // 今後、特定商取引法に基づく表記等が必要になった場合もここに追加
];

/**
 * 検索機能を持つページのパス
 */
export const SEARCHABLE_PATHS = ["/works", "/gallery"];
