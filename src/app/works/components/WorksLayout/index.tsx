// src/app/works/components/WorksLayout/index.tsx

"use client";

import { useUIStore } from "@/store/useUIStore";
import { WorksDrawerMenu } from "./WorksDrawerMenu";

type WorksLayoutProps = {
  children: React.ReactNode;
};

export function WorksLayout({ children }: WorksLayoutProps) {
  // グローバルストアから開閉状態を監視
  const { isSearchDrawerOpen, setSearchDrawerOpen } = useUIStore();

  return (
    <div className="relative">
      {/*
         以前ここにあった「実績を絞り込む」ボタンは削除されました。
         ヘッダーの虫眼鏡アイコンがその役割を担います。
      */}

      {children}

      <WorksDrawerMenu
        isOpen={isSearchDrawerOpen}
        onClose={() => setSearchDrawerOpen(false)}
      />
    </div>
  );
}
