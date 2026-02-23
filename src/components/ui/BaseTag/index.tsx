// src / components / ui / BaseTag / index.tsx;
"use client";

import React from "react";
import Link from "next/link";
import { tv, type VariantProps } from "tailwind-variants";

/**
 * 1 & 2. バリアント設計 (tailwind-variants)
 * 形状、色、状態に応じたスタイルを一元管理します。
 */
const tagStyles = tv({
  slots: {
    base: "inline-flex items-center justify-center transition-all duration-300 font-bold leading-none cursor-pointer active:scale-95",
    countBadge:
      "ml-[calc(6/16*1rem)] px-[calc(4/16*1rem)] py-[calc(1/16*1rem)] rounded-full text-[calc(10/16*1rem)] font-black transition-colors",
  },
  variants: {
    // 形状：tab(塗りつぶし・大) / tag(チップ型・小)
    shape: {
      tab: {
        base: "px-[calc(24/16*1rem)] py-[calc(12/16*1rem)] rounded-full text-[calc(12/16*1rem)] tracking-widest uppercase",
      },
      tag: {
        base: "px-[calc(12/16*1rem)] py-[calc(6/16*1rem)] rounded-sm text-[calc(11/16*1rem)]",
      },
    },
    // 配色：塗りつぶし(Category向け) / 枠線(Skill向け)
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
    // アクティブ状態
    isActive: {
      true: {
        base: "shadow-md translate-x-[calc(1/16*1rem)]",
      },
    },
    // 表示専用モード（ホバー効果やクリックを無効化）
    isStatic: {
      true: {
        base: "cursor-default pointer-events-none active:scale-100",
      },
    },
  },
  // 複合バリアント：配色 × アクティブ時のスタイル
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
  defaultVariants: {
    shape: "tag",
    color: "primary",
    isActive: false,
  },
});

/**
 * 型定義
 * interfaceを禁止し、typeに統一する規約を遵守。
 */
type TagVariants = VariantProps<typeof tagStyles>;

type BaseTagProps = {
  children: React.ReactNode;
  mode?: "static" | "toggle" | "link";
  href?: string;
  isActive?: boolean;
  count?: number;
  onClick?: () => void;
  className?: string;
} & TagVariants;

/**
 * 3. レンダリングロジックの実装
 */
export function BaseTag({
  children,
  mode = "toggle",
  shape,
  color,
  isActive = false,
  count,
  href,
  onClick,
  className,
}: BaseTagProps) {
  // スタイル適用
  const isStaticMode = mode === "static";
  const { base, countBadge } = tagStyles({
    shape,
    color,
    isActive,
    isStatic: isStaticMode,
    className,
  });

  // 内部コンテンツ（テキスト + 件数バッジ）
  const content = (
    <>
      {children}
      {typeof count === "number" && (
        <span className={countBadge()}>{count}</span>
      )}
    </>
  );

  /**
   * モード別の分岐出力
   */

  // A. Linkモード：詳細モーダル内やカード内から検索ページへ遷移
  if (mode === "link" && href) {
    return (
      <Link href={href} className={base()} onClick={onClick}>
        {content}
      </Link>
    );
  }

  // B. Staticモード：SkillCard内などの表示専用
  if (mode === "static") {
    return <span className={base()}>{content}</span>;
  }

  // C. Toggleモード：検索サイドバーなどの選択・解除
  return (
    <button
      type="button"
      className={base()}
      onClick={onClick}
      aria-pressed={isActive}
    >
      {content}
    </button>
  );
}
