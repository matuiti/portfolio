"use client";

import React, { useState } from "react";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { WorkCard } from "@/app/works/components/WorkCard";
import { WorkDetailModal } from "@/app/works/components/WorkDetailModal";
import { Button } from "@/components/ui/Buttons/Main";
import Link from "next/link";
import { ALL_WORKS } from "@/data/works";
import { Work } from "@/types/work";

export const WorksSection = () => {
  const [selectedWork, setSelectedWork] = useState<Work | null>(null);

  // トップページには最新の3件のみ表示
  const displayWorks = ALL_WORKS.slice(0, 3);

  return (
    <section className="py-24 bg-slate-50">
      <div className="container-center px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <SectionTitle
            title="Selected Works"
            description="実務案件から個人プロジェクトまで、これまでの制作実績の一部をご紹介します。"
          />
          <Link href="/works">
            <Button intent="outline" size="long">
              View All Projects
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayWorks.map((work) => (
            <WorkCard
              key={work.id}
              work={work}
              onClick={() => setSelectedWork(work)}
              // 不要になった callback プロパティを削除しました
            />
          ))}
        </div>
      </div>

      {/* 詳細モーダル */}
      {selectedWork && (
        <WorkDetailModal
          isOpen={!!selectedWork}
          onClose={() => setSelectedWork(null)}
          work={selectedWork}
          allFilteredWorks={displayWorks} // 型定義に追加する必要があります
          onNavigate={setSelectedWork}
        />
      )}
    </section>
  );
};
