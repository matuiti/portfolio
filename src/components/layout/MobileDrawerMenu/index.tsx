// src/components/layout/MobileDrawerMenu/index.tsx
"use client";

import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/data/navigation";
import { MenuItem } from "@/components/ui/MenuItem";
import { ArrowRight, MobileMenuClose } from "@/components/ui/Icons";

type MobileDrawerMenuProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const MobileDrawerMenu = ({
  isOpen,
  onClose,
}: MobileDrawerMenuProps) => {
  const pathname = usePathname();

  return (
    <div
      className={`fixed inset-0 z-header transition-all duration-300 ${
        isOpen
          ? "visible opacity-100"
          : "invisible opacity-0 pointer-events-none"
      }`}
    >
      {/* 背景オーバーレイ */}
      <div
        className="absolute inset-0 bg-menu-backdrop backdrop-blur-default transition-opacity duration-300"
        onClick={onClose}
      />

      {/* メニュー本体 */}
      <div
        className={`absolute top-0 right-0 w-full max-w-mobile-drawer-max-w bg-white shadow-default backdrop-blur-default flex flex-col
        isOpen ? "translate-x-0" : "-translate-x-full"
        `}
      >
        {/* 1. 上部：ボタンエリア */}
        <div className="flex items-center justify-end pt-5 px-7.5 mb-5">
          <button onClick={onClose} aria-label="メニューを閉じる">
            <MobileMenuClose />
          </button>
        </div>

        {/* 2. 中央：リストアイテム */}
        <nav className="flex-1 overflow-y-auto px-7.5">
          <div className="flex flex-col">
            {NAV_ITEMS.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(item.href));

              return (
                <div
                  key={item.href}
                  className={`group flex items-center justify-between py-4 pl-4 border-b first:border-t border-gray ${
                    !item.isPublished ? "cursor-not-allowed" : "cursor-pointer"
                  }`}
                  onClick={() => {
                    if (item.isPublished) {
                      onClose();
                    }
                  }}
                >
                  <MenuItem
                    label={item.label}
                    href={item.href}
                    isPublished={item.isPublished}
                    isActive={isActive}
                    color="black"
                    indicatorLayout="floating"
                  />

                  <ArrowRight size="md" isPublished={item.isPublished} />
                </div>
              );
            })}
          </div>
        </nav>

        {/* 1. 下部：ボタンエリア */}
        <div className="p-7.5 bg-slate-50/50">
          <div className="flex gap-x-3">
            <button className="flex-1 py-3 px-4 bg-white border border-slate-200 text-slate-700 rounded-lg font-bold text-sm hover:bg-slate-100 transition-colors">
              ログイン
            </button>
            <button className="flex-1 py-3 px-4 bg-blue-600 text-white rounded-lg font-bold text-sm hover:bg-blue-700 transition-colors">
              無料登録
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
