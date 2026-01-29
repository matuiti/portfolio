"use client";

import { TagList } from "./TagList";

type TagGroupProps = {
  label: string;
  icon: string;
  tags: string[];
  selected: string[];
  onChange: (newTags: string[]) => void;
}

export function TagGroup({
  label,
  icon,
  tags,
  selected,
  onChange,
}: TagGroupProps) {
  // 【ロジック担当】クリックされたタグを今のリストに「追加」するか「削除」するか判断
  const handleTagClick = (tag: string) => {
    const isAlreadySelected = selected.includes(tag);

    const nextTags = isAlreadySelected
      ? selected.filter((t) => t !== tag) // すでに選ばれていれば除外
      : [...selected, tag]; // 選ばれていなければ追加

    // 計算した結果を上の階層（TagFilters）へ報告
    onChange(nextTags);
  };

  return (
    <div className="py-4">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-sm">{icon}</span>
        <span className="text-xs font-bold text-neutral-600 uppercase tracking-tight">
          {label}
        </span>
      </div>
      <TagList tags={tags} selected={selected} onTagClick={handleTagClick} />
    </div>
  );
}