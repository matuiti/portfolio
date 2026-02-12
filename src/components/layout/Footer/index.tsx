// src/components/layout/Footer/index.tsx
"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/ui/Logo";
import { MenuItem } from "@/components/ui/MenuItem";
import { NAV_ITEMS } from "@/data/navigation";
import { siteConfig } from "@/data/site-config";

export function Footer() {
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-container bg-black">
      <div className="container-center">
        {/* 上部エリア：ロゴとメニュー */}
        <div className="flex flex-col items-start p-5 gap-y-10 small:gap-y-0 small:gap-x-5 tablet:items-center small:flex-row small:justify-between">
          {/* ロゴ */}
          <Link href="/" aria-label="Go to top">
            <Logo type="footer" color="white" />
          </Link>

          {/* メニュー */}
          <nav>
            <ul className="flex flex-col justify-start items-start gap-4 tablet:flex-row tablet:justify-center tablet:items-center">
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
                      indicatorLayout="floating"
                    />
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        {/* 下部エリア：コピーライト */}
        <div className="mt-5 pt-5 border-t border-gray">
          <p className="text-xs leading-none font-normal text-gray text-center tracking-normal">
            &copy; {currentYear} {siteConfig.author || siteConfig.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
