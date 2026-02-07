"use client";

type TagListProps = {
  tags: string[];
  selected: string[];
  onTagClick: (tag: string) => void;
}

export function TagList({ tags, selected, onTagClick }: TagListProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => {
        // 自分が選択状態にあるかどうかをチェック
        const isSelected = selected.includes(tag);

        return (
          <button
            key={tag}
            type="button"
            onClick={() => onTagClick(tag)}
            className={`px-3 py-1 rounded-full text-xs transition-all duration-200 ${
              isSelected
                ? "bg-blue-600 text-white shadow-sm"
                : "bg-white text-neutral-600 border border-neutral-200 hover:border-neutral-300"
            }`}
          >
            {tag}
          </button>
        );
      })}
    </div>
  );
}