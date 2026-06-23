'use client';
import { useState, useMemo } from 'react';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { WorkCard } from '@/app/works/components/WorkCard';
import { WorkDetailModal } from '@/app/works/components/WorkDetailModal';
import { ALL_WORKS } from '@/data/works';
import { Work, WorkCategory } from '@/types/work';
import { CategoryTabs } from './CategoryTabs';
import { MainButton } from '@/components/ui/Buttons/MainButton';
import { useRouter } from 'next/navigation';
import styles from './WorksSection.module.css';

export const WorksSection = () => {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState<WorkCategory>('web');
  const [selectedWork, setSelectedWork] = useState<Work | null>(null);

  // モーダル内のボタンから呼び出される遷移ロジック
  const handleModalCategoryClick = (cat: string) => {
    router.push(`/works?category=${encodeURIComponent(cat)}`);
  };

  const handleModalTagClick = (tag: string) => {
    router.push(`/works?tags=${encodeURIComponent(tag)}`);
  };

  // フィルタリングロジック：カテゴリに基づいてデータを抽出
  const displayWorks = useMemo(() => {
    const filtered = ALL_WORKS.filter((work) => {
      // "all" の場合は全てのデータを通す
      if (activeCategory === 'all') return true;
      return work.category.includes(activeCategory as WorkCategory);
    });

    return filtered.slice(0, 3);
  }, [activeCategory]);

  return (
    <section id='works' className='-scroll-mt-2'>
      <div className='section-padding-y section-padding-x bg-white'>
        <div className='container-center'>
          <div className={styles.sectionHead}>
            {/* セクション見出し */}
            <SectionTitle
              enTitle='works'
              jpTitle='制作実績'
              variant='default'
              className='js-fuwa-fade'
            />
            {/* カテゴリスイッチ */}
            <div className='js-fuwa-fade'>
              <CategoryTabs
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
              />
            </div>
          </div>

          {/* 実績グリッド表示 */}
          <div className={styles.cards}>
            {displayWorks.length ? (
              displayWorks.map((work) => (
                <WorkCard
                  key={work.id}
                  work={work}
                  onClick={() => setSelectedWork(work)}
                  onCategoryClick={(cat) => setActiveCategory(cat)}
                  className='js-fuwa-fade'
                />
              ))
            ) : (
              <div className='py-[calc(80/16*1rem)] text-center border-2 border-dashed border-medium-gray rounded-[calc(24/16*1rem)] mt-[calc(24/16*1rem)] default:mt-[calc(50/16*1rem)]'>
                <p className='text-dark-gray font-bold'>
                  該当する実績は見つかりませんでした。
                </p>
                <p className='text-[calc(14/16*1rem)] text-dark-gray mt-[calc(8/16*1rem)]'>
                  条件を変えて再度お試しください。
                </p>
              </div>
            )}

            {/* ボタンをグリッドの最後の子要素として配置 */}
            <div className={`${styles.moreButtonWrapper} js-fuwa-fade`}>
              <MainButton variant='long' href='/works'>
                一覧を見る
              </MainButton>
            </div>
          </div>

          {/* 詳細モーダル */}
          {selectedWork && (
            <WorkDetailModal
              key={selectedWork.id}
              isOpen={!!selectedWork}
              onClose={() => setSelectedWork(null)}
              work={selectedWork}
              allFilteredWorks={displayWorks}
              onNavigate={setSelectedWork}
              onCategoryClick={handleModalCategoryClick}
              onTagClick={handleModalTagClick}
            />
          )}
        </div>
      </div>
    </section>
  );
};
