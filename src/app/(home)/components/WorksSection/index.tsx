"use client";

import React, { useState } from "react";
import { ALL_WORKS } from "@/data/works"; // インポートを確認
import { useWorkFilter } from "@/app/works/lib/hooks/useWorkFilter";
import { WorkCard } from "@/app/works/components/WorkCard";
import { WorkDetailModal } from "@/app/works/components/WorkDetailModal";
import { Work } from "@/types/work";

export const WorksSection = () => {
  // 【重要】ALL_WORKS（配列）を確実に渡す
  const { filteredWorks, selectOnlyTag, selectOnlyCategory } =
    useWorkFilter(ALL_WORKS);

  const [selectedWork, setSelectedWork] = useState<Work | null>(null);

  // 最新3件のみ表示
  const displayWorks = filteredWorks.slice(0, 3);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayWorks.map((work) => (
            <WorkCard
              key={work.id}
              work={work}
              onClick={() => setSelectedWork(work)}
              onCategorySelectOnly={selectOnlyCategory}
              onTagSelectOnly={selectOnlyTag}
            />
          ))}
        </div>

        {selectedWork && (
          <WorkDetailModal
            isOpen={!!selectedWork}
            onClose={() => setSelectedWork(null)}
            work={selectedWork}
            allFilteredWorks={filteredWorks}
            onNavigate={setSelectedWork}
            onCategorySelectOnly={selectOnlyCategory}
            onTagSelectOnly={selectOnlyTag}
          />
        )}
      </div>
    </section>
  );
};
