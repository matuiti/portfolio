// src/app/gallery/components/filter/CategoryList.tsx
"use client";

import { CATEGORIES } from "@/data/gallery/categories";
import { Category } from "@/types/gallery/category";

type Props = {
  selected: Category;
  onChange: (category: Category) => void;
  counts?: Record<string, number>;
};

export function CategoryList({ selected, onChange, counts = {} }: Props) {
  return (
    <div className="space-y-4">
      <ul className="space-y-1">
        {CATEGORIES.map(({ id, label }) => {
          const count = counts[id] || 0;
          const isActive = selected === id;

          // 「すべて」以外で作品数が 0 のカテゴリは表示しない
          if (id !== "all" && count === 0) return null;

          return (
            <li key={id}>
              <button
                onClick={() => onChange(id)}
                className={`
                  w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-bold transition-all group
                  ${
                    isActive
                      ? "bg-neutral-900 text-white shadow-md translate-x-1"
                      : "text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900"
                  }
                `}
              >
                <span>{label}</span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-black
                  ${
                    isActive
                      ? "bg-white/20"
                      : "bg-neutral-200 text-neutral-500 group-hover:bg-white"
                  }`}
                >
                  {count}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
