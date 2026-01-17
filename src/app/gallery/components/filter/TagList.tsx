// 5.
// タグ選択 UI。
// 純粋なUI：ボタンを並べる、選択中をハイライトする。
// このコンポーネントは「自分が何を選択しているか」すら知りません。ただ「これを表示して、クリックされたら教えて」と言われるだけの、最もシンプルな部品です。

"use client";

interface TagListProps {
  tags: string[]; // 表示すべきタグの配列
  selected: string[]; // 現在選択されているタグの配列（ハイライト判定用）
  onTagClick: (tag: string) => void; // クリックされた時に「タグ名」を上に報告する関数
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
            onClick={() => onTagClick(tag)} // 親から受け取った関数を実行
            className={`px-3 py-1 rounded-full text-xs transition-all duration-200 ${
              isSelected
                ? "bg-blue-600 text-white shadow-sm" // 選択時のスタイル
                : "bg-white text-neutral-600 border border-neutral-200 hover:border-neutral-300" // 未選択時のスタイル
            }`}
          >
            {tag}
          </button>
        );
      })}
    </div>
  );
}