"use client";

import React, { useState, useMemo } from "react";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { WorkCard } from "@/app/works/components/WorkCard";
import { WorkDetailModal } from "@/app/works/components/WorkDetailModal";
import { ALL_WORKS } from "@/data/works";
import { Work, WorkCategory, WorkFilterCategory } from "@/types/work";
import { CategoryTabs } from "./CategoryTabs";
// import styles from "./WorksSection.module.scss";

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

      // activeCategory が "all" でない場合、その型は WorkCategory と一致するため、
      // WorkCategory にキャストすることで型安全に includes を実行できます。
      return work.category.includes(activeCategory as WorkCategory);
    });

    return filtered.slice(0, 3);
  }, [activeCategory]);

  return (
    <section className="section-padding-y section-padding-x">
      <div className="container-center">
        <div className="flex flex-col small:flex-row small:justify-between small:items-baseline-last gap-10 mb-5 tablet:mb-10 small:mb-15">
          {/* セクション見出し */}
          <SectionTitle enTitle="works" jpTitle="制作実績" variant="default" />
          {/* 3. カテゴリスイッチ */}
          <CategoryTabs
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
        </div>

        {/* 4. 実績グリッド表示 */}
        <div className="grid grid-cols-1 md:grid-cols-2 small:grid-cols-3 gap-[calc(30/16*1rem)]">
          {displayWorks.map((work) => (
            <WorkCard
              key={work.id}
              work={work}
              onClick={() => setSelectedWork(work)}
            />
          ))}
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
    </section>
  );
};
