// src/app/gallery/components/layout/GalleryLayout.tsx

"use client";

import { useUIStore } from "@/store/useUIStore";
import { GallerySidebar } from "./GallerySidebar";
import { GalleryDrawerMenu } from "./GalleryDrawerMenu";
import { Filtering } from "@/gallery/types/filtering";

type GalleryLayoutProps = {
  children: React.ReactNode;
  filtering: Filtering;
};

export function GalleryLayout({ children, filtering }: GalleryLayoutProps) {
  const { isSearchDrawerOpen, setSearchDrawerOpen } = useUIStore();

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* デスクトップ用サイドバーは利便性のために残します */}
      <aside className="hidden lg:block w-80 shrink-0">
        <GallerySidebar filtering={filtering} />
      </aside>

      <main className="flex-1 min-w-0">{children}</main>

      {/* モバイル/タブレット用ドロワー（ヘッダーから起動） */}
      <GalleryDrawerMenu
        isOpen={isSearchDrawerOpen}
        onClose={() => setSearchDrawerOpen(false)}
        filtering={filtering}
      />
    </div>
  );
}
