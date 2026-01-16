// 3.
// SP のナビゲーション。
// - Sidebar と構造を共有するため早めに作ると効率が良い
// - レスポンシブ設計の方向性がここで決まる

"use client";

export function GalleryDrawerMenu({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <>
      {/* オーバーレイ */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />
      )}

      {/* ドロワー本体 */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white border-r border-neutral-200 z-50 transform transition-transform duration-200 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 flex items-center justify-between border-b">
          <span className="font-bold">UI Gallery</span>
          <button onClick={onClose} className="text-xl">
            ×
          </button>
        </div>

        {/* Sidebar と同じ中身を後で入れる */}
        <div className="p-4 space-y-4">
          <div className="h-32 bg-neutral-100 rounded" />
          <div className="h-20 bg-neutral-100 rounded" />
          <div className="h-20 bg-neutral-100 rounded" />
        </div>
      </div>
    </>
  );
}
