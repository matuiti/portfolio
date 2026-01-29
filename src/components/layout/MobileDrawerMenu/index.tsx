// src/components/layout/MobileDrawerMenu/index.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { NAV_ITEMS } from "@/data/navigation";

type MobileDrawerMenuProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const MobileDrawerMenu = ({
  isOpen,
  onClose,
}: MobileDrawerMenuProps) => {
  const pathname = usePathname();

  // 閉じている時はDOM自体を描画しない（またはアニメーション用にスタイル制御）
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      {/* 背景オーバーレイ */}
      <div
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* メニュー本体 */}
      <nav className="fixed inset-y-0 right-0 w-full max-w-xs bg-white p-6 shadow-xl">
        <div className="flex items-center justify-between mb-8">
          <span className="text-lg font-bold">Menu</span>
          <button onClick={onClose} className="p-2 text-slate-600">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex flex-col gap-4">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.isPublished ? item.href : "#"}
                onClick={item.isPublished ? onClose : undefined}
                className={`text-lg font-medium p-2 rounded-lg transition-colors ${
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-slate-600 hover:bg-slate-50"
                } ${!item.isPublished ? "opacity-40 cursor-not-allowed" : ""}`}
              >
                <div className="flex items-center justify-between">
                  {item.label}
                  {!item.isPublished && (
                    <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-1 rounded">
                      Coming Soon
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
};
