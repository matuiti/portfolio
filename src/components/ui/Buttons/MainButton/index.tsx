// src/components/ui/Button/index.tsx

import { tv, type VariantProps } from "tailwind-variants";
import React from "react";

export const button = tv({
  base: "inline-flex items-center justify-center font-bold transition-all active:scale-95 disabled:opacity-50",
  variants: {
    intent: {
      primary: "bg-blue-600 text-white hover:bg-blue-700",
      outline:
        "border-2 border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white",
      underline:
        "text-slate-900 border-b-2 border-slate-900 hover:text-blue-600 hover:border-blue-600 px-0 pb-1",
    },
    size: {
      short: "px-6 py-3 text-sm",
      long: "px-12 py-4 text-base w-full md:w-auto",
    },
  },
  defaultVariants: {
    intent: "primary",
    size: "short",
  },
});

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof button>;

/**
 * 汎用ボタンコンポーネント
 */
export const MainButton = ({ className, intent, size, ...props }: ButtonProps) => (
  <button className={button({ intent, size, className })} {...props} />
);
