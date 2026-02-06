// src/components/layout/Header/index.tsx
"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { siteConfig } from "@/data/site-config";
import { NAV_ITEMS } from "@/data/navigation";
import { useUIStore } from "@/store/useUIStore";
import { useScrollThreshold } from "@/lib/hooks/useScrollThreshold";
import { tv } from "tailwind-variants";

// 1. バリアント定義
export const headerStyles = tv({
  base: "fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out",
  variants: {
    // スクロール状態（MVを超えたかどうか）
    isScrolled: {
      true: "bg-white/80 backdrop-blur-md py-3 shadow-sm border-b border-neutral-100",
      false: "bg-transparent py-6 border-transparent",
    },
    // トップページでの初期非表示状態（GSAPで操作するために opacity-0 にしておく）
    isInitialHidden: {
      true: "opacity-0 -translate-y-full",
      false: "opacity-100 translate-y-0",
    },
  },
  defaultVariants: {
    isScrolled: false,
    isInitialHidden: false,
  },
});

// 2. Propsの型定義
type HeaderProps = {
  onMenuOpen: () => void;
};

export const Header = ({ onMenuOpen }: HeaderProps) => {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const { phase, setPhase } = useUIStore();

  const isVisible =
    !isHomePage || phase === "header-entry" || phase === "ready";
  const isScrolled = useScrollThreshold(isHomePage ? 400 : 20);

  useEffect(() => {
    if (!isHomePage) setPhase("ready");
  }, [isHomePage, setPhase]);

  return (
    <header
      className={headerStyles({ isScrolled, isInitialHidden: !isVisible })}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <div className="flex">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight text-slate-900">
              {siteConfig.name}
            </span>
          </Link>
        </div>

        <nav className="hidden md:flex md:items-center md:gap-8">
          {NAV_ITEMS.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));
            if (!item.isPublished)
              return (
                <span
                  key={item.href}
                  className="text-sm font-medium text-slate-400 opacity-60 px-1"
                >
                  {item.label}
                </span>
              );

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-bold transition-colors hover:text-blue-600 ${
                  isActive
                    ? "text-blue-600 underline underline-offset-8 decoration-2"
                    : "text-slate-600"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* onMenuOpen をここで使用することで ESLint 警告を解消 */}
        <div className="flex md:hidden">
          <button
            type="button"
            className="p-2 text-slate-600 hover:bg-slate-100 rounded-md transition-colors"
            onClick={onMenuOpen}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>
    </header>
  );
};
