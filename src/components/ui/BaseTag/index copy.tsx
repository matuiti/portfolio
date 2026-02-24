// src / components / ui / BaseTag / index.tsx;
"use client";

import React from "react";
import Link from "next/link";
import { tv, type VariantProps } from "tailwind-variants";

/**
 * プロジェクト全体の「タグ・タブ」の見た目を一元管理する共通UIパーツ
 */
const tagStyles = tv({
  slots: {
    base: "inline-flex items-center justify-center transition-all duration-300 leading-none cursor-pointer active:scale-95",
    // カウントバッジのスタイル定義（Source [1-3] の意匠を統合）
    countBadge:
      "ml-[calc(6/16*1rem)] text-[calc(14/16*1rem)] text-black transition-colors",
  },
  variants: {
    // 形状：タブ型(塗りつぶし) / チップ型(枠線)
    shape: {
      tab: {
        base: "px-[calc(16/16*1rem)] py-[calc(8/16*1rem)] rounded-[calc(20/16*1rem)] text-[calc(14/16*1rem)] tracking-wider text-black",
      },
      tag: {
        base: "py-[calc(4/16*1rem)] rounded-sm text-[calc(12/16*1rem)] tracking-wider",
      },
    },
    // 配色：カテゴリー向け(primary) / スキル・タグ向け(outline)
    color: {
      primary: {
        base: "bg-white text-black border border-dark-gray hover:border-dark-gray hover:text-white",
        countBadge: "text-black",
      },
      outline: {
        base: "bg-white text-dark-gray border border-dark-gray hover:border-dark-gray hover:text-white",
        countBadge: "text-dark-gray hover:text-white",
      },
    },
    // アクティブ状態 (Source [4, 5] の挙動を反映)
    isActive: {
      true: { base: "translate-x-[calc(1/16*1rem)]" },
    },
    // 表示専用（カード内の表示など、クリック不可の状態）
    isStatic: {
      true: { base: "cursor-default pointer-events-none active:scale-100" },
    },
  },
  compoundVariants: [
    {
      color: "primary",
      isActive: true,
      class: {
        base: "bg-black text-white border-black",
        countBadge: "text-white",
      },
    },
    {
      // 以下は仮で、デザイン待ち
      color: "outline",
      isActive: true,
      class: {
        base: "bg-blue-600 text-white border-blue-600 shadow-blue-100",
        countBadge: "bg-white/20 text-white",
      },
    },
  ],
  defaultVariants: { shape: "tag", color: "primary", isActive: false },
});

type TagVariants = VariantProps<typeof tagStyles>;

/**
 * 型定義（規約に従い interface ではなく type を使用 [6-8]）
 */
type BaseTagProps = {
  children: React.ReactNode;
  href?: string;
  isActive?: boolean;
  count?: number;
  showCount?: boolean;
  isStatic?: boolean;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  className?: string;
} & TagVariants;

export function BaseTag({
  children,
  shape,
  color,
  isActive,
  isStatic,
  count,
  showCount = true, // デフォルトでカウント表記を有効化
  href,
  onClick,
  className,
}: BaseTagProps) {
  const { base, countBadge } = tagStyles({
    shape,
    color,
    isActive,
    isStatic,
    className,
  });

  /**
   * カウント表記の出し分けロジック
   * 1. count プロパティが数値である
   * 2. showCount プロパティが true である
   * 両方を満たす場合のみバッジをレンダリングします。
   */
  const content = (
    <>
      {children}
      {showCount && typeof count === "number" && (
        <span className={countBadge()}>{count}</span>
      )}
    </>
  );

  // Link（遷移）モード：hrefが存在する場合
  if (href && !isStatic) {
    return (
      <Link href={href} className={base()} onClick={onClick}>
        {content}
      </Link>
    );
  }

  // Button（トグル・フィルタリング）モード
  return (
    <button
      type="button"
      className={base()}
      onClick={onClick}
      aria-pressed={isActive}
      disabled={isStatic}
    >
      {content}
    </button>
  );
}