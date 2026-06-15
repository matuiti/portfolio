'use client';

import { useState, useMemo } from 'react';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { WorkCard } from '@/app/works/components/WorkCard';
import { WorkDetailModal } from '@/app/works/components/WorkDetailModal';
import { ALL_WORKS } from '@/data/works';
import { Work, WorkCategory, WorkFilterCategory } from '@/types/work';
import { CategoryTabs } from './CategoryTabs';
import { MainButton } from '@/components/ui/Buttons/MainButton';
import { ScrollReveal } from '@/home/ScrollReveal';
import { useRouter } from 'next/navigation';
import styles from './WorksSection.module.scss';

export const WorksSection = () => {
  const router = useRouter();
  // 状態管理：選択中のカテゴリと、モーダル表示用の実績
  const [activeCategory, setActiveCategory] =
    useState<WorkFilterCategory>('web');
  const [selectedWork, setSelectedWork] = useState<Work | null>(null);

  // モーダル内のボタンから呼び出される遷移ロジック 
  const handleModalCategoryClick = (cat: string) => {
    router.push(`/works?category=${encodeURIComponent(cat)}`);
  };

  const handleModalTagClick = (tag: string) => {
    router.push(`/works?tags=${encodeURIComponent(tag)}`);
  };

  // フィルタリングロジック：カテゴリに基づいてデータを抽出
  // パフォーマンス最適化のため useMemo を使用
  const displayWorks = useMemo(() => {
    const filtered = ALL_WORKS.filter((work) => {
      // "all" の場合は全てのデータを通す
      if (activeCategory === 'all') return true;
      return work.category.includes(activeCategory as WorkCategory);
    });

    return filtered.slice(0, 3);
  }, [activeCategory]);

  /**
   * スクロール演出の適用
   * 依存配列に displayWorks を含めることで、カテゴリ切り替えにより
   * DOMが書き換わった際も、新しいカードを検知して演出を再実行します。
   */
  ScrollReveal();

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
            {displayWorks.map((work) => (
              <WorkCard
                key={work.id}
                work={work}
                onClick={() => setSelectedWork(work)}
                onCategoryClick={(cat) => setActiveCategory(cat)}
                className='js-fuwa-fade'
              />
            ))}

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
              // 以下の2行を追加することでエラーを解消し、遷移機能を持たせる
              onCategoryClick={handleModalCategoryClick}
              onTagClick={handleModalTagClick}
            />
          )}
        </div>
      </div>
    </section>
  );
};
