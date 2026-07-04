import { ReactNode } from "react";

export type NavItem = {
  label: string;
  href: string;
  icon?: ReactNode;
  isPublished: boolean; // 公開済みかどうか
  isCurrent?: boolean; // 現在のページかどうか
};