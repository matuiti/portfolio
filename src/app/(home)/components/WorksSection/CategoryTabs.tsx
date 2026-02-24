"use client";

import { BaseTag } from "@/components/ui/BaseTag"; // パスは適宜調整してください
import { WORK_CATEGORIES } from "@/data/works";
import { WorkFilterCategory } from "@/types/work";
import { tv } from "tailwind-variants";

/**
 * レイアウトのみを定義するスタイル（個別のボタンスタイルはBaseTagに委譲）
 */
const tabLayoutStyles = tv({
  slots: {
    container: "flex flex-wrap items-center gap-[calc(10/16*1rem)]",
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
  const { container } = tabLayoutStyles();

  return (
    <div className={container()}>
      {WORK_CATEGORIES.map((cat) => (
        <BaseTag
          key={cat.value}
          shape="tab"
          size="short"
          isActive={activeCategory === cat.value}
          onClick={() => onCategoryChange(cat.value)}
        >
          {cat.label}
        </BaseTag>
      ))}
    </div>
  );
};
