import { tv, type VariantProps } from "tailwind-variants";
import Link from "next/link";
import React from "react";

/**
 * メニューアイテムのスタイル定義
 */
export const menuItemStyles = tv({
  slots: {
    base: "group relative inline-flex items-center transition-all duration-300",
    indicator:
      "w-2 h-2 transition-all duration-300 flex items-center justify-center",
    label: "font-bold",
    statusBadge:
      "text-[10px] ml-2 px-1 border rounded-sm leading-tight uppercase",
  },
  variants: {
    color: {
      black: {
        base: "text-black",
        statusBadge: "border-slate-300 text-slate-500",
      },
      white: {
        base: "text-white",
        statusBadge: "border-white/40 text-white/80",
      },
    },
    isPublished: {
      true: { base: "cursor-pointer" },
      false: { base: "text-gray cursor-not-allowed" },
    },
    isActive: {
      true: { indicator: "opacity-100" },
      false: { indicator: "opacity-0" },
    },
    indicatorLayout: {
      fixed: {
        base: "gap-0",
        indicator: "w-0 h-0", // 非アクティブ時は 0
      },
      floating: {
        indicator: "absolute", // 位置は props で制御
      },
    },
  },
  compoundVariants: [
    {
      isPublished: true,
      color: "black",
      class: { base: "hover:text-blue-600" },
    },
    {
      isPublished: true,
      color: "white",
      class: { base: "hover:text-white/70" },
    },
    {
      indicatorLayout: "fixed",
      isActive: true,
      class: {
        base: "gap-1",
        indicator: "w-2 h-2 shrink-0",
      },
    },
  ],
  defaultVariants: {
    color: "black",
    isPublished: true,
    isActive: false,
    indicatorLayout: "fixed",
  },
});

type MenuItemVariants = VariantProps<typeof menuItemStyles>;

type MenuItemProps = {
  label: string;
  href: string;
  /** 表示するアイコンや要素（省略時はいつもの丸ポチ） */
  renderIndicator?: React.ReactNode;
  /** 表示位置を調整するクラス */
  indicatorOffsetClass?: string;
} & MenuItemVariants;

/**
 * デフォルトの丸ポチ
 */
const DefaultIndicator = () => (
  <span className="w-full h-full rounded-full bg-current" />
);

/**
 * 共通メニューアイテムコンポーネント
 */
export const MenuItem = ({
  label,
  href,
  color,
  isPublished,
  isActive,
  indicatorLayout,
  renderIndicator = <DefaultIndicator />,
  indicatorOffsetClass = "-left-4",
}: MenuItemProps) => {
  const {
    base,
    indicator,
    label: labelStyle,
    statusBadge,
  } = menuItemStyles({
    color,
    isPublished,
    isActive,
    indicatorLayout,
  });

  const content = (
    <>
      <span
        className={indicator({
          class: indicatorLayout === "floating" ? indicatorOffsetClass : "",
        })}
        aria-hidden="true"
      >
        {renderIndicator}
      </span>
      <span className={labelStyle()}>{label}</span>
      {!isPublished && <span className={statusBadge()}>Soon</span>}
    </>
  );

  if (!isPublished) {
    return <div className={base()}>{content}</div>;
  }

  return (
    <Link href={href} className={base()}>
      {content}
    </Link>
  );
};
