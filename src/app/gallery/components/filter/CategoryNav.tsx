// src/app/gallery/components/filter/CategoryNav.tsx

import { Category } from "@/gallery/_types/category";
type CategoryNavProps = {
  selected: Category;
  onSelect: (cat: Category) => void;
  counts: Record<string, number>;
}

// UIに表示するカテゴリーリスト
const CATEGORY_ITEMS: { label: string; value: Category }[] = [
  { label: "All Items", value: "all" },
  { label: "Buttons", value: "button" },
  { label: "Cards", value: "card" },
  { label: "Forms", value: "form" },
  { label: "Modals", value: "modal" },
  { label: "Navigation", value: "navigation" },
  { label: "Lists", value: "list" },
  { label: "Loading", value: "loading" },
  { label: "Other", value: "other" },
];

export const CategoryNav = ({
  selected,
  onSelect,
  counts,
}: CategoryNavProps) => {
  return (
    <nav className="flex flex-col gap-1">
      {CATEGORY_ITEMS.map((cat) => {
        const count = counts[cat.value] || 0;
        const isActive = selected === cat.value;

        // 0件のカテゴリーは（all以外）非表示にする
        if (cat.value !== "all" && count === 0) return null;

        return (
          <button
            key={cat.value}
            onClick={() => onSelect(cat.value)}
            className={`
              group w-full flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-bold transition-all duration-300
              ${
                isActive
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-100 translate-x-1"
                  : "text-neutral-500 hover:bg-white hover:text-blue-600 hover:shadow-sm"
              }
            `}
          >
            <span className="flex items-center gap-3">
              {/* アイコンなどを置く場合はここ */}
              {cat.label}
            </span>

            {/* 件数バッジ */}
            <span
              className={`
              text-[10px] px-2 py-0.5 rounded-full font-black transition-colors
              ${
                isActive
                  ? "bg-white/20 text-white"
                  : "bg-neutral-100 text-neutral-400 group-hover:bg-blue-50 group-hover:text-blue-600"
              }
            `}
            >
              {count}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
