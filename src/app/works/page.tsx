// src/app/works/page.tsx
"use client";

import { useState, useMemo, Suspense } from "react";
import Image from "next/image";
import { X, Zap, ShieldCheck } from "lucide-react";
import { ALL_WORKS } from "@/data/works";
import { Work } from "@/types/work";
import { useWorkFilter } from "./lib/hooks/useWorkFilter";
import { useWorkURLSync } from "./lib/hooks/useWorkURLSync";
import { WorkSearchPanel } from "./components/WorkSearchPanel";

function WorksContent() {
  const [selectedWork, setSelectedWork] = useState<Work | null>(null);
  const filter = useWorkFilter();
  useWorkURLSync(filter);

  const availableTags = useMemo(() => {
    const tags = new Set<string>();
    ALL_WORKS.forEach((w: Work) => w.tags.forEach((t) => tags.add(t)));
    return Array.from(tags).sort();
  }, []);

  return (
    <div className="container">
      <header className="mb-12">
        <p className="text-blue-600 font-black tracking-widest mb-2">
          PORTFOLIO
        </p>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900">
          Works
        </h1>
      </header>

      <WorkSearchPanel {...filter} availableTags={availableTags} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filter.filteredWorks.map((work: Work) => (
          <div
            key={work.id}
            onClick={() => setSelectedWork(work)}
            className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden border border-slate-100 flex flex-col"
          >
            {/* サムネイル（NDA判定含む） [cite: 34] */}
            <div className="aspect-video bg-slate-100 relative overflow-hidden">
              {work.disclosureLevel === "NDA" ? (
                <div className="w-full h-full flex items-center justify-center bg-slate-900 text-white/20 font-black text-2xl tracking-tighter">
                  NDA_PROTECTED
                </div>
              ) : (
                <Image
                  src={work.thumbnail}
                  alt={work.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              )}
              {/* バッジ表示 [cite: 35] */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {work.isSpeedyWork && (
                  <span className="bg-amber-400 text-[8px] font-black text-white px-2 py-1 rounded uppercase tracking-tighter flex items-center gap-1">
                    <Zap size={10} fill="currentColor" /> Speedy
                  </span>
                )}
                {work.isLongTerm && (
                  <span className="bg-emerald-500 text-[8px] font-black text-white px-2 py-1 rounded uppercase tracking-tighter flex items-center gap-1">
                    <ShieldCheck size={10} fill="currentColor" /> Accomplished
                  </span>
                )}
              </div>
            </div>

            {/* カード情報（元の構成） [cite: 35] */}
            <div className="p-6 space-y-3">
              <div className="flex flex-wrap gap-1.5">
                {work.category.map((cat) => (
                  <span
                    key={cat}
                    className="text-[9px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded font-bold uppercase tracking-wider"
                  >
                    {cat}
                  </span>
                ))}
              </div>
              <h2 className="text-lg font-black text-slate-900 line-clamp-1">
                {work.title}
              </h2>
              <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                {work.summary}
              </p>
              <div className="pt-5 mt-auto flex items-center justify-between border-t border-slate-50">
                <span className="text-[10px] font-bold text-slate-400 uppercase">
                  {work.role}
                </span>
                <span className="text-[10px] font-black text-blue-600">
                  {work.duration}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 詳細モーダル（元の構成を維持） [cite: 35-38] */}
      {selectedWork && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setSelectedWork(null)}
          />
          <div className="relative bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-4xl p-8 shadow-2xl">
            <button
              onClick={() => setSelectedWork(null)}
              className="absolute top-6 right-6 p-2 hover:bg-slate-100 rounded-full text-slate-400"
            >
              <X size={24} />
            </button>
            {/* モーダル内コンテンツ（既存通り）... */}
            <div className="space-y-6">
              <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">
                {selectedWork.category}
              </span>
              <h2 className="text-3xl font-black text-slate-900">
                {selectedWork.title}
              </h2>
              {/* 略：background, solution, technologies などの表示 */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function WorksPage() {
  return (
    <Suspense
      fallback={<div className="p-20 text-center font-bold">Loading...</div>}
    >
      <WorksContent />
    </Suspense>
  );
}