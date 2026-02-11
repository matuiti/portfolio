// src / components / ui / Buttons / PageTopButton / index.tsx;
"use client";

import { tv, type VariantProps } from "tailwind-variants";
import React, { useEffect, useState } from "react";
import { useScrollThreshold } from "@/lib/hooks/useScrollThreshold"; // [cite: 388]

/**
 * ページトップボタンのスタイル定義
 * 左右位置は動的な計算（styleプロパティ）で行うため、baseからは除外
 */
const pageTopButtonStyles = tv({
  base: [
    "fixed z-pagetop uppercase text-sm", // [cite: 417]
    "flex h-20 w-20 flex-col items-center justify-center rounded-full",
    "bg-black text-white shadow-lg",
    "transition-[opacity,transform] duration-500 ease-in-out",
    "hover:bg-slate-800 active:scale-95",
  ],
  variants: {
    isVisible: {
      true: "visible opacity-100 translate-y-0",
      false: "invisible opacity-0 translate-y-4 pointer-events-none",
    },
  },
  defaultVariants: {
    isVisible: false,
  },
});

type PageTopButtonProps = VariantProps<typeof pageTopButtonStyles> & {
  threshold?: number;
  containerWidth?: number; // コンテナの最大幅（px）
};

export const PageTopButton = ({
  threshold = 300,
  containerWidth = 1200, // プロジェクトの標準幅をデフォルトに設定 [cite: 421]
}: PageTopButtonProps) => {
  const isExceeded = useScrollThreshold(threshold);

  const BASE_OFFSET_REM = "calc(24 / 16 * 1rem)";
  const [positionStyle, setPositionStyle] = useState({
    bottom: BASE_OFFSET_REM,
    right: BASE_OFFSET_REM,
    left: "auto",
    marginLeft: "0",
  });

  useEffect(() => {
    const handleLayout = () => {
      const footer = document.querySelector("footer");
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const baseGapPx = 24;

      // --- 1. 垂直位置（Bottom）の計算 ---
      let currentBottomPx = baseGapPx;
      if (footer) {
        const footerRect = footer.getBoundingClientRect();
        if (footerRect.top < viewportHeight) {
          currentBottomPx = viewportHeight - footerRect.top + baseGapPx;
        }
      }

      // --- 2. 水平位置（Left/Right）の計算 ---
      // コンテナ幅に余白を加えた値より画面が広い場合、コンテナ基準にする
      const isWideScreen =
        viewportWidth > containerWidth + (baseGapPx * 2 + 80); // 80はボタン幅

      const newStyle = {
        bottom: `calc(${currentBottomPx} / 16 * 1rem)`,
        left: isWideScreen ? "50%" : "auto",
        right: isWideScreen ? "auto" : `calc(${baseGapPx} / 16 * 1rem)`,
        marginLeft: isWideScreen
          ? `calc((${containerWidth} / 2 + ${baseGapPx}) / 16 * 1rem)`
          : "0",
      };

      setPositionStyle(newStyle);
    };

    window.addEventListener("scroll", handleLayout, { passive: true });
    window.addEventListener("resize", handleLayout);
    handleLayout();

    return () => {
      window.removeEventListener("scroll", handleLayout);
      window.removeEventListener("resize", handleLayout);
    };
  }, [containerWidth]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className={pageTopButtonStyles({ isVisible: isExceeded })}
      style={positionStyle}
      aria-label="ページ上部へ戻る"
    >
      <span className="font-black leading-none">Page</span>
      <span className="font-black leading-none">Top</span>
    </button>
  );
};
