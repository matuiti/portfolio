// src/components/layout/Header/index.tsx

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search } from "lucide-react";
import { siteConfig } from "@/data/site-config";
import { NAV_ITEMS } from "@/data/navigation";
import { useUIStore } from "@/store/useUIStore";
import { useScrollThreshold } from "@/lib/hooks/useScrollThreshold";
import { tv } from "tailwind-variants";

// 1. スタイルバリアントの定義
export const headerStyles = tv({
  base: "fixed top-0 left-0 w-full z-header transition-all duration-500 ease-in-out",
  variants: {
    isScrolled: {
      true: "bg-white/80 backdrop-blur-md shadow-sm border-b border-neutral-100",
      false: "bg-transparent border-transparent",
    },
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

type HeaderProps = {
  onMenuOpen: () => void;
};

export const Header = ({ onMenuOpen }: HeaderProps) => {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const { phase, setPhase, setSearchDrawerOpen } = useUIStore();

  // 検索ドロワーが必要なページか判定
  const isSearchablePage =
    pathname.startsWith("/works") || pathname.startsWith("/gallery");

  const isVisible =
    !isHomePage || phase === "header-entry" || phase === "ready";

  useEffect(() => {
    if (!isHomePage) setPhase("ready");
  }, [isHomePage, setPhase]);

  // 動的な閾値の状態管理
  const [dynamicThreshold, setDynamicThreshold] = useState(0);

  useEffect(() => {
    if (!isHomePage) return;

    const updateHeight = () => setDynamicThreshold(window.innerHeight);
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, [isHomePage]);

  // 100svh (window.innerHeight) を超過したか判定 [cite: 116, 300]
  const isScrolled = useScrollThreshold(isHomePage ? dynamicThreshold : 20);

  return (
    <header
      className={headerStyles({ isScrolled, isInitialHidden: !isVisible })}
    >
      <div className="main-container flex items-center justify-between">
        {/* ロゴ */}
        <Link
          href="/"
          className="text-xl font-black tracking-tighter hover:opacity-70 transition-opacity"
        >
          {siteConfig.name}
        </Link>

        {/* 【PC専用】デスクトップ用ナビゲーション (md以上で表示) */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));

            if (!item.isPublished) {
              return (
                <span
                  key={item.href}
                  className="text-sm font-medium text-slate-400 opacity-60 px-1"
                >
                  {item.label}
                </span>
              );
            }

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

        {/* 【スマホ・タブレット専用】アクションボタンエリア (md未満のみ表示) */}
        <div className="flex items-center gap-2 md:hidden">
          {/* 検索ボタン: WORKS/GALLERYページかつモバイルサイズのみ表示 */}
          {isSearchablePage && (
            <button
              type="button"
              className="p-2 text-slate-600 hover:bg-slate-100 rounded-md transition-colors"
              onClick={() => setSearchDrawerOpen(true)}
              aria-label="検索フィルターを開く"
            >
              <Search className="w-6 h-6" />
            </button>
          )}

          {/* メニューボタン: モバイルサイズのみ表示 */}
          <button
            type="button"
            className="p-2 text-slate-600 hover:bg-slate-100 rounded-md transition-colors"
            onClick={onMenuOpen}
            aria-label="メニューを開く"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
};
