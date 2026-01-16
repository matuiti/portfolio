// 2.
// カテゴリー・タグを表示する左カラム。
// - フィルタリング UI の中心
// - ギャラリーの“顔”になる部分
// - ここができるとページの印象が一気に固まる

export function GallerySidebar() {
  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">UI Gallery</h2>

      {/* CategoryList（後で実装） */}
      <div className="mb-6">
        {/* CategoryList placeholder */}
        <div className="h-32 bg-neutral-100 rounded" />
      </div>

      {/* TagGroups（後で実装） */}
      <div className="space-y-4">
        <div className="h-20 bg-neutral-100 rounded" />
        <div className="h-20 bg-neutral-100 rounded" />
        <div className="h-20 bg-neutral-100 rounded" />
      </div>
    </div>
  );
}
