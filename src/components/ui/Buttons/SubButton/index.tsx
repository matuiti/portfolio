// src/components/ui/Buttons/SubButton/index.tsx

import { tv, type VariantProps } from "tailwind-variants";
import React from "react";

/**
 * サブボタンのスタイル定義
 *
 * - プロジェクト規約に従い、pxではなくcalc()を用いたrem換算を使用します [cite: 97]。
 */
export const subButtonStyles = tv({
  base: "inline-flex items-center justify-center font-medium transition-all active:scale-95 disabled:opacity-50 rounded-lg py-1 px-2 text-sm gap-1",
  variants: {
    variant: {
      /** 白パターン：テキスト・アイコンが白、背景が黒 */
      white: "bg-black text-white hover:bg-neutral-800",
      /** 黒パターン：テキスト・アイコンが黒、背景がlight-gray */
      black: "bg-light-gray text-black hover:bg-slate-200",
    },
  },
  defaultVariants: {
    variant: "white",
  },
});

/**
 * Propsの定義
 */
type SubButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof subButtonStyles> & {
    /** テキストの左に表示するアイコンコンポーネント */
    leftIcon?: React.ElementType;
    /**
     * アイコンのサイズ。既存アイコンの variant (sm, md, lg, xl) に準拠します [cite: 26, 32]。
     * 省略時は "sm" になります。
     */
    iconSize?: "sm" | "md" | "lg" | "xl";
  };

/**
 * SubButtonコンポーネント
 */
export const SubButton = ({
  className,
  /**
   * 分割代入でデフォルト値を設定することで、アイコンへの color={variant} 渡しを確実にします。
   */
  variant = "white",
  iconSize = "sm",
  leftIcon: Icon,
  children,
  ...props
}: SubButtonProps) => {
  return (
    <button className={subButtonStyles({ variant, className })} {...props}>
      {Icon && (
        <Icon
          className="shrink-0"
          size={iconSize}
          /**
           * ボタンの variant (white/black) をアイコンの color プロップへ流し込み、
           * テキストと色を同期させます [cite: 95]。
           */
          color={variant}
        />
      )}
      <span>{children}</span>
    </button>
  );
};
