// src/data/navigation.ts
import { NavItem } from "@/types/navigation";

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/", isPublished: true },
  { label: "Works", href: "/works", isPublished: true },
  { label: "Gallery", href: "/gallery", isPublished: true },
  { label: "Skills", href: "/skills", isPublished: true },
  { label: "Service", href: "/#service", isPublished: true },
  { label: "About", href: "/#about", isPublished: true },
  { label: "Blog", href: "/#blog", isPublished: false },
  { label: "Contact", href: "/#contact", isPublished: true },
  { label: "Workbench", href: "/workbench", isPublished: true }, // 開発用
];
