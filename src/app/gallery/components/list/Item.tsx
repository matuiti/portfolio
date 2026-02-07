"use client";

import { useState } from "react";
import { DescriptionPanel } from "../tabs/DescriptionPanel";
import { CodePanel } from "../tabs/CodePanel";
import { PreviewPanel } from "../tabs/PreviewPanel";
import { DifficultyBadge } from "../ui/DifficultyBadge";
import { TagBadge } from "../ui/TagBadge";
import { TabSwitcher } from "../tabs/TabSwitcher";
import { useIsClient } from "@/lib/hooks/useIsClient";
import { UIPart } from "@/gallery/types/ui-part";
import { TabType } from "@/gallery/types/tab";

type ItemProps = {
  item: UIPart;
  onExpand: (item: UIPart) => void;
};

const CARD_STYLE = {
  height: "lg:h-[580px]",
  previewHeight: "h-[400px]",
  radiusOuter: "rounded-[40px]",
  radiusInner: "rounded-[32px]",
} as const;

export const Item = ({ item, onExpand }: ItemProps) => {
  const [activeTab, setActiveTab] = useState<TabType>("description");
  const isClient = useIsClient();

  if (!item) return null;

  return (
    <div
      className={`group bg-white ${CARD_STYLE.radiusOuter} border border-neutral-200 shadow-sm overflow-hidden flex flex-col lg:flex-row w-full h-auto ${CARD_STYLE.height} transition-all duration-500 hover:shadow-2xl hover:border-blue-100`}
    >
      {/* 左側：テキスト・情報セクション */}
      <div className="lg:w-[45%] p-8 lg:p-12 flex flex-col border-b lg:border-b-0 lg:border-r border-neutral-100 bg-white flex-shrink-0 min-w-0">
        <header className="mb-8 flex-shrink-0">
          <div className="flex items-center gap-3 mb-4">
            <DifficultyBadge level={item.difficulty} />
            <span className="text-neutral-400 font-mono text-[10px] tracking-widest uppercase">
              ID: {item.id}
            </span>
          </div>
          <h3 className="text-2xl lg:text-3xl font-black text-neutral-900 mb-4 leading-tight group-hover:text-blue-600 transition-colors">
            {item.title}
          </h3>
          <div className="flex flex-wrap gap-2">
            {item.tags?.map((tag) => (
              <TagBadge key={tag} label={tag} />
            ))}
          </div>
        </header>

        <div className="mb-8 flex-shrink-0">
          <TabSwitcher activeTab={activeTab} onTabChange={setActiveTab} />
        </div>

        {/* コンテンツエリア */}
        <div className="flex-1 min-h-0 relative flex flex-col">
          <div
            className={`flex-1 min-h-0 ${
              activeTab === "code"
                ? "overflow-hidden" // CodePanel自体にスクロールを任せる
                : "overflow-y-auto custom-scrollbar pr-2 lg:pr-6"
            }`}
          >
            <div className="h-full animate-in fade-in slide-in-from-bottom-4 duration-500">
              {activeTab === "description" && <DescriptionPanel item={item} />}

              {activeTab === "code" && (
                <div className="h-full w-full">
                  <CodePanel item={item} />
                </div>
              )}

              {activeTab === "preview" && isClient && (
                <div
                  className={`lg:hidden ${CARD_STYLE.previewHeight} rounded-3xl overflow-hidden border border-neutral-100 shadow-inner bg-neutral-50`}
                >
                  <PreviewPanel item={item} onExpand={() => onExpand(item)} />
                </div>
              )}
            </div>
          </div>

          {/* グラデーションマスク：Descriptionタブの時のみ、スクロールエリアの上に配置 */}
          {activeTab === "description" && (
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none z-10" />
          )}
        </div>
      </div>

      {/* 右側：PC専用巨大プレビューセクション */}
      <div className="hidden lg:flex flex-[1.1] min-w-0 bg-neutral-50 p-10 flex-col overflow-hidden">
        <div
          className={`relative w-full h-full ${CARD_STYLE.radiusInner} overflow-hidden shadow-2xl border border-white bg-white group-hover:scale-[1.01] transition-all duration-700`}
        >
          {isClient && (
            <PreviewPanel item={item} onExpand={() => onExpand(item)} />
          )}
        </div>
      </div>
    </div>
  );
};
