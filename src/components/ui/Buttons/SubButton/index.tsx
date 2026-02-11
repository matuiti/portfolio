// src/components/ui/Buttons/SubButton/index.tsx

import { tv, type VariantProps } from "tailwind-variants";
import React from "react";
import Link from "next/link";

/**
 * サブボタンのスタイル定義
 */
export const subButtonStyles = tv({
  base: "inline-flex items-center justify-center font-medium transition-all active:scale-95 disabled:opacity-50 rounded-lg",
  variants: {
    variant: {
      white: "bg-black text-white hover:bg-neutral-800",
      black: "bg-light-gray text-black hover:bg-slate-200",
    },
    isSubmit: {
      true: "py-2.5 px-4 text-base gap-2.5",
      false: "py-1 px-2 text-sm gap-1",
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
    ...rest
  } = props;

  // 型ガードを用いて type="submit" の判定を安全に行う
  const isSubmit =
    !href &&
    (rest as React.ButtonHTMLAttributes<HTMLButtonElement>).type === "submit";
  const styles = subButtonStyles({ variant, isSubmit, className });

  const content = (
    <>
      {Icon && <Icon className="shrink-0" size={iconSize} color={variant} />}
      {children}
    </>
  );

  // Link としてレンダリングする場合
  if (href) {
    const { ...anchorProps } =
      rest as React.AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <Link href={href} className={styles} {...anchorProps}>
        {content}
      </Link>
    );
  }

  // button としてレンダリングする場合
  const { ...buttonProps } =
    rest as React.ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button className={styles} {...buttonProps}>
      {content}
    </button>
  );
};
