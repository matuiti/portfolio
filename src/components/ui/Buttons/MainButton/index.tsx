// src / components / ui / Button / index.tsx;
import { tv, type VariantProps } from "tailwind-variants";
import React from "react";
import { ArrowRight } from "@/components/ui/Icons";

/**
 * ボタンのスタイル定義
 * ユーティリティクラスを優先し、slots を用いて各パーツの余白を管理します。
 */
export const mainButtonStyles = tv({
  slots: {
    base: "group inline-flex items-center justify-center font-bold transition-all active:scale-95 disabled:opacity-50",
    /** 縦線：border-current で文字色と同期 */
    separator: "h-4 border-l border-current",
    icon: "transition-transform duration-300 group-hover:translate-x-1 shrink-0",
  },
  variants: {
    variant: {
      /** ロング：背景薄灰、文字黒。テキストとアイコンを両端に配置 */
      long: {
        base: "justify-end bg-light-gray text-black hover:bg-slate-200 px-6 py-3.5 w-full rounded-lg",
        separator: "ml-6 mr-3",
      },
      /** ショート：背景黒、文字白。標準的なパディング */
      short: {
        base: "bg-black text-white hover:bg-neutral-800 px-4 py-3 rounded-lg",
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

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof mainButtonStyles> & {
    children: React.ReactNode;
  };

/**
 * MainButtonコンポーネント
 *
 * プロジェクト規約に従い type を使用して型定義を行います [1]。
 */
export const MainButton = ({
  variant = "short",
  className,
  children,
  ...props
}: ButtonProps) => {
  const { base, separator, icon } = mainButtonStyles({ variant, className });

  /**
   * ArrowRight の色同期解決
   * アイコンコンポーネントのデフォルトが color="black" であるため [2]、
   * ボタンの背景色に合わせて明示的に color プロップを渡します [3]。
   */
  const iconColor = variant === "short" ? "white" : "black";

  return (
    <button className={base()} {...props}>
      {children}

      {/* ロングとショートの時のみ、テキストとアイコンの間に縦線を表示 */}
      {(variant === "long" || variant === "short") && (
        <span className={separator()} aria-hidden="true" />
      )}

      <ArrowRight
        className={icon()}
        color={iconColor}
      />
    </button>
  );
};
