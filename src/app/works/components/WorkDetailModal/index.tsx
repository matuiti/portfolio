"use client";

import React from "react";
import { X } from "lucide-react";
import { Work, WorkFilterCategory } from "@/types/work";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  work: Work;
  allFilteredWorks: Work[];
  onNavigate: (work: Work) => void;
  onCategorySelectOnly: (cat: WorkFilterCategory) => void;
  onTagSelectOnly: (tag: string) => void;
};

export const WorkDetailModal = ({
  isOpen,
  onClose,
  work,
  onCategorySelectOnly,
  onTagSelectOnly,
}: Props) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-4xl bg-white rounded-4xl overflow-hidden">
        <div className="p-8 space-y-6">
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <div className="flex gap-2">
                {work.category.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      onCategorySelectOnly(cat as WorkFilterCategory);
                      onClose();
                    }}
                    className="text-[10px] bg-blue-50 text-blue-600 px-3 py-1 rounded-full font-black uppercase hover:bg-blue-600 hover:text-white transition-all cursor-pointer"
                  >
                    {cat}
                  </button>
                ))}
              </div>
              <h2 className="text-3xl font-black">{work.title}</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-100 rounded-full"
            >
              <X className="w-6 h-6" />
            </button>
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
                    onTagSelectOnly(tag);
                    onClose();
                  }}
                  className="text-[10px] font-bold text-slate-400 bg-white border border-slate-200 px-3 py-1.5 rounded-xl hover:border-slate-900 hover:text-slate-900 transition-all cursor-pointer"
                >
                  #{tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
