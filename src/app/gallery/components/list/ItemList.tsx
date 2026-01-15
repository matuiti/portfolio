// ここから「ギャラリーとして動く」状態になる。
// 6. ItemList（仮データでOK）
// フィルタリング結果の一覧。
// - ギャラリーの中心
// - 仮データで動かせるので早期に動作確認できる
// - Lazy Loading やページネーションの土台になる

import ItemCard from "./ItemCard";

export default function ItemList() {
  return (
    <div className="item-list">
      <ItemCard />
    </div>
  );
}
