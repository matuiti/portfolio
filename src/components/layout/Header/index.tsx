// src / components / layout / Header / index.tsx;
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search } from "lucide-react";
import { tv } from "tailwind-variants";

import { NAV_ITEMS } from "@/data/navigation";
import { useUIStore } from "@/store/useUIStore";
import { useScrollThreshold } from "@/lib/hooks/useScrollThreshold";
import { Logo } from "@/components/ui/Logo";
import { MenuItem } from "@/components/ui/MenuItem";
import { Hamburger } from "@/components/ui/Icons";

export const headerStyles = tv({
  base: "section-padding-x fixed top-0 left-0 flex items-center justify-center w-full min-h-header-mini small:min-h-header-small z-header transition-all duration-500 ease-in-out",
  variants: {
    isScrolled: {
      true: "bg-white/90 shadow-default",
      false: "bg-white",
    },
    isInitialHidden: {
      true: "opacity-0 -translate-y-full",
      false: "opacity-100 translate-y-0",
    },
    isSearchablePage: {
      true: "shadow-default",
    },
  },
  defaultVariants: {
    isScrolled: false,
    isInitialHidden: false,
    isSearchablePage: false,
  },
});

type HeaderProps = {
  onMenuOpen: () => void;
};

export const Header = ({ onMenuOpen }: HeaderProps) => {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const { phase, setPhase, setSearchDrawerOpen } = useUIStore();

  const isVisible =
    !isHomePage || phase === "header-entry" || phase === "ready";

  useEffect(() => {
    if (!isHomePage) setPhase("ready");
  }, [isHomePage, setPhase]);

  const [dynamicThreshold, setDynamicThreshold] = useState(0);
  useEffect(() => {
    if (!isHomePage) return;
    const updateHeight = () => setDynamicThreshold(window.innerHeight);
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, [isHomePage]);

  const isScrolled = useScrollThreshold(isHomePage ? dynamicThreshold : 20);
  const isSearchablePage =
    pathname.startsWith("/works") || pathname.startsWith("/gallery");

  return (
    <header
      className={headerStyles({
        isScrolled,
        isInitialHidden: !isVisible,
        isSearchablePage,
      })}
    >
      <div className="container-center flex items-center justify-between">
        <Link href="/" className="hover:opacity-70 transition-opacity">
          <Logo color="black" type="header" />
        </Link>

        {/* 【PC専用】デスクトップナビゲーション：smallサイズ以上で表示 [cite: 49] */}
        <nav className="hidden small:flex items-center gap-6">
          {NAV_ITEMS.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));

            return (
              <MenuItem
                key={item.href}
                label={item.label}
                href={item.href}
                isPublished={item.isPublished}
                isActive={isActive}
                color="black"
                dotLayout="fixed"
              />
            );
          })}
        </nav>

        <div className="flex items-center gap-2 small:hidden">
          {/* 検索ボタン：モバイル・タブレット時のみ表示 [cite: 50] */}
          {isSearchablePage && (
            <button
              type="button"
              className={`p-2 rounded-md transition-colors text-black`}
              onClick={() => setSearchDrawerOpen(true)}
              aria-label="検索フィルターを開く"
            >
              <Search size={20} />
            </button>
          )}

          {/* ハンバーガーメニュー：small以上で非表示 [cite: 51, 117] */}
          <button
            type="button"
            className={`small:hidden`}
            onClick={onMenuOpen}
            aria-label="メニューを開く"
          >
            <Hamburger />
          </button>
        </div>
      </div>
    </header>
  );
};
