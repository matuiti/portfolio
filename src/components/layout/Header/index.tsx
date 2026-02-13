// src/components/layout/Header/index.tsx
"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { tv } from "tailwind-variants";

import { NAV_ITEMS } from "@/data/navigation";
import { useUIStore } from "@/store/useUIStore";
import { useScrollThreshold } from "@/lib/hooks/useScrollThreshold";
import { Logo } from "@/components/ui/Logo";
import { MenuItem } from "@/components/ui/MenuItem";
import { Hamburger, SearchLarge } from "@/components/ui/Icons";
import { useIsMounted } from "@/lib/hooks/useIsMounted";

export const headerStyles = tv({
  base: "section-padding-x fixed top-0 left-0 flex items-center justify-center w-full min-h-header-mini small:min-h-header-small z-header transition-all duration-1000 ease-in",
  variants: {
    isScrolled: {
      true: "backdrop-blur-default shadow-default",
      false: "bg-white",
    },
    isInitialHidden: {
      true: "opacity-0 invisible",
      false: "opacity-100 visible",
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
  const isMounted = useIsMounted();

  /**
   * ヘッダーを表示するかどうかの判定
   */
  const isVisible = useMemo(() => {
    // 1. トップページ以外なら常に表示
    if (!isHomePage) return true;

    // 2. 演出フェーズが「header-entry」または「ready」なら表示
    // ※ 他のページから戻ってきた場合、ストアが既に "ready" であれば即座に表示されます。
    if (phase === "header-entry" || phase === "ready") return true;

    // 3. ハッシュがある場合は演出に関わらず即表示
    if (isMounted && typeof window !== "undefined" && window.location.hash) {
      return true;
    }

    // それ以外（初回訪問時のMV再生中など）は非表示
    return false;
  }, [isHomePage, phase, isMounted]);

  /**
   * 下層ページに直接アクセス、または遷移した場合は
   * ストアのフェーズを即座に「演出完了（ready）」に更新する。
   * これにより、トップに戻った際に phase === "ready" が維持されていれば
   * ヘッダーが消えるのを防げます。
   */
  useEffect(() => {
    if (!isHomePage) {
      setPhase("ready");
    }
  }, [isHomePage, setPhase]);

  // スクロール判定ロジック
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

        <nav>
          <ul className="hidden small:flex items-center gap-6">
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

        <div className="flex items-center gap-2.5 small:hidden">
          {isSearchablePage && (
            <button
              type="button"
              onClick={() => setSearchDrawerOpen(true)}
              aria-label="検索フィルターを開く"
              className="p-2"
            >
              <SearchLarge />
            </button>
          )}

          <button
            type="button"
            onClick={onMenuOpen}
            aria-label="メニューを開く"
            className="p-2"
          >
            <Hamburger />
          </button>
        </div>
      </div>
    </header>
  );
};
