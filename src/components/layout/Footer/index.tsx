// src/components/layout/Footer/index.tsx
"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { tv } from "tailwind-variants";
import { Logo } from "@/components/ui/Logo";
import { MenuItem } from "@/components/ui/MenuItem";
import { NAV_ITEMS } from "@/data/navigation";
import { siteConfig } from "@/data/site-config";
import styles from "./Footer.module.scss";

/**
 * フッターのスタイル定義
 * 各エリアのクラスをスロットとして切り出し、JSXの見通しを改善します [1, 2]。
 */
const footerStyles = tv({
  slots: {
    root: styles.root,
    container: "container-center",
    topArea:
      "flex flex-col items-start mobile:items-center small:items-start p-5 -mb-1.5 small:-mb-px gap-y-8 small:gap-y-0 small:gap-x-5 tablet:items-center small:flex-row small:justify-between",
    menuList:
      "flex flex-col justify-start items-start gap-y-3.25 gap-x-4 flex-wrap mobile:flex-row mobile:justify-center mobile:items-center mt-2.5",
    bottomArea: "mt-5 pt-5 border-t border-dark-gray",
    privacyPolicy: "text-white text-[calc(14/16*1rem)] tracking-wider text-center mb-5",
    copyright:
      "text-xs leading-none font-normal text-dark-gray text-center tracking-normal",
  },
});

export function Footer() {
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();
  const { root, container, topArea, menuList, bottomArea, privacyPolicy, copyright } =
    footerStyles();

  return (
    <footer className={root()}>
      <div className={container()}>
        {/* 上部エリア：ロゴとメニュー */}
        <div className={topArea()}>
          {/* ロゴ */}
          <Link
            href="/"
            aria-label="Go to top"
            className="hover:opacity-hover transition-opacity"
          >
            <Logo type="footer" color="white" />
          </Link>

          {/* メニュー */}
          <nav>
            <ul className={menuList()}>
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
                      color="white"
                      indicatorLayout="responsive"
                    />
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        {/* 下部エリア：プライバシーポリシー・コピーライト */}
        <div className={bottomArea()}>
          <div className={privacyPolicy()}>
            {/* プライバシーポリシー */}
            <Link
              href="/privacy-policy"
              aria-label="プライバシーポリシーページへ移動する"
              className="hover:opacity-hover transition-opacity"
            >
              プライバシーポリシー
            </Link>
          </div>
          {/* コピーライト */}
          <p className={copyright()}>
            &copy; {currentYear} {siteConfig.author || siteConfig.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
