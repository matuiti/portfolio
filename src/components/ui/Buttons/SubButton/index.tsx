// src/components/ui/Buttons/SubButton/index.tsx

import { tv, type VariantProps } from "tailwind-variants";
import React from "react";
import Link from "next/link";

/**
 * サブボタンのスタイル定義
 */
export const subButtonStyles = tv({
  base: "inline-flex items-center justify-center font-medium transition-all active:scale-95 disabled:opacity-50 cursor-pointer hover:opacity-hover",
  variants: {
    variant: {
      white: "bg-black text-white",
      gray: "bg-dark-gray text-white",
    },
    isSubmit: {
      true: "py-2.25 px-4 text-base gap-2.5 rounded-lg",
      false: "py-1 px-2 text-sm gap-1 rounded-sm",
    },
  },
  defaultVariants: {
    variant: "white",
    isSubmit: false,
  },
});

/**
 * 共通の独自プロップス
 */
type SubButtonBaseProps = {
  children: React.ReactNode;
  leftIcon?: React.ElementType;
  iconSize?: "sm" | "md" | "lg" | "xl";
} & VariantProps<typeof subButtonStyles>;

/**
 * 識別可能なユニオン型を用いたプロップスの定義
 * hrefの有無によって、使用可能なHTML属性を切り替えます
 */
type SubButtonProps =
  | (SubButtonBaseProps & {
      href: string;
    } & React.AnchorHTMLAttributes<HTMLAnchorElement>)
  | (SubButtonBaseProps & {
      href?: never;
    } & React.ButtonHTMLAttributes<HTMLButtonElement>);

/**
 * SubButtonコンポーネント
 */
export const SubButton = (props: SubButtonProps) => {
  const {
    className,
    variant = "white",
    iconSize = "sm",
    leftIcon: Icon,
    children,
    href,
    isSubmit: isSubmitProp, // ★ここに追加：propsから抽出して、DOMへ流れるのを防ぐ
    ...rest
  } = props;

  // 型ガードを用いて type="submit" またはプロップスによる判定を行う
  const isSubmit =
    isSubmitProp ||
    (!href &&
      (rest as React.ButtonHTMLAttributes<HTMLButtonElement>).type ===
        "submit");

  const styles = subButtonStyles({ variant, isSubmit, className });

  const content = (
    <>
      {Icon && (
        <Icon size={iconSize} color={variant === "white" ? "white" : "black"} />
      )}
      {children}
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={styles}
        {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      className={styles}
      {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {content}
    </button>
  );
};
