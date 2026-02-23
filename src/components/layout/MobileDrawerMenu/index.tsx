// src/components/layout/MobileDrawerMenu/index.tsx
"use client";

import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/data/navigation";
import { MenuItem } from "@/components/ui/MenuItem";
import {
  ArrowRight,
  GitHub,
  Mail,
  MobileMenuClose,
} from "@/components/ui/Icons";
import { SubButton } from "@/components/ui/Buttons/SubButton";

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
      className={`fixed inset-0 z-drawer ${
        isOpen ? "visible" : "invisible pointer-events-none"
      }`}
    >
      {/* 背景オーバーレイ：独自にopacityとtransitionを管理 */}
      <div
        className={`absolute inset-0 bg-menu-backdrop backdrop-blur-default transition-all duration-500 ease-in ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      {/* メニュー本体：opacityも加えることで、より「ふわっと」した登場に */}
      <div
        className={`min-h-svh section-padding-x pb-10 absolute top-0 right-0 w-full max-w-mobile-drawer-max-w bg-white shadow-default flex flex-col justify-start transition-all duration-700 ease ${
          isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
        }`}
      >
        {/* 1. 上部：ボタンエリア */}
        <div className="flex items-center justify-end min-h-header-mini mb-[calc(20/16*1rem)]">
          <button onClick={onClose} aria-label="メニューを閉じる">
            <MobileMenuClose />
          </button>
        </div>

        {/* 2. 中央：リストアイテム */}
        <nav className="overflow-y-auto">
          <ul className="flex flex-col overflow-hidden">
            {NAV_ITEMS.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(item.href));

              return (
                <li
                  key={item.href}
                  className={`group flex items-center justify-between first:pt-[calc(17/16*1rem)] -mb-px py-4 pl-4 border-b first:border-t border-medium-gray ${
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

                  <ArrowRight isPublished={item.isPublished} />
                </li>
              );
            })}
          </ul>
        </nav>

        {/* 1. 下部：ボタンエリア */}
        <div className="mt-5">
          <div className="flex gap-x-2.5 justify-end">
            <SubButton leftIcon={GitHub}>GitHub</SubButton>
            <SubButton leftIcon={Mail}>お問い合わせ</SubButton>
          </div>
        </div>
      </div>
    </div>
  );
};
