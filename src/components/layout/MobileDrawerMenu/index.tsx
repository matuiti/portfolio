// src/components/layout/MobileDrawerMenu/index.tsx
"use client";

import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/data/navigation";
import { MenuItem } from "@/components/ui/MenuItem"; // MenuItemをインポート [cite: 60]
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-drawer small:hidden">
      {/* 背景オーバーレイ */}
      <div
        className="fixed inset-0 bg-menu-backdrop backdrop-blur-default"
        onClick={onClose}
      />

      {/* メニュー本体 */}
      <nav className="fixed inset-y-0 right-0 w-full max-w-mobile-drawer-max-w bg-white shadow-default backdrop-blur-default flex flex-col">
        {/* 1. 上部：ボタンエリア */}
        <div className="flex items-center justify-end pt-5 px-7.5 mb-5">
          <button onClick={onClose}>
            <MobileMenuClose />
          </button>
        </div>

        {/* 2. 中央：リストアイテム */}
        <div className="flex-1 overflow-y-auto px-7.5">
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
                      onClose(); // 公開済みなら遷移時にメニューを閉じる
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
        </div>

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
      </nav>
    </div>
  );
};
