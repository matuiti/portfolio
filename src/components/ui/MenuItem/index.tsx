import { tv, type VariantProps } from "tailwind-variants";
import Link from "next/link";
import React from "react";

/**
 * メニューアイテムのスタイル定義 (tailwind-variants)
 * スロット、バリアント、複合バリアント（compoundVariants）を組み合わせて
 * 複雑なレイアウトロジックを一元管理します [cite: 411]。
 */
export const menuItemStyles = tv({
  slots: {
    base: "group relative inline-flex items-center transition-all duration-300",
    // transition-all により、ドットの出現とテキスト移動をスムーズにします
    dot: "rounded-full bg-current transition-all duration-300",
    label: "font-bold",
    statusBadge:
      "text-[10px] ml-2 px-1 border rounded-sm leading-tight uppercase",
  },
  variants: {
    // 1. カラーバリアント (黒・白) [cite: 411]
    color: {
      black: {
        base: "text-black hover:text-blue-600",
        statusBadge: "border-slate-300 text-slate-500",
      },
      white: {
        base: "text-white hover:text-white/70",
        statusBadge: "border-white/40 text-white/80",
      },
    },
    // 2. 公開ステータス (未公開時は不透明度を下げる) [cite: 407, 423]
    isPublished: {
      false: {
        base: "text-gray cursor-not-allowed",
      },
    },
    // 3. カレントページの目印 (丸ポチの有無)
    isActive: {
      true: {
        dot: "opacity-100",
      },
      false: {
        dot: "opacity-0",
      },
    },
    // 4. 丸ポチのレイアウトロジック
    dotLayout: {
      // fixed: ドットが「実体」として幅を持ち、非アクティブ時は幅ゼロになる設定
      fixed: {
        base: "gap-0",
        dot: "w-0 h-0",
      },
      // floating: ドットが「浮遊」し、テキストの位置に影響を与えない設定
      floating: {
        dot: "w-2 h-2 absolute -left-4",
      },
    },
  },
  // 複合バリアント: 「fixedレイアウト」かつ「アクティブ」の時だけ幅と隙間を生成
  compoundVariants: [
    {
      dotLayout: "fixed",
      isActive: true,
      class: {
        base: "gap-1",
        dot: "w-2 h-2 shrink-0",
      },
    },
  ],
  defaultVariants: {
    color: "black",
    isPublished: true,
    isActive: false,
    dotLayout: "fixed",
  },
});

type MenuItemVariants = VariantProps<typeof menuItemStyles>;

type MenuItemProps = {
  label: string;
  href: string;
} & MenuItemVariants;

/**
 * 共通メニューアイテムコンポーネント
 * PCヘッダー、モバイルドロワー、フッターで利用可能です。
 */
export const MenuItem = ({
  label,
  href,
  color,
  isPublished,
  isActive,
  dotLayout,
}: MenuItemProps) => {
  const {
    base,
    dot,
    label: labelStyle,
    statusBadge,
  } = menuItemStyles({
    color,
    isPublished,
    isActive,
    dotLayout,
  });

  // コンテンツのレンダリング
  const content = (
    <>
      {/* aria-hidden で装飾用のドットであることを明示 */}
      <span className={dot()} aria-hidden="true" />
      <span className={labelStyle()}>{label}</span>
      {/* 未公開の場合のみ「Soon」バッジを表示 [cite: 407] */}
      {!isPublished && <span className={statusBadge()}>Soon</span>}
    </>
  );

  // 未公開アイテムの場合は Link を使わず、クリック不可の div として描画 [cite: 301, 315]
  if (!isPublished) {
    return <div className={base()}>{content}</div>;
  }

  return (
    <Link href={href} className={base()}>
      {content}
    </Link>
  );
};
