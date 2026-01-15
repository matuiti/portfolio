// 1.
// ギャラリー専用のレイアウト。
// Sidebar + Main の2カラム構成をここで固める。
// - 全コンポーネントの土台
// - レイアウトが決まらないと他の UI が作れない
// - PC/SP の分岐もここで確定する

import type { ReactNode } from "react";
import GallerySidebar from "./GallerySidebar";

export default function GalleryLayout({ children }: { children: ReactNode }) {
  return (
    <div className="gallery-layout">
      <GallerySidebar />
      <main className="gallery-main">{children}</main>
    </div>
  );
}
