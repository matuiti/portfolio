'use client';
import { useUIStore } from '@/lib/hooks/useUIStore';
import { WorksSidebar } from '../WorksSidebar';
import { SearchDrawer } from '@/components/ui/SearchDrawer';
import { useFilteredWorks, useWorkStore } from '@/lib/hooks/useWorkStore';
import { WORK_CATEGORIES } from '@/data/works';
import { WorkCategory, WorkFilterCategory } from '@/types/work';

type WorksLayoutProps = {
  children: React.ReactNode;
};

export function WorksLayout({ children }: WorksLayoutProps) {
  const { isSearchDrawerOpen, setSearchDrawerOpen } = useUIStore();
  const store = useWorkStore();
  const filteredWorks = useFilteredWorks();
  const footerNote =
    '※「非公開」タグの実績は、契約上の理由により最適化されたデータを掲載しています。';

  // 全実績のタグから重複を排除、五十音順に並び替えて抽出
  const availableTags = Array.from(
    new Set(filteredWorks.flatMap((w) => w.tags)),
  ).sort();

  // カテゴリ名と件数の計算
  const categoryCounts = WORK_CATEGORIES.reduce(
    (acc, cat) => {
      if (cat.value === 'all') {
        // 「すべて」の場合は全件数を入れる
        acc[cat.value] = filteredWorks.length;
      } else {
        // cat.valueが"all"ではないことをWorkCategory型として明示する
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
    <div className='relative'>
      <div className='flex flex-row max-w-[calc(1280/16*1rem)] m-auto'>
        <WorksSidebar footerNote={footerNote} />
        <main className='flex-1 min-w-0'>{children}</main>
      </div>
      <SearchDrawer<WorkFilterCategory>
        isOpen={isSearchDrawerOpen}
        onClose={() => setSearchDrawerOpen(!isSearchDrawerOpen)}
        totalCount={filteredWorks.length}
        searchQuery={store.searchQuery}
        setSearchQuery={store.setSearchQuery}
        categories={WORK_CATEGORIES}
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
