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
    <section className="bg-neutral-50 p-6 rounded-2xl border border-neutral-100">
      <div className="flex items-center justify-between mb-4 px-1">
        <h2 className="text-xs font-bold text-neutral-400 uppercase tracking-widest">
          Filter by Tags
        </h2>
        {selectedTags.length > 0 && (
          <button
            onClick={() => onChange([])}
            className="text-xs text-blue-600 hover:underline"
          >
            全ての選択を解除
          </button>
        )}
      </div>

      <div className="divide-y divide-neutral-200">
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
    </section>
  );
}
