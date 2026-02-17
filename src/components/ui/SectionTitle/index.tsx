// src / components / ui / SectionTitle / index.tsx;
import { tv, type VariantProps } from "tailwind-variants";
import React from "react";

/**
 * SectionTitleのスタイル定義
 * 3つのタイプ × 2つのサイズ = 計6パターンの組み合わせに対して個別のスタイル調整が可能です。
 */
const sectionTitleStyles = tv({
  slots: {
    base: "flex flex-col font-bold text-black",
    enTitle: "uppercase",
    jpWrapper: "flex items-center gap-x-[calc(8/16*1rem)]",
    jpTitle: "text-[calc(18/16*1rem)]",
    bullet:
      "shrink-0 rounded-full bg-dark-gray w-[calc(8/16*1rem)] h-[calc(8/16*1rem)]", // 日本語タイトルの左の丸ポチ
  },
  variants: {
    variant: {
      default: {
        base: "items-start",
        jpWrapper: "mt-[calc(12/16*1rem)]",
      },
      underlined: {
        base: "items-start border-b border-dark-gray pb-[calc(20/16*1rem)]",
        jpWrapper: "mt-[calc(12/16*1rem)]",
      },
      center: {
        base: "items-center text-center",
        jpWrapper: "mt-[calc(12/16*1rem)] justify-center",
        bullet: "hidden", // 中央寄せは丸ポチなし
      },
    },
    size: {
      large: {
        enTitle: "",
        jpTitle: "",
        bullet: "",
      },
      small: {
        enTitle: "",
        jpTitle: "",
        bullet: "",
      },
      responsive: {
        enTitle: "",
        jpTitle: "",
      },
    },
  },
  /**
   * 複合バリアント設定
   */
  compoundVariants: [
    // 1. デフォルト × 大
    {
      variant: "default",
      size: "large",
      class: {
        enTitle: "text-[calc(60/16*1rem)]", // ここに〇〇スタイルを記述
        jpTitle: "",
      },
    },
    // 2. デフォルト × 小
    {
      variant: "default",
      size: "small",
      class: {
        enTitle: "text-[calc(48/16*1rem)]",
        jpTitle: "",
      },
    },
    // 3. 下線 × 大
    {
      variant: "underlined",
      size: "large",
      class: {
        enTitle: "text-[calc(60/16*1rem)]",
        jpTitle: "",
      },
    },
    // 4. 下線 × 小
    {
      variant: "underlined",
      size: "small",
      class: {
        enTitle: "text-[calc(48/16*1rem)]",
        jpTitle: "",
      },
    },
    // 5. 中央寄せ × 大
    {
      variant: "center",
      size: "large",
      class: {
        enTitle: "text-[calc(36/16*1rem)]",
        jpTitle: "",
      },
    },
    // 6. 中央寄せ × 小
    {
      variant: "center",
      size: "small",
      class: {
        enTitle: "text-[calc(30/16*1rem)]",
        jpTitle: "",
      },
    },
    // --- responsive 用の定義 ---
    // 1. デフォルト/下線タイプ × レスポンシブ
    {
      variant: ["default", "underlined"],
      size: "responsive",
      class: {
        enTitle: "text-[calc(48/16*1rem)] small:text-[calc(60/16*1rem)]",
      },
    },
    // 2. 中央寄せタイプ × レスポンシブ
    {
      variant: "center",
      size: "responsive",
      class: {
        enTitle: "text-[calc(30/16*1rem)] small:text-[calc(36/16*1rem)]",
      },
    },
  ],
  defaultVariants: {
    variant: "default",
    size: "responsive",
  },
});

type SectionTitleStylesProps = VariantProps<typeof sectionTitleStyles>;

type SectionTitleProps = {
  enTitle: string;
  jpTitle: string;
  variant?: SectionTitleStylesProps["variant"];
  size?: SectionTitleStylesProps["size"];
  className?: string;
  /** 外部から一時的な上書きが必要な場合用 */
  enClassName?: string;
  jpClassName?: string;
};

/**
 * SectionTitleコンポーネント
 */
export const SectionTitle = ({
  enTitle,
  jpTitle,
  variant,
  size,
  className,
  enClassName,
  jpClassName,
}: SectionTitleProps) => {
  const {
    base,
    enTitle: enStyle,
    jpWrapper,
    jpTitle: jpStyle,
    bullet,
  } = sectionTitleStyles({
    variant,
    size,
  });

  return (
    <div className={base({ className })}>
      {/* 英語タイトル */}
      <span className={enStyle({ className: enClassName })}>{enTitle}</span>

      {/* 日本語タイトルエリア */}
      <div className={jpWrapper()}>
        {/* 丸ポチ：centerタイプでは自動的に hidden になります */}
        <span className={bullet()} aria-hidden="true" />
        {/* 日本語タイトル */}
        <h2 className={jpStyle({ className: jpClassName })}>{jpTitle}</h2>
      </div>
    </div>
  );
};
