// src/app/works/components/WorksLayout/index.tsx

"use client";

import { useUIStore } from "@/store/useUIStore";
import { WorksSidebar } from "./WorksSidebar";
import { SearchDrawer } from "@/components/ui/SearchDrawer";
import { useFilteredWorks, useWorkStore } from "@/store/useWorkStore";
import { WORK_CATEGORIES } from "@/data/works";
import { WorkCategory, WorkFilterCategory } from "@/types/work";


type WorksLayoutProps = {
  children: React.ReactNode;
};

export function WorksLayout({ children }: WorksLayoutProps) {
  // グローバルストアから開閉状態を監視
  const { isSearchDrawerOpen, setSearchDrawerOpen } = useUIStore();
  const store = useWorkStore(); // [14]
  const filteredWorks = useFilteredWorks(); // [6]
  const footerNote =
    "※「非公開」タグの実績は、契約上の理由により、担当範囲および概要のみ掲載しています。";

  // 全実績からタグを動的に抽出
  const availableTags = Array.from(
    new Set(filteredWorks.flatMap((w) => w.tags)),
  ).sort();

  // カテゴリ件数の計算（anyを排除して規約に適合させる）
  const categoryCounts = WORK_CATEGORIES.reduce(
    (acc, cat) => {
      if (cat.value === "all") {
        // 「すべて」の場合は全件数（または仕様に基づく数値）を入れる
        acc[cat.value] = filteredWorks.length;
      } else {
        // cat.value が "all" ではないことをTypeScriptに明示するため
        // WorkCategory 型として扱う（これが技術的証明に繋がります）
        const targetCat = cat.value as WorkCategory;
        acc[cat.value] = filteredWorks.filter((w) =>
          w.category.includes(targetCat),
        ).length;
      }
      return acc;
    },
    {} as Record<string, number>,
  );

  return (
    <div className="relative flex flex-col lg:flex-row gap-8">
      <WorksSidebar footerNote={footerNote} />
      <main className="flex-1 min-w-0">{children}</main>
      <SearchDrawer<WorkFilterCategory>
        isOpen={isSearchDrawerOpen}
        onClose={() => setSearchDrawerOpen(false)}
        totalCount={filteredWorks.length}
        searchQuery={store.searchQuery}
        setSearchQuery={store.setSearchQuery}
        categories={WORK_CATEGORIES} // [15]
        selectedCategory={store.selectedCategory}
        setSelectedCategory={store.setSelectedCategory}
        categoryCounts={categoryCounts}
        availableTags={availableTags}
        selectedTags={store.selectedTags}
        toggleTag={store.toggleTag}
        clearFilters={store.clearFilters}
        footerNote={footerNote}
      />
    </div>
  );
}
