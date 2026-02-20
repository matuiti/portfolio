"use client";

import React, { useState, useMemo } from "react";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { WorkCard } from "@/app/works/components/WorkCard";
import { WorkDetailModal } from "@/app/works/components/WorkDetailModal";
import { ALL_WORKS } from "@/data/works";
import { Work, WorkCategory, WorkFilterCategory } from "@/types/work";
import { CategoryTabs } from "./CategoryTabs";
import styles from "./WorksSection.module.scss";
import { MainButton } from "@/components/ui/Buttons/MainButton";
import { useScrollReveal } from "@/lib/hooks/useScrollReveal";

export const WorksSection = () => {
  // 1. 状態管理：選択中のカテゴリと、モーダル表示用の実績
  const [activeCategory, setActiveCategory] =
    useState<WorkFilterCategory>("web");
  const [selectedWork, setSelectedWork] = useState<Work | null>(null);

  // 2. フィルタリングロジック：カテゴリに基づいてデータを抽出
  // パフォーマンス最適化のため useMemo を使用
  const displayWorks = useMemo(() => {
    const filtered = ALL_WORKS.filter((work) => {
      // "all" の場合は全てのデータを通す
      if (activeCategory === "all") return true;
      return work.category.includes(activeCategory as WorkCategory);
    });

    return filtered.slice(0, 3);
  }, [activeCategory]);

  /**
   * 3. スクロール演出の適用
   * 依存配列に displayWorks を含めることで、カテゴリ切り替えにより
   * DOMが書き換わった際も、新しいカードを検知して演出を再実行します。
   */
  useScrollReveal([displayWorks]);

  return (
    <section id="works" className="scroll-mt-20">
      <div className="section-padding-y section-padding-x bg-white">
        <div className="container-center">
          <div className={styles.sectionHead}>
            {/* セクション見出し */}
            <SectionTitle
              enTitle="works"
              jpTitle="制作実績"
              variant="default"
              className="js-fuwa-fade"
            />
            {/* 3. カテゴリスイッチ */}
            <div className="js-fuwa-fade">
              <CategoryTabs
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
              />
            </div>
          </div>

          {/* 4. 実績グリッド表示 */}
          <div className={styles.cards}>
            {displayWorks.map((work) => (
              <WorkCard
                key={work.id}
                work={work}
                onClick={() => setSelectedWork(work)}
                onCategoryClick={(cat) => setActiveCategory(cat)}
                className="js-fuwa-fade"
              />
            ))}

            {/* ボタンをグリッドの最後の子要素として配置 */}
            <div className={`${styles.moreButtonWrapper} js-fuwa-fade`}>
              <MainButton variant="long" href="/works">
                一覧を見る
              </MainButton>
            </div>
          </div>

          {/* 詳細モーダル */}
          {selectedWork && (
            <WorkDetailModal
              isOpen={!!selectedWork}
              onClose={() => setSelectedWork(null)}
              work={selectedWork}
              allFilteredWorks={displayWorks}
              onNavigate={setSelectedWork}
            />
          )}
        </div>
      </div>
    </section>
  );
};;
