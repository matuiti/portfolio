// src/components/ui/Buttons/MainButton/index.tsx

import { tv, type VariantProps } from "tailwind-variants";
import React from "react";
import Link from "next/link"; // Linkをインポート
import { ArrowRight } from "@/components/ui/Icons";

/**
 * ボタンのスタイル定義
 * 既存のスタイル設定を一切変更せずに維持します [1, 2]。
 */
export const mainButtonStyles = tv({
  slots: {
    base: "group inline-flex items-center justify-center font-bold transition-all active:scale-95 disabled:opacity-50 cursor-pointer",
    /** 縦線：border-current で文字色と同期 */
    separator: "h-4 border-l border-current",
    icon: "transition-transform duration-300 group-hover:translate-x-1 shrink-0",
  },
  variants: {
    variant: {
      /** ロング：背景薄灰、文字黒。テキストとアイコンを両端に配置 */
      long: {
        base: "justify-end bg-black text-white px-6 py-3.5 w-full rounded-lg",
        separator: "ml-6 mr-3",
      },
      /** ショート：背景黒、文字白。標準的なパディング */
      short: {
        base: "bg-black text-white hover:bg-neutral-800 px-7.5 py-[calc(15.5/16*1rem)] rounded-lg",
        separator: "ml-3 mr-2",
      },
      /** 下線：背景なし。縦線は表示されません */
      underline: {
        base: "text-black border-b border-black hover:text-blue-600 hover:border-blue-600 px-0 pb-1",
        icon: "ml-2",
      },
    },
  },
  defaultVariants: {
    variant: "short",
  },
});

/**
 * プロップスの定義
 * button属性からアンカー（Link）属性ベースへ変更し、hrefを追加します [3]。
 */
type MainButtonProps = React.AnchorHTMLAttributes<HTMLAnchorElement> &
  VariantProps<typeof mainButtonStyles> & {
    children: React.ReactNode;
    href?: string; // hrefを必須に近い形で扱えるよう定義
  };

/**
 * MainButtonコンポーネント
 * 要素を button から Link に変更しました。
 */
export const MainButton = ({
  variant = "short",
  href = "/", // デフォルト値を設定
  className,
  children,
  ...props
}: MainButtonProps) => {
  const { base, separator, icon } = mainButtonStyles({ variant, className });

  /**
   * ArrowRight の色同期解決
   * 既存のロジックを維持します [4]。
   */
  const iconColor =
    variant === "short" || variant === "long" ? "white" : "black";

  return (
    <Link href={href} className={base()} {...props}>
      {children}

      {/* ロングとショートの時のみ、テキストとアイコンの間に縦線を表示（既存ロジック） */}
      {(variant === "long" || variant === "short") && (
        <span className={separator()} aria-hidden="true" />
      )}

      <ArrowRight className={icon()} color={iconColor} />
    </Link>
  );
};
