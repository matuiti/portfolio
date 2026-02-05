"use client";

import { useWorkFilter } from "@/app/works/lib/hooks/useWorkFilter";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { button as buttonStyle } from "@/components/ui/Button";
import { WorkCategory } from "@/types/work"; // 型をインポート
import Link from "next/link";

export const WorksSection = () => {
  // トップページ用：3件制限
  const { displayWorks, selectedCategory, toggleCategory } = useWorkFilter(3);

  // categories 配列に型を明示。value は string ではなく WorkCategory であると指定します
  const categories: { label: string; value: WorkCategory }[] = [
    { label: "Web制作", value: "web" },
    { label: "アプリケーション", value: "app" },
    { label: "ゲーム", value: "game" },
    { label: "すべて", value: "all" },
  ];

  return (
    <section className="py-20 container mx-auto px-6">
      <SectionTitle title="WORKS" />

      {/* フィルタボタン */}
      <div className="flex flex-wrap gap-4 mb-10">
        {categories.map((cat) => (
          <button
            key={cat.value}
            // 型が一致しているため、as any なしで安全に渡せます
            onClick={() => toggleCategory(cat.value)}
            className={`px-6 py-2 rounded-full border transition-all ${
              selectedCategory === cat.value
                ? "bg-primary text-white border-primary"
                : "bg-white text-neutral-600 border-neutral-200 hover:bg-neutral-50"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* カードグリッド */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {displayWorks.map((work) => (
          <div key={work.id} className="group cursor-pointer">
            <div className="aspect-video bg-neutral-100 mb-4 overflow-hidden rounded-lg">
              {/* Imageコンポーネントを想定。仮のプレースホルダー */}
              <div className="w-full h-full flex items-center justify-center text-neutral-400">
                Thumbnail
              </div>
            </div>
            <h3 className="font-bold text-xl mb-2 group-hover:text-primary transition-colors">
              {work.title}
            </h3>
            <div className="flex flex-wrap gap-2">
              {work.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-bold bg-neutral-100 text-neutral-500 px-2 py-0.5 rounded uppercase tracking-wider"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="text-center">
        <Link
          href="/works"
          className={buttonStyle({ size: "long", intent: "outline" })}
        >
          一覧を見る
        </Link>
      </div>
    </section>
  );
};
