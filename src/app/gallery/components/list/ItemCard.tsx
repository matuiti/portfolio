// 7. ItemCard
// UIパーツのカード。
// - タイトル・説明・タグの配置を決める重要部分
// - モーダルの入口にもなる
// - 一覧の見た目がここで決まる

import { PreviewSizeSwitcher } from "../preview/PreviewSizeSwitcher";

export default function ItemCard() {
  return (
    <div className="item-card">
      <div className="border-b flex gap-4">
        <button>説明</button>
        <button>コード</button>
        <button className="md:hidden">
          <PreviewSizeSwitcher />
          プレビュー
        </button>
      </div>
    </div>
  );
}
