// 7. ItemCard
// UIパーツのカード。
// - タイトル・説明・タグの配置を決める重要部分
// - モーダルの入口にもなる
// - 一覧の見た目がここで決まる

// src/app/gallery/components/list/ItemCard.tsx
"use client";

import { UIPart } from "@/types/gallery/ui-part";
import { PreviewSizeSwitcher } from "../preview/PreviewSizeSwitcher";

// 名前付きエクスポートに変更し、Propsを受け取る
export function ItemCard({ item }: { item: UIPart }) {
  return (
    <div className="group bg-white border border-neutral-100 rounded-3xl overflow-hidden hover:shadow-xl hover:shadow-neutral-200/50 transition-all duration-300">
      {/* プレビューエリア（仮のグレー背景） */}
      <div className="aspect-video bg-neutral-50 flex items-center justify-center relative">
        <span className="text-neutral-300 font-medium">Preview Area</span>
        
        {/* ホバー時に表示されるボタンなどの演出をここに追加予定 */}
      </div>

      {/* コンテンツエリア */}
      <div className="p-5 space-y-3">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-bold text-neutral-800 leading-tight">
              {item.title}
            </h3>
            <p className="text-xs text-neutral-400 mt-1 line-clamp-2">
              {item.description}
            </p>
          </div>
        </div>

        {/* タグ表示 */}
        <div className="flex flex-wrap gap-1.5">
          {item.tags.map((tag) => (
            <span key={tag} className="text-[10px] px-2 py-0.5 bg-neutral-100 text-neutral-500 rounded-md">
              #{tag}
            </span>
          ))}
        </div>

        {/* 下部アクションエリア */}
        <div className="pt-3 border-t border-neutral-50 flex items-center justify-between text-xs">
          <div className="flex gap-3">
            <button className="text-neutral-500 hover:text-blue-600 transition-colors font-medium">説明</button>
            <button className="text-neutral-500 hover:text-blue-600 transition-colors font-medium">コード</button>
          </div>
          <div className="md:hidden">
             <PreviewSizeSwitcher />
          </div>
        </div>
      </div>
    </div>
  );
}
