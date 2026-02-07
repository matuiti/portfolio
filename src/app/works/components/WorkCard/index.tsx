"use client";

import React from "react";
import Image from "next/image";
import { Work, WorkFilterCategory } from "@/types/work";

type Props = {
  work: Work;
  onClick: () => void;
  onCategorySelectOnly: (cat: WorkFilterCategory) => void;
  onTagSelectOnly: (tag: string) => void;
};

export const WorkCard = ({
  work,
  onClick,
  onCategorySelectOnly,
  onTagSelectOnly,
}: Props) => {
  return (
    <div
      className="group bg-white rounded-4xl border border-slate-100 overflow-hidden cursor-pointer"
      onClick={onClick}
    >
      <div className="relative aspect-4/3">
        {work.disclosureLevel === "NDA" ? (
          <div className="absolute inset-0 bg-slate-50 flex items-center justify-center text-slate-300 text-[10px] font-black uppercase">
            NDA Protected
          </div>
        ) : (
          <Image
            src={work.thumbnail}
            alt={work.title}
            fill
            className="object-cover"
          />
        )}
        <div className="absolute top-4 left-4 flex gap-2">
          {work.category.map((cat) => (
            <span
              key={cat}
              onClick={(e) => {
                e.stopPropagation();
                onCategorySelectOnly(cat as WorkFilterCategory);
              }}
              className="px-3 py-1 bg-white/90 rounded-full text-[9px] font-black uppercase text-slate-900 hover:bg-blue-600 hover:text-white transition-colors"
            >
              {cat}
            </span>
          ))}
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-black mb-2">{work.title}</h3>
        <div className="flex flex-wrap gap-1.5">
          {work.tags.map((tag) => (
            <span
              key={tag}
              onClick={(e) => {
                e.stopPropagation();
                onTagSelectOnly(tag);
              }}
              className="text-[9px] font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded-lg hover:bg-slate-900 hover:text-white transition-all"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
