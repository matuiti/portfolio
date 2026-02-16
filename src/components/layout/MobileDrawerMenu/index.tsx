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
      className={`fixed inset-0 z-drawer transition-all duration-300 ${
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
        className={`min-h-svh section-padding-x pb-10 absolute top-0 right-0 w-full max-w-mobile-drawer-max-w bg-white shadow-default backdrop-blur-default flex flex-col justify-start
        isOpen ? "translate-x-0" : "-translate-x-full"
        `}
      >
        {/* 1. 上部：ボタンエリア */}
        {/* <div className="flex items-center justify-end pt-5 mb-5"> */}
        <div className="flex items-center justify-end min-h-header-mini small:min-h-header-small mb-5">
          <button onClick={onClose} aria-label="メニューを閉じる">
            <MobileMenuClose />
          </button>
        </div>

        {/* 2. 中央：リストアイテム */}
        <nav className="overflow-y-auto">
          <ul className="flex flex-col">
            {NAV_ITEMS.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(item.href));

              return (
                <li
                  key={item.href}
                  className={`group flex items-center justify-between py-4 pl-4 border-b first:border-t border-medium-gray hover:bg-medium-gray ${
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
