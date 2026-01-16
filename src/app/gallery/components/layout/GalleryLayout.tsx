// 1.
// ギャラリー専用のレイアウト。
// Sidebar + Main の2カラム構成をここで固める。
// - 全コンポーネントの土台
// - レイアウトが決まらないと他の UI が作れない
// - PC/SP の分岐もここで確定する

"use client";

import { useState } from "react";
import { GallerySidebar } from "./GallerySidebar";
import { GalleryDrawerMenu } from "./GalleryDrawerMenu";

export function GalleryLayout({ children }: { children: React.ReactNode }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-white">
      {/* PC：左固定サイドバー */}
      <aside className="hidden md:block w-72 border-r border-neutral-200">
        <GallerySidebar />
      </aside>

      {/* SP：ヘッダー（ハンバーガー） */}
      <header className="md:hidden fixed top-0 left-0 right-0 h-14 bg-white border-b border-neutral-200 flex items-center px-4 z-30">
        <button onClick={() => setIsDrawerOpen(true)} className="text-xl">
          ☰
        </button>
        <span className="ml-4 font-bold">UI Gallery</span>
      </header>

      {/* SP：ドロワーメニュー */}
      <GalleryDrawerMenu
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />

      {/* メインコンテンツ */}
      <main className="flex-1 md:ml-0 mt-14 md:mt-0 p-6 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
