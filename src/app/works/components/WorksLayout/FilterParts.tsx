// src/app/works/components/WorksLayout/FilterParts.tsx
"use client";

import { Search, X } from "lucide-react";
import { WorkFilterCategory, WorkCategory } from "@/types/work"; // WorkCategoryを追加
import { ALL_WORKS, WORK_CATEGORIES } from "@/data/works";

// --- 検索ボックス (変更なし) ---
export const WorksSearchBox = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) => (
  <div className="relative group">
    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="キーワードで検索..."
      className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
    />
    {value && (
      <button
        onClick={() => onChange("")}
        className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    )}
  </div>
);

// --- カテゴリリスト (エラー解消版) ---
type CategoryListProps = {
  selected: WorkFilterCategory;
  onSelect: (cat: WorkFilterCategory) => void;
  counts?: Record<string, number>; // countsを追加
};

export const WorksCategoryList = ({
  selected,
  onSelect,
  counts = {}, // デフォルト値を設定
}: CategoryListProps) => {
  const categories: { label: string; value: WorkFilterCategory }[] = WORK_CATEGORIES;

  // countsが渡されていない場合の内部計算用ロジック (anyを排除) [cite: 202]
  const internalCounts = categories.reduce(
    (acc, cat) => {
      if (cat.value === "all") {
        acc[cat.value] = ALL_WORKS.length;
      } else {
        // cat.value が "all" ではないことを確認した上で WorkCategory にキャスト
        const targetCat = cat.value as WorkCategory;
        acc[cat.value] = ALL_WORKS.filter((w) =>
          w.category.includes(targetCat),
        ).length;
      }
      return acc;
    },
    {} as Record<string, number>,
  );

  const displayCounts =
    Object.keys(counts).length > 0 ? counts : internalCounts;

  return (
    <div className="space-y-1">
      {categories.map((cat) => (
        <button
          key={cat.value}
          onClick={() => onSelect(cat.value)}
          className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-bold transition-all group ${
            selected === cat.value
              ? "bg-slate-900 text-white shadow-md translate-x-1"
              : "text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900"
          }`}
        >
          {cat.label}
          <span
            className={`text-[10px] px-2 py-0.5 rounded-full font-black ${
              selected === cat.value
                ? "bg-white/20"
                : "bg-neutral-200 text-neutral-500 group-hover:bg-white"
            }`}
          >
            {displayCounts[cat.value] || 0}
          </span>
        </button>
      ))}
    </div>
  );
};

// --- タグフィルタ (変更なし) ---
export const WorksTagFilters = ({
  selectedTags,
  onChange,
}: {
  selectedTags: string[];
  onChange: (tags: string[]) => void;
}) => {
  const availableTags = Array.from(
    new Set(ALL_WORKS.flatMap((w) => w.tags)),
  ).sort();

  const handleTagClick = (tag: string) => {
    const next = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];
    onChange(next);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {availableTags.map((tag) => (
        <button
          key={tag}
          onClick={() => handleTagClick(tag)}
          className={`px-3 py-1.5 rounded-full text-[11px] font-bold transition-all border ${
            selectedTags.includes(tag)
              ? "bg-blue-600 text-white border-blue-600 shadow-sm"
              : "bg-white text-slate-500 border-slate-200 hover:border-blue-400"
          }`}
        >
          {tag}
        </button>
      ))}
    </div>
  );
};
