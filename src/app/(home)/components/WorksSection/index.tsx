// src/app/(home)/components/WorksSection/index.tsx

"use client";

import { useRouter } from "next/navigation";
import { WorkCard } from "@/app/works/components/WorkCard";
import { useWorkFilter } from "@/app/works/lib/hooks/useWorkFilter";
import { Work } from "@/types/work";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Button } from "@/components/ui/Button";

export function WorksSection() {
  const router = useRouter();

  // トップページ用に最新3件を取得
  const { paginatedWorks } = useWorkFilter(3);

  /**
   * カードクリック時の処理
   * 作品一覧ページへ「?id=w-01」のようなパラメータを付けて遷移させます [cite: 221]
   */
  const handleCardClick = (work: Work) => {
    router.push(`/works?id=${work.id}`);
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <SectionTitle title="WORKS" description="制作実績" align="center" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {paginatedWorks.map((work) => (
            <WorkCard
              key={work.id}
              work={work}
              onClick={handleCardClick} // 遷移処理を実行 [cite: 221]
            />
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <Button
            intent="outline"
            size="long"
            onClick={() => router.push("/works")}
          >
            VIEW ALL WORKS
          </Button>
        </div>
      </div>
    </section>
  );
}
