// src / components / ui / BaseTag / index.tsx;
"use client";

import React from "react";
import Link from "next/link";
import { tv, type VariantProps } from "tailwind-variants";

/**
 * 構成要素：タブ(ショート・ロング) / タグ(ハッシュ有・無)
 * スタイルの競合を避けるため、具体的なデザインはcompoundVariantsで定義しています。
 */
const tagStyles = tv({
  slots: {
    base: "inline-flex items-center justify-center transition-all duration-300 leading-none tracking-wider cursor-pointer",
    countBadge:
      "ml-[calc(6/16*1rem)] text-[calc(14/16*1rem)] transition-colors tracking-widest leading-none",
  },
  variants: {
    // 1. 大きな形状の分岐
    shape: {
      tab: { base: "" },
      tag: {
        base: "rounded-sm text-[calc(12/16*1rem)] py-[calc(4/16*1rem)] bg-white text-dark-gray border border-dark-gray hover:bg-dark-gray hover:text-white leading-none tracking-wider",
      },
    },
    // 2. タブ専用：ショート・ロング（名前の定義のみ）
    size: {
      short: { base: "" },
      long: { base: "w-full" },
    },
    // 3. タグ専用：ハッシュの有無による余白調整
    hasHash: {
      true: { base: "px-[calc(8/16*1rem)]" },
      false: { base: "px-[calc(12/16*1rem)]" },
    },
    // 4. 共通：状態管理
    isActive: {
      true: { base: "" },
      false: { base: "" },
    },
    isStatic: {
      true: { base: "cursor-default pointer-events-none active:scale-100" },
    },
  },
  // 5. 形状・サイズ・状態の組み合わせによるスタイル確定
  compoundVariants: [
    // --- タブ：ショート (デフォルト) ---
    {
      shape: "tab",
      size: "short",
      class: {
        base: "rounded-[calc(20/16*1rem)] text-[calc(14/16*1rem)] py-[calc(8/16*1rem)] px-[calc(16/16*1rem)] bg-white text-black border border-dark-gray hover:bg-dark-gray hover:text-white hover:border-dark-gray",
      },
    },
    // --- タブ：ロング ---
    {
      shape: "tab",
      size: "long",
      class: {
        base: "flex justify-between rounded-lg text-[calc(16/16*1rem)] leading-normal py-[calc(10/16*1rem)] px-[calc(16/16*1rem)] bg-light-gray text-black",
      },
    },
    // --- タブ：アクティブ状態 ---
    {
      shape: "tab",
      isActive: true,
      class: {
        base: "bg-black text-white border-black",
        countBadge: "text-white",
      },
    },
    // --- タグ：アクティブ状態 ---
    {
      shape: "tag",
      isActive: true,
      class: {
        base: "bg-dark-gray text-white",
        countBadge: "text-white",
      },
    },
  ],
  // デフォルトの組み合わせ
  defaultVariants: {
    shape: "tag",
    size: "short",
    hasHash: false,
    isActive: false,
  },
});

type TagVariants = VariantProps<typeof tagStyles>;

type BaseTagProps = {
  children: React.ReactNode;
  href?: string;
  count?: number;
  showCount?: boolean;
  isStatic?: boolean;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  className?: string;
} & TagVariants;

export function BaseTag({
  children,
  shape,
  size,
  hasHash,
  isActive,
  isStatic,
  count,
  showCount = true,
  href,
  onClick,
  className,
}: BaseTagProps) {
  // スタイルを生成（定義されたプロパティをすべて渡す）
  const { base, countBadge } = tagStyles({
    shape,
    size,
    hasHash,
    isActive,
    isStatic,
    className,
  });

  const content = (
    <>
      {children}
      {showCount && typeof count === "number" && (
        <span className={countBadge()}>{count}</span>
      )}
    </>
  );

  // Linkとしてレンダリングする場合
  if (href && !isStatic) {
    return (
      <Link href={href} className={base()} onClick={onClick}>
        {content}
      </Link>
    );
  }

  // Buttonとしてレンダリングする場合
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