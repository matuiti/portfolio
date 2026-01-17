// 5.
// タグ選択 UI。
// - AND 条件の複雑な UI
// - Sidebar の主要機能
// - 早めに作ることでフィルタリングロジックの検証ができる
// ロジックの司令塔：グループ名の表示と、タグの追加・削除の計算。

"use client";

import { TagList } from "./TagList";

interface TagGroupProps {
  label: string;
  icon: string;
  tags: string[];
  selected: string[]; // 全体の選択状態
  onChange: (newTags: string[]) => void; // 親(page)へ最終結果を返す
}

export function TagGroup({
  label,
  icon,
  tags,
  selected,
  onChange,
}: TagGroupProps) {
  // タグの追加・削除（トグル）のロジックをここで管理
  const handleTagClick = (tag: string) => {
    const nextTags = selected.includes(tag)
      ? selected.filter((t) => t !== tag) // 削除
      : [...selected, tag]; // 追加

    onChange(nextTags); // 計算結果を親(page)に報告
  };

  return (
    <div className="py-4">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-sm">{icon}</span>
        <span className="text-xs font-bold text-neutral-600 uppercase">
          {label}
        </span>
      </div>

      {/* 実際のUI描画は TagList に任せる */}
      <TagList tags={tags} selected={selected} onTagClick={handleTagClick} />
    </div>
  );
}