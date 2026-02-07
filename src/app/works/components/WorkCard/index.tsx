"use client";

import React, { memo } from "react";
import Image from "next/image";
import { Work, WorkFilterCategory } from "@/types/work";
import { useWorkStore } from "@/store/useWorkStore";

type Props = {
  work: Work;
  onClick: () => void;
};

export const WorkCard = memo(({ work, onClick }: Props) => {
  // ストアから必要なアクションだけを抽出
  const selectOnlyTag = useWorkStore((state) => state.selectOnlyTag);
  const selectOnlyCategory = useWorkStore((state) => state.selectOnlyCategory);

  return (
    <div
      className="group relative bg-white rounded-4xl border border-slate-100 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-slate-200/50 hover:-translate-y-2 cursor-pointer"
      onClick={onClick}
    >
      <div className="relative aspect-4/3 overflow-hidden">
        {work.disclosureLevel === "NDA" ? (
          <div className="absolute inset-0 bg-slate-50 flex items-center justify-center">
            <span className="text-[10px] font-black text-slate-300 tracking-tighter uppercase">
              NDA Protected
            </span>
          </div>
        ) : (
          <Image
            src={work.thumbnail}
            alt={work.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
        )}

        <div className="absolute top-4 left-4 flex gap-2">
          {work.category.map((cat) => (
            <span
              key={cat}
              onClick={(e) => {
                e.stopPropagation();
                selectOnlyCategory(cat as WorkFilterCategory);
              }}
              className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[9px] font-black uppercase tracking-widest text-slate-900 hover:bg-blue-600 hover:text-white transition-colors shadow-sm"
            >
              {cat}
            </span>
          ))}
        </div>
      </div>

      <div className="p-6 sm:p-8 space-y-4">
        <h3 className="text-xl font-black text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
          {work.title}
        </h3>
        <p className="text-slate-500 text-xs leading-relaxed line-clamp-2 font-medium">
          {work.summary}
        </p>
        <div className="flex flex-wrap gap-1.5 pt-2">
          {work.tags.map((tag) => (
            <span
              key={tag}
              onClick={(e) => {
                e.stopPropagation();
                selectOnlyTag(tag);
              }}
              className="text-[9px] font-bold text-slate-400 bg-slate-50 px-2.5 py-1 rounded-lg hover:bg-slate-900 hover:text-white transition-all"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
});

WorkCard.displayName = "WorkCard";
