// TagFilters.tsx（上部：セクションの枠組み）
// タグフィルタという「一つの機能エリア」を定義するコンポーネントです。データのループと、便利な機能（リセットなど）を管理します。
// 枠組み管理：タグセクションの背景、タイトル、全リセット機能。
"use client";

import { TAG_GROUPS } from "@/data/gallery/tag-groups";
import { TagGroup } from "./TagGroup";

interface TagFiltersProps {
  selectedTags: string[];
  onChange: (tags: string[]) => void;
}

export function TagFilters({ selectedTags, onChange }: TagFiltersProps) {
  return (
    <div className="space-y-2">
      {" "}
      <div className="flex items-center justify-between mb-2 px-1">
        {selectedTags.length > 0 && (
          <button
            onClick={() => onChange([])}
            className="text-[10px] text-blue-600 hover:underline ml-auto"
          >タグの選択を解除する
          </button>
        )}
      </div>
      <div className="divide-y divide-neutral-100 border-t border-b border-neutral-100">
        {Object.entries(TAG_GROUPS).map(([key, group]) => (
          <TagGroup
            key={key}
            label={group.label}
            icon={group.icon}
            tags={group.tags}
            selected={selectedTags}
            onChange={onChange}
          />
        ))}
      </div>
    </div>
  );
}