// 4.
// カテゴリー選択 UI。
// - フィルタリングの起点
// - これがないと一覧が動かない
// - カテゴリ一覧を表示
// - 選択中のカテゴリをハイライト
// - クリックで setSelectedCategory を呼ぶ
// - SP でも PC でも同じ UI を使える（Sidebar と DrawerMenu で共通）


"use client";

import { CATEGORIES } from "@/data/gallery/categories";

type Props = {
  selected: string;
  onChange: (category: string) => void;
};

export function CategoryList({ selected, onChange }: Props) {
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold text-neutral-600 mb-2">
        カテゴリー
      </h3>

      <ul className="space-y-1">
        {CATEGORIES.map((cat) => {
          const isActive = selected === cat.id;

          return (
            <li key={cat.id}>
              <button
                onClick={() => onChange(cat.id)}
                className={`w-full text-left px-3 py-2 rounded-md text-sm transition
                  ${
                    isActive
                      ? "bg-neutral-900 text-white"
                      : "text-neutral-700 hover:bg-neutral-100"
                  }
                `}
              >
                {cat.label}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
