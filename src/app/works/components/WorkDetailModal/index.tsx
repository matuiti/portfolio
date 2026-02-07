"use client";

import React from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Work, WorkFilterCategory } from "@/types/work";
import { useWorkStore, useFilteredWorks } from "@/store/useWorkStore";
import { useWorkModalNavigation } from "../../lib/hooks/useWorkModalNavigation";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  work: Work;
  onNavigate: (work: Work) => void;
};

export const WorkDetailModal = ({
  isOpen,
  onClose,
  work,
  onNavigate,
}: Props) => {
  const filteredWorks = useFilteredWorks(); // フィルタ後の全リストを取得
  const selectOnlyTag = useWorkStore((state) => state.selectOnlyTag);
  const selectOnlyCategory = useWorkStore((state) => state.selectOnlyCategory);

  const { currentIndex, totalCount, hasPrev, hasNext, goToPrev, goToNext } =
    useWorkModalNavigation({
      currentWork: work,
      allWorks: filteredWorks,
      onNavigate,
      onClose,
      isOpen,
    });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-5xl max-h-[90vh] bg-white rounded-4xl shadow-2xl overflow-hidden flex flex-col">
        {/* ナビゲーションヘッダー */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div className="text-xs font-bold text-slate-400">
            Project {currentIndex + 1} / {totalCount}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={goToPrev}
              disabled={!hasPrev}
              className="p-2 disabled:opacity-20 hover:bg-slate-50 rounded-xl transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={goToNext}
              disabled={!hasNext}
              className="p-2 disabled:opacity-20 hover:bg-slate-50 rounded-xl transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="ml-4 p-2 hover:bg-red-50 hover:text-red-500 rounded-full transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-100 border border-slate-100">
              {work.disclosureLevel === "NDA" ? (
                <div className="absolute inset-0 flex items-center justify-center text-slate-300 font-bold text-sm">
                  NDA PROTECTED
                </div>
              ) : (
                <Image
                  src={work.thumbnail}
                  alt={work.title}
                  fill
                  className="object-cover"
                />
              )}
            </div>

            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {work.category.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        selectOnlyCategory(cat as WorkFilterCategory);
                        onClose();
                      }}
                      className="text-[10px] bg-blue-50 text-blue-600 px-3 py-1 rounded-full font-black uppercase hover:bg-blue-600 hover:text-white transition-all cursor-pointer"
                    >
                      {cat}
                    </button>
                  ))}
                </div>
                <h2 className="text-3xl font-black text-slate-900 leading-tight">
                  {work.title}
                </h2>
              </div>

              <div className="space-y-4">
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Technologies
                </div>
                <div className="flex flex-wrap gap-2">
                  {work.tags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => {
                        selectOnlyTag(tag);
                        onClose();
                      }}
                      className="text-[10px] font-bold text-slate-400 bg-white border border-slate-200 px-3 py-1.5 rounded-xl hover:border-slate-900 hover:text-slate-900 transition-all cursor-pointer"
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
              </div>

              <p className="text-slate-600 text-sm leading-relaxed">
                {work.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
