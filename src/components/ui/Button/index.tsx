// src/components/ui/Button/index.tsx
import React from "react";
import { tv, type VariantProps } from "tailwind-variants";

// 1. FigmaのVariantを定義する
const button = tv({
  // 全てのボタンに共通するベーススタイル
  base: "inline-flex items-center justify-center font-medium transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none",

  variants: {
    // Figmaの「Intent」プロパティ
    intent: {
      primary:
        "bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-200",
      secondary: "bg-slate-100 text-slate-900 hover:bg-slate-200",
      outline:
        "border-2 border-slate-200 bg-transparent hover:border-slate-900 hover:bg-slate-900 hover:text-white",
      ghost: "bg-transparent text-slate-600 hover:bg-slate-100",
    },
    // Figmaの「Size」プロパティ
    size: {
      sm: "text-xs px-3 py-1.5 rounded",
      md: "text-sm px-5 py-2.5 rounded-md",
      lg: "text-base px-8 py-3 rounded-lg",
    },
    // Figmaの「Full Width」スイッチ
    fullWidth: {
      true: "w-full",
    },
  },
  // デフォルトの設定
  defaultVariants: {
    intent: "primary",
    size: "md",
  },
});

// 2. TypeScriptの型を定義
type ButtonVariants = VariantProps<typeof button>;
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  ButtonVariants;

// 3. コンポーネント本体
export const Button = ({
  intent,
  size,
  fullWidth,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={button({ intent, size, fullWidth, className })}
      {...props}
    />
  );
};
