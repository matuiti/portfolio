// src/components/ui/MenuItem/index.tsx
import { tv, type VariantProps } from "tailwind-variants";
import Link from "next/link";
import React from "react";

/**
 * メニューアイテムのスタイル定義
 * 既存のスタイル設定を維持したまま、responsive バリアントのみを追加
 */
export const menuItemStyles = tv({
  slots: {
    base: "group relative flex items-center transition-all duration-300",
    indicator:
      "w-2 h-2 transition-all duration-300 flex items-center justify-center",
    label: "font-bold",
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
      true: { base: "cursor-pointer" },
      false: { base: "text-dark-gray cursor-not-allowed" },
    },
    isActive: {
      true: { indicator: "opacity-100" },
      false: { indicator: "opacity-0" },
    },
    indicatorLayout: {
      // 既存のスタイルを維持 [3]
      fixed: {
        base: "gap-0",
        indicator: "w-0 h-0",
      },
      // 既存のスタイルを維持 [3]
      floating: {
        indicator: "absolute",
      },
      // レスポンシブ対応用に追加（既存の fixed/floating をメディアクエリで切り替え）
      responsive: {
        base: "tablet:gap-0",
        indicator: "absolute tablet:static tablet:w-0 tablet:h-0",
      },
    },
  },
  compoundVariants: [
    // 既存の複合バリアントを維持 [3]
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
    // responsive 用の複合バリアント（tablet以上の時に fixed と同等の挙動を適用）
    {
      indicatorLayout: "responsive",
      isActive: true,
      class: {
        base: "tablet:gap-1",
        indicator: "tablet:w-2 tablet:h-2 tablet:shrink-0",
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
  /** 表示するアイコンや要素（省略時は丸ポチ） */
  renderIndicator?: React.ReactNode;
  /** 表示位置を調整するクラス */
  indicatorOffsetClass?: string;
} & MenuItemVariants;

/**
 * デフォルトの丸ポチ [4]
 */
const DefaultIndicator = () => (
  <span className="w-2 h-2 rounded-full bg-current" />
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
          // indicatorLayout が fixed 以外の時（floating または responsive）にオフセットを適用 [2]
          class: indicatorLayout !== "fixed" ? indicatorOffsetClass : "",
        })}
        aria-hidden="true"
      >
        {renderIndicator}
      </span>
      <span className={labelStyle()}>{label}</span>
    </>
  );

  // 非公開時は span としてレンダリング [2]
  if (!isPublished) {
    return <span className={base()}>{content}</span>;
  }

  return (
    <Link href={href} className={base()}>
      {content}
    </Link>
  );
};
