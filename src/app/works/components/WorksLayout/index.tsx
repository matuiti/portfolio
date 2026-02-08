// src/app/works/components/WorksLayout/index.tsx
"use client";

import { useState } from "react";
import { useFilteredWorks } from "@/store/useWorkStore";
import { Search } from "lucide-react"; // モバイルボタンで使用
import { WorksSidebar } from "./WorksSidebar";
import { WorksDrawerMenu } from "./WorksDrawerMenu";

type WorksLayoutProps = {
  children: React.ReactNode;
};

export function WorksLayout({ children }: WorksLayoutProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const filteredWorks = useFilteredWorks();

  return (
    <div className="relative min-h-screen bg-slate-50/50">
      <div className="main-container py-12 lg:py-20">
        <div className="lg:grid lg:grid-cols-[280px_1fr] lg:gap-16">
          <WorksSidebar />

          <main>
            <div className="lg:hidden mb-8">
              <button
                type="button"
                onClick={() => setIsDrawerOpen(true)}
                className="w-full flex items-center justify-between px-6 py-4 bg-white border border-slate-200 rounded-2xl shadow-sm active:scale-[0.98] transition-all"
              >
                <div className="flex items-center gap-3">
                  <Search className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-bold text-slate-700">
                    実績を絞り込む
                  </span>
                </div>
                <span className="bg-blue-50 text-blue-600 text-[10px] font-black px-2 py-0.5 rounded-full">
                  {filteredWorks.length} Items
                </span>
              </button>
            </div>

            <div className="relative">{children}</div>
          </main>
        </div>
      </div>

      <WorksDrawerMenu
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </div>
  );
}
