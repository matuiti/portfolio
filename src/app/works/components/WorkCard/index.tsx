// src/app/works/components/WorkCard/index.tsx
"use client";

import React, { memo } from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { Work, WorkFilterCategory } from "@/types/work";
import { useWorkStore } from "@/store/useWorkStore";

type Props = {
  work: Work;
  onClick: () => void;
};

export const WorkCard = memo(({ work, onClick }: Props) => {
  const router = useRouter();
  const pathname = usePathname();

  const selectOnlyTag = useWorkStore((state) => state.selectOnlyTag);
  const selectOnlyCategory = useWorkStore((state) => state.selectOnlyCategory);

  const isWorksPage = pathname.startsWith("/works");

  const handleCategoryClick = (e: React.MouseEvent, cat: string) => {
    e.stopPropagation();
    if (isWorksPage) {
      selectOnlyCategory(cat as WorkFilterCategory);
    } else {
      router.push(`/works?category=${encodeURIComponent(cat)}`);
    }
  };

  const handleTagClick = (e: React.MouseEvent, tag: string) => {
    e.stopPropagation();
    if (isWorksPage) {
      selectOnlyTag(tag);
    } else {
      // 期待通り「そのタグ1つのみ」の状態を作るため tags パラメータに付与して遷移
      router.push(`/works?tags=${encodeURIComponent(tag)}`);
    }
  };

  return (
    <div
      onClick={onClick}
      className="group relative bg-white rounded-4xl border border-slate-100 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-slate-200/50 hover:-translate-y-2 cursor-pointer"
    >
      <div className="relative aspect-16/10 overflow-hidden bg-slate-100">
        {work.disclosureLevel === "NDA" ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900 text-white p-6 text-center">
            <span className="text-xs font-black tracking-[0.2em] mb-2 opacity-50">
              CONFIDENTIAL
            </span>
            <p className="text-sm font-bold">NDA Protected</p>
          </div>
        ) : (
          <Image
            src={work.thumbnail}
            alt={work.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
        )}

        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          {work.category.map((cat) => (
            <button
              key={cat}
              onClick={(e) => handleCategoryClick(e, cat)}
              className="px-4 py-1.5 bg-white/90 backdrop-blur-md text-[10px] font-black uppercase tracking-widest text-slate-900 rounded-full shadow-sm hover:bg-blue-600 hover:text-white transition-all cursor-pointer"
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="p-6 md:p-8">
        <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
          {work.title}
        </h3>
        <p className="text-sm text-slate-500 line-clamp-2 mb-6 leading-relaxed">
          {work.summary}
        </p>

        <div className="flex flex-wrap gap-2">
          {work.tags.slice(0, 3).map((tag) => (
            <button
              key={tag}
              onClick={(e) => handleTagClick(e, tag)}
              className="text-[10px] font-bold text-slate-400 bg-slate-50 px-3 py-1.5 rounded-xl hover:bg-slate-900 hover:text-white transition-all cursor-pointer"
            >
              #{tag}
            </button>
          ))}
          {work.tags.length > 3 && (
            <span className="text-[10px] font-bold text-slate-300 py-1.5">
              +{work.tags.length - 3}
            </span>
          )}
        </div>
      </div>
    </div>
  );
});

WorkCard.displayName = "WorkCard";