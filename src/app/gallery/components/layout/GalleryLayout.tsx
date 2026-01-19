// ギャラリーページ専用のレイアウト。
// Sidebar + Main の2カラム構成をここで固める。
// - 全コンポーネントの土台
// - PC/SP の分岐もここで確定する

"use client";

import { useState } from "react";
import { GallerySidebar } from "./GallerySidebar";
import { GalleryDrawerMenu } from "./GalleryDrawerMenu";
import { Filtering } from "@/types/gallery/filtering";

type GalleryLayoutProps = {
  children: React.ReactNode;
  filtering: Filtering;
};

export function GalleryLayout({ children, filtering }: GalleryLayoutProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-white">
      {/* PC：検索サイドバー */}
      <aside className="hidden md:block w-80 flex-shrink-0 border-r border-neutral-200">
        <GallerySidebar filtering={filtering} />
      </aside>

      {/* SP：検索ドロワーメニュー開閉ボタン */}
      <header className="md:hidden fixed top-0 left-0 right-0 h-14 bg-white border-b border-neutral-200 flex items-center px-4 z-30">
        <button onClick={() => setIsDrawerOpen(true)} className="text-xl">
          ▶<span className="ml-4 font-bold">検索メニューを開く</span>
        </button>
      </header>

      {/* SP：検索ドロワーメニュー */}
      <GalleryDrawerMenu
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        filtering={filtering}
      />

      {/* メインコンテンツ */}
      <main className="flex-1 min-w-0 overflow-y-auto bg-white">
        <div className="max-w-7xl mx-auto px-6 py-20 md:py-10">{children}</div>
      </main>
    </div>
  );
}
