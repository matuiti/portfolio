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
    base: "inline-flex items-center justify-center transition-all duration-300 font-bold leading-none cursor-pointer active:scale-95",
    // カウントバッジのスタイル定義（Source [1-3] の意匠を統合）
    countBadge:
      "ml-[calc(6/16*1rem)] px-[calc(4/16*1rem)] py-[calc(1/16*1rem)] rounded-full text-[calc(10/16*1rem)] font-black transition-colors",
  },
  variants: {
    // 形状：タブ型(塗りつぶし) / チップ型(枠線)
    shape: {
      tab: {
        base: "px-[calc(24/16*1rem)] py-[calc(12/16*1rem)] rounded-full text-[calc(12/16*1rem)] tracking-widest uppercase",
      },
      tag: {
        base: "px-[calc(12/16*1rem)] py-[calc(6/16*1rem)] rounded-sm text-[calc(11/16*1rem)]",
      },
    },
    // 配色：カテゴリー向け(primary) / スキル・タグ向け(outline)
    color: {
      primary: {
        base: "bg-white text-slate-500 border border-slate-200 hover:border-slate-900 hover:text-slate-900",
        countBadge: "bg-neutral-200 text-neutral-500",
      },
      outline: {
        base: "bg-white text-slate-400 border border-slate-200 hover:border-blue-400 hover:text-blue-600",
        countBadge: "bg-slate-100 text-slate-400",
      },
    },
    // アクティブ状態 (Source [4, 5] の挙動を反映)
    isActive: {
      true: { base: "shadow-md translate-x-[calc(1/16*1rem)]" },
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
        base: "bg-slate-900 text-white border-slate-900",
        countBadge: "bg-white/20 text-white",
      },
    },
    {
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