// src/app/gallery/components/layout/GalleryLayout.tsx
"use client";

import { useState } from "react";
import { GallerySidebar } from "./GallerySidebar";
import { GalleryDrawerMenu } from "./GalleryDrawerMenu";
import { Filtering } from "@/gallery/_types/filtering";

type GalleryLayoutProps = {
  children: React.ReactNode;
  filtering: Filtering;
};

export function GalleryLayout({ children, filtering }: GalleryLayoutProps) {
  const [isGalleryDrawerOpen, setIsGalleryDrawerOpen] = useState(false);

  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden">
      {/* PC: ギャラリー専用サイドバー */}
      <aside className="hidden md:block w-80 flex-shrink-0 border-r border-neutral-200 overflow-y-auto bg-neutral-50">
        <GallerySidebar filtering={filtering} />
      </aside>

      <div className="flex flex-col flex-1 min-w-0 relative">
        {/* SP: ギャラリー内検索専用のサブバー */}
        <div className="md:hidden flex h-12 items-center px-4 bg-white border-b border-neutral-100 sticky top-0 z-10">
          <button
            onClick={() => setIsGalleryDrawerOpen(true)}
            className="text-[11px] font-black uppercase tracking-widest border border-slate-900 px-3 py-1"
          >
            Filter Search
          </button>
        </div>

        {/* メイン表示エリア */}
        <main className="flex-1 overflow-y-auto p-6 md:p-10">{children}</main>
      </div>

      {/* SP: ギャラリー内検索専用ドロワー */}
      <GalleryDrawerMenu
        isOpen={isGalleryDrawerOpen}
        onClose={() => setIsGalleryDrawerOpen(false)}
        filtering={filtering}
      />
    </div>
  );
}
