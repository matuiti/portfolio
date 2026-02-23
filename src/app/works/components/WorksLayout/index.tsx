// src/app/works/components/WorksLayout/index.tsx

"use client";

import { useUIStore } from "@/store/useUIStore";
import { WorksDrawerMenu } from "./WorksDrawerMenu";
import { WorksSidebar } from "./WorksSidebar";

type WorksLayoutProps = {
  children: React.ReactNode;
};

export function WorksLayout({ children }: WorksLayoutProps) {
  // グローバルストアから開閉状態を監視
  const { isSearchDrawerOpen, setSearchDrawerOpen } = useUIStore();

  return (
    <div className="relative flex flex-col lg:flex-row gap-8">
        <WorksSidebar />
      <main className="flex-1 min-w-0">{children}</main>
      <WorksDrawerMenu
        isOpen={isSearchDrawerOpen}
        onClose={() => setSearchDrawerOpen(false)}
      />
    </div>
  );
}
