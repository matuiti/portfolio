// src/components/layout/Header/header.styles.ts
import { tv } from "tailwind-variants";

export const headerStyles = tv({
  base: "fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out",
  variants: {
    // スクロール状態（MVを超えたかどうか）
    isScrolled: {
      true: "bg-white/80 backdrop-blur-md py-3 shadow-sm border-b border-neutral-100",
      false: "bg-transparent py-6 border-transparent",
    },
    // トップページでの初期非表示状態（GSAPで操作するために opacity-0 にしておく）
    isInitialHidden: {
      true: "opacity-0 -translate-y-full",
      false: "opacity-100 translate-y-0",
    },
  },
  defaultVariants: {
    isScrolled: false,
    isInitialHidden: false,
  },
});
