// src/components/ui/MenuItem/index.tsx

import { tv, type VariantProps } from "tailwind-variants";
import Link from "next/link";
import React from "react";

/**
 * メニューアイテムのスタイル定義
 */
export const menuItemStyles = tv({
  slots: {
    base: "group relative flex items-center transition-all duration-300",
    indicator: [
      "w-2 h-2 transition-all duration-300 flex items-center justify-center",
      "pb-[calc(6/16*1rem)]", // labelに揃える
    ],
    label: [
      "font-bold transition-all duration-300",
      "pb-[calc(6/16*1rem)]", // レイアウト維持のためパディングは固定
    ],
  },
  variants: {
    color: {
      black: {
        base: "text-black",
      },
      white: {
        base: "text-white",
      },
    },
    isPublished: {
      true: {
        base: "cursor-pointer",
        // 公開時のみホバーアニメーションを有効化 [cite: 144, 442]
        label: [
          "bg-[linear-gradient(currentColor,currentColor)]",
          "bg-no-repeat",
          "bg-bottom-right",
          "bg-size-[0_1px]",
          "transition-[background-size] duration-500 ease-out",
          "group-hover:bg-bottom-left",
          "group-hover:bg-size-[100%_1px]",
        ],
      },
      false: {
        base: "text-dark-gray cursor-not-allowed",
        // 未公開時はアニメーション関連のクラスを付与しない
      },
    },
    isActive: {
      true: { indicator: "opacity-100" },
      false: { indicator: "opacity-0" },
    },
    indicatorLayout: {
      fixed: {
        base: "gap-0",
        indicator: "w-0 h-0",
      },
      floating: {
        indicator: "absolute",
      },
      responsive: {
        base: "gap-y-1 tablet:gap-1",
        indicator: "absolute tablet:static",
      },
    },
  },
  compoundVariants: [
    {
      isPublished: true,
      color: "black",
      class: { base: "hover:black" },
    },
    {
      isPublished: true,
      color: "white",
      class: { base: "hover:text-white" },
    },
    // 既存の isActive 時のレイアウト制御を維持 [cite: 146]
    {
      indicatorLayout: "fixed",
      isActive: true,
      class: {
        base: "gap-1",
        indicator: "w-2 h-2 shrink-0",
      },
    },
    {
      indicatorLayout: "responsive",
      isActive: true,
      class: {
        base: "tablet:gap-1",
        indicator: "tablet:w-2 tablet:h-2 tablet:shrink-0",
      },
    },
    {
      indicatorLayout: "responsive",
      isActive: false,
      class: {
        base: "tablet:gap-1",
        indicator: "tablet:w-0 tablet:h-0 tablet:shrink",
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
  renderIndicator?: React.ReactNode;
  indicatorOffsetClass?: string;
} & MenuItemVariants;

const DefaultIndicator = () => (
  <span className="w-2 h-2 rounded-full bg-current" />
);

export const MenuItem = ({
  label,
  href,
  color,
  isPublished,
  isActive,
  indicatorLayout,
  renderIndicator = <DefaultIndicator />,
  indicatorOffsetClass = "-left-3",
}: MenuItemProps) => {
  const {
    base,
    indicator,
    label: labelStyle,
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
          class: indicatorLayout !== "fixed" ? indicatorOffsetClass : "",
        })}
        aria-hidden="true"
      >
        {renderIndicator}
      </span>
      <span className={labelStyle()}>{label}</span>
    </>
  );

  // 非公開時は span としてレンダリング（アニメーションなし） [cite: 148]
  if (!isPublished) {
    return <span className={base()}>{content}</span>;
  }

  return (
    <Link href={href} className={base()}>
      {content}
    </Link>
  );
};
