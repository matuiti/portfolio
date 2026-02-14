"use client";

import { tv } from "tailwind-variants";
import { WORK_CATEGORIES } from "@/data/works";
import { WorkFilterCategory } from "@/types/work";

/**
 * カテゴリタブのスタイル定義
 */
const tabStyles = tv({
  slots: {
    container:
      "flex flex-wrap items-center gap-[calc(10/16*1rem)]",
    button: [
      "px-[calc(16/16*1rem)] py-[calc(8/16*1rem)]",
      "rounded-[calc(20/16*1rem)] text-black text-[calc(14/16*1rem)] transition-all duration-300",
      "cursor-pointer",
    ],
  },
  variants: {
    isActive: {
      true: {
        button:
          "bg-black text-white",
      },
      false: {
        button:
          "bg-light-gray text-black",
      },
    },
  },
});

type CategoryTabsProps = {
  activeCategory: WorkFilterCategory;
  onCategoryChange: (category: WorkFilterCategory) => void;
};

export const CategoryTabs = ({
  activeCategory,
  onCategoryChange,
}: CategoryTabsProps) => {
  const { container, button } = tabStyles();

  return (
    <div className={container()}>
      {WORK_CATEGORIES.map((cat) => (
        <button
          key={cat.value}
          type="button"
          onClick={() => onCategoryChange(cat.value)}
          className={button({ isActive: activeCategory === cat.value })}
          aria-current={activeCategory === cat.value ? "true" : undefined}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
};
