// 5.
// タグ選択 UI。
// 純粋なUI：ボタンを並べる、選択中をハイライトする。

"use client";

interface TagListProps {
  tags: string[];
  selected: string[];
  onTagClick: (tag: string) => void; // クリックされたことを親に伝えるだけ
}

export function TagList({ tags, selected, onTagClick }: TagListProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => {
        const isSelected = selected.includes(tag);
        return (
          <button
            key={tag}
            onClick={() => onTagClick(tag)}
            className={`px-3 py-1 rounded-full text-xs transition-all ${
              isSelected
                ? "bg-blue-600 text-white"
                : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
            }`}
          >
            {tag}
          </button>
        );
      })}
    </div>
  );
}