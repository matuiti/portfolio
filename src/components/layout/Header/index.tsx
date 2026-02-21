// src/components/layout/Header/index.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { tv } from "tailwind-variants";

import { NAV_ITEMS } from "@/data/navigation";
import { useUIStore } from "@/store/useUIStore";
import { useScrollThreshold } from "@/lib/hooks/useScrollThreshold";
import { Logo } from "@/components/ui/Logo";
import { MenuItem } from "@/components/ui/MenuItem";
import { Hamburger, SearchLarge } from "@/components/ui/Icons";

/**
 * ヘッダースタイル定義
 * slotsを使用して、各パーツのスタイルを分離管理する [cite: 19, 677]
 */
export const headerStyles = tv({
  slots: {
    base: "section-padding-x fixed top-0 left-0 flex items-center justify-center w-full min-h-header-mini small:min-h-header-small z-header transition-all duration-1000 ease-in",
    inner: "container-center flex items-center justify-between",
    // 複雑なcalcを含むリスト部分を配列で切り出し
    navList: [
      "hidden small:flex items-center leading-normal",
      "gap-[calc(15.6/16*1rem)]",
      "mt-[calc(6/16*1rem)]", // margin-top: 6px を追加 [cite: 677]
      "mr-[calc(3/16*1rem)]", // margin-right: 3px を追加 [cite: 677]
    ],
    mobileActions: "flex items-center gap-2.5 small:hidden",
  },
  variants: {
    isScrolled: {
      true: { base: "backdrop-blur-default shadow-default" },
      false: { base: "bg-white" },
    },
    isSearchablePage: {
      true: { base: "shadow-default" },
    },
  },
  defaultVariants: {
    isScrolled: false,
    isSearchablePage: false,
  },
});

export const Header = ({ onMenuOpen }: { onMenuOpen: () => void }) => {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const { setPhase, setSearchDrawerOpen } = useUIStore();

  // フェーズ同期・スクロール判定ロジックは現状を維持
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

  // スロットの取得
  const { base, inner, navList, mobileActions } = headerStyles({
    isScrolled,
    isSearchablePage,
  });

  return (
    <header className={base()}>
      <div className={inner()}>
        <Link href="/" className="hover:opacity-hover transition-opacity">
          <Logo color="black" type="header" />
        </Link>

        <nav>
          <ul className={navList()}>
            {NAV_ITEMS.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <li key={item.href}>
                  <MenuItem
                    label={item.label}
                    href={item.href}
                    isPublished={item.isPublished}
                    isActive={isActive}
                    color="black"
                    indicatorLayout="fixed"
                  />
                </li>
              );
            })}
          </ul>
        </nav>

        <div className={mobileActions()}>
          {isSearchablePage && (
            <button
              type="button"
              onClick={() => setSearchDrawerOpen(true)}
              className="p-2"
            >
              <SearchLarge />
            </button>
          )}
          <button type="button" onClick={onMenuOpen}>
            <Hamburger />
          </button>
        </div>
      </div>
    </header>
  );
};