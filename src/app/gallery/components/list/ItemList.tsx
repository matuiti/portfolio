// ここから「ギャラリーとして動く」状態になる。
// 6. ItemList（仮データでOK）
// フィルタリング結果の一覧。
// - ギャラリーの中心
// - 仮データで動かせるので早期に動作確認できる
// - Lazy Loading やページネーションの土台になる

// src/app/gallery/components/list/ItemList.tsx
import { UIPart } from "@/types/gallery/ui-part";
import { ItemCard } from "./ItemCard";

export function ItemList({ items }: { items: UIPart[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => (
        <ItemCard key={item.id} item={item} />
      ))}
    </div>
  );
}
