// src/components/layout/Header/index.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { siteConfig } from "@/data/site-config";
import { NAV_ITEMS } from "@/data/navigation";

type HeaderProps = {
  onMenuOpen: () => void;
};

export const Header = ({ onMenuOpen }: HeaderProps) => {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* 左側：ロゴエリア */}
        <div className="flex">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight text-slate-900">
              {siteConfig.name}
            </span>
          </Link>
        </div>

        {/* 右側：PC用メニューリスト */}
        <nav className="hidden md:flex md:items-center md:gap-8">
          {NAV_ITEMS.map((item) => {
            // 現在地判定
            const isActive =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));

            // 未公開アイテムのスタイル制御
            if (!item.isPublished) {
              return (
                <span
                  key={item.href}
                  className="cursor-not-allowed text-sm font-medium text-slate-400 opacity-60"
                  title="Coming Soon" // ホバー時にヒントを表示
                >
                  {item.label}
                </span>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                  isActive
                    ? "text-blue-600 underline decoration-2 underline-offset-8"
                    : "text-slate-600"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* 右側：スマホ用ハンバーガーボタン */}
        <div className="flex md:hidden">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2 text-slate-600 hover:bg-slate-100"
            onClick={onMenuOpen}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>
    </header>
  );
};
