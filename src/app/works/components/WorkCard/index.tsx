"use client";

import Image from "next/image";
import Link from "next/link";
import { Zap, ShieldCheck } from "lucide-react";
import { Work } from "@/types/work";

type WorkCardProps = {
  work: Work;
  onClick: (work: Work) => void;
};

export function WorkCard({ work, onClick }: WorkCardProps) {
  return (
    <div
      onClick={() => onClick(work)}
      className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden border border-slate-100 flex flex-col h-full"
    >
      {/* サムネイルエリア */}
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
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        )}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
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
        {/* カテゴリ表示 */}
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

        <h2 className="text-lg font-black text-slate-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
          {work.title}
        </h2>

        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
          {work.summary}
        </p>

        {/* --- 修正箇所: タグをLinkに変更 --- */}
        <div className="flex flex-wrap gap-1.5 pt-2">
          {work.tags.map((tag) => (
            <Link
              key={tag}
              href={`/works?tags=${encodeURIComponent(tag)}`}
              onClick={(e) => e.stopPropagation()} // カードの詳細表示イベントを発火させない
              className="text-[10px] text-slate-400 hover:text-blue-600 transition-colors font-medium"
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
  );
}
