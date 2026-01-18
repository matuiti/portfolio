// src/app/gallery/components/tabs/DescriptionPanel.tsx
import { UIPart } from "@/types/gallery/ui-part";

export const DescriptionPanel = ({ item }: { item: UIPart }) => {
  return (
    /* CodePanelと同じく h-full を指定。
      rounded や border のデザインを揃えることで、タブ切り替え時の違和感を消します。
    */
    <div className="flex flex-col h-full w-full bg-neutral-50/50 rounded-[24px] border border-neutral-100 overflow-hidden">
      {/* スクロール領域を pre と同じ位置（内側）に設定。
        custom-scrollbar を適用します。
      */}
      <div className="flex-1 overflow-auto custom-scrollbar p-8 space-y-10">
        {/* 1. 概要テキスト */}
        <section className="animate-in fade-in slide-in-from-bottom-2 duration-500">
          <p className="text-[15px] leading-relaxed text-neutral-600 font-medium">
            {item.description}
          </p>
        </section>

        {/* 2. 特徴リスト */}
        <section className="animate-in fade-in slide-in-from-bottom-3 duration-700">
          <h4 className="text-[11px] font-bold text-neutral-400 uppercase tracking-[0.2em] mb-5 flex items-center gap-2">
            <span className="w-4 h-[1px] bg-neutral-200"></span> Key Features
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {(item.features || []).map((feature, idx) => (
              <div
                key={idx}
                className="flex gap-3 p-4 rounded-2xl bg-white border border-neutral-100 shadow-sm hover:shadow-md hover:border-blue-100 transition-all duration-300"
              >
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center text-[10px] font-black">
                  {idx + 1}
                </span>
                <p className="text-[13px] text-neutral-700 font-medium leading-snug">
                  {feature}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 3. 技術スタック */}
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <h4 className="text-[11px] font-bold text-neutral-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
            <span className="w-4 h-[1px] bg-neutral-200"></span> Tech Stack
          </h4>
          <div className="flex flex-wrap gap-2">
            {(item.techStack || []).map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 bg-white border border-neutral-200 rounded-lg text-[11px] font-mono font-bold text-neutral-500 shadow-sm"
              >
                #{tech}
              </span>
            ))}
          </div>
        </section>

        {/* スクロール確認用の余白（必要に応じて） */}
        <div className="h-4" />
      </div>

      {/* デザインの統一感のため、コードパネルのフッターと同じ高さの
        装飾バーを付けても良いでしょう（任意）
      */}
      <div className="px-5 py-2 bg-white/50 border-t border-neutral-100 flex justify-end items-center flex-shrink-0">
        <span className="text-[9px] text-neutral-300 font-mono tracking-widest uppercase italic">
          Overview
        </span>
      </div>
    </div>
  );
};
