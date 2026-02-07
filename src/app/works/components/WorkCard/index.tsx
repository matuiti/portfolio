"use client";

import Image from "next/image";
import Link from "next/link";
import { Zap, ShieldCheck, ArrowUpRight } from "lucide-react";
import { Work } from "@/types/work";

type WorkCardProps = {
  work: Work;
  onClick: (work: Work) => void;
};

export function WorkCard({ work, onClick }: WorkCardProps) {
  return (
    <div
      onClick={() => onClick(work)}
      className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl has-[.tag-link:hover]:hover:shadow-sm transition-all duration-300 cursor-pointer overflow-hidden border border-slate-100 flex flex-col h-full"
    >
      <div className="relative flex flex-col h-full">
        {/* サムネイルエリア */}
        <div className="aspect-video bg-slate-100 relative overflow-hidden">
          {work.disclosureLevel === "NDA" ? (
            <div className="w-full h-full flex items-center justify-center bg-slate-900 text-white/20 font-black text-2xl tracking-tighter">
              NDA_PROTECTED
            </div>
          ) : (
            <>
              {/* className内の改行を排除し、ハイドレーションエラーを防止 */}
              <Image
                src={work.thumbnail}
                alt={work.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110 group-has-[.tag-link:hover]:scale-100"
              />
              {/* ホバー時のオーバーレイ */}
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 group-has-[.tag-link:hover]:opacity-0 transition-opacity duration-300">
                <div className="flex items-center gap-1 text-white font-bold text-sm tracking-wider">
                  詳しく見る
                  <ArrowUpRight size={14} />
                </div>
              </div>
            </>
          )}

          {/* バッジエリア */}
          <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
            {work.isSpeedyWork && (
              <span className="bg-amber-400 text-[8px] font-black text-white px-2 py-1 rounded uppercase tracking-tighter flex items-center gap-1 shadow-sm">
                <Zap size={10} fill="currentColor" /> Speedy
              </span>
            )}
            {work.isLongTerm && (
              <span className="bg-emerald-500 text-[8px] font-black text-white px-2 py-1 rounded uppercase tracking-tighter flex items-center gap-1 shadow-sm">
                <ShieldCheck size={10} fill="currentColor" /> Accomplished
              </span>
            )}
          </div>
        </div>

        {/* コンテンツエリア */}
        <div className="p-6 flex flex-col grow space-y-3">
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

          <h2 className="text-lg font-black text-slate-900 line-clamp-1 group-hover:text-blue-600 group-has-[.tag-link:hover]:text-slate-900 transition-colors">
            {work.title}
          </h2>

          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
            {work.summary}
          </p>

          {/* タグエリア */}
          <div className="flex flex-wrap gap-1.5 pt-2 relative z-20">
            {work.tags.map((tag) => (
              <Link
                key={tag}
                href={`/works?tags=${encodeURIComponent(tag)}`}
                onClick={(e) => e.stopPropagation()}
                className="tag-link text-[10px] text-slate-400 hover:text-blue-600 transition-colors font-medium relative"
              >
                #{tag}
              </Link>
            ))}
          </div>

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
    </div>
  );
}
