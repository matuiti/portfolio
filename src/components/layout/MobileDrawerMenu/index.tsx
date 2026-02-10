// src/components/layout/MobileDrawerMenu/index.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/data/navigation";
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
      <div className="fixed inset-0 bg-menu-backdrop" onClick={onClose} />

      {/* メニュー本体 */}
      <nav className="fixed inset-y-0 right-0 w-full max-w-mobile-drawer-max-w bg-white/95 shadow-default backdrop-blur-default flex flex-col">
        {/* 1. 上部：ボタンエリア */}
        <div className="flex items-center justify-end pt-5 px-7.5 mb-5">
          <button
            onClick={onClose}
          >
            <MobileMenuClose />
          </button>
        </div>

        {/* 2. 中央：リストアイテム（可変エリア） */}
        <div className="flex-1 overflow-y-auto px-7.5">
          <div className="flex flex-col">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.isPublished ? item.href : "#"}
                  onClick={item.isPublished ? onClose : undefined}
                  className={`group flex items-center justify-between font-bold py-4 pl-4 border-b first:border-t border-gray ${
                    isActive ? "text-blue-600" : "text-slate-600"
                  } ${!item.isPublished ? "opacity-40 cursor-not-allowed" : "hover:text-blue-500"}`}
                >
                  <div className="flex items-center gap-x-2">
                    {item.label}
                    {!item.isPublished && (
                      <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded">
                        Coming Soon
                      </span>
                    )}
                  </div>

                  {/* 右端のアローアイコン */}
                  <ArrowRight isPublished={item.isPublished} />
                </Link>
              );
            })}
          </div>
        </div>

        {/* 3. 下部：ボタン2つ横並びブロック */}
        <div className="p-7.5 mt-auto bg-slate-50/50">
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
