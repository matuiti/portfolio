"use client";

import { useState, useSyncExternalStore } from "react";
import { UIPart } from "@/types/gallery/ui-part";
import { DescriptionPanel } from "../tabs/DescriptionPanel";
import { CodePanel } from "../tabs/CodePanel";
import { PreviewPanel } from "../tabs/PreviewPanel";
import { DifficultyBadge } from "../ui/DifficultyBadge";
import { TagBadge } from "../ui/TagBadge";
import { TabSwitcher, GalleryTab } from "../tabs/TabSwitcher";

type ItemCardProps = {
  item: UIPart;
  onExpand: (item: UIPart) => void;
}

const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

export const ItemCard = ({ item, onExpand }: ItemCardProps) => {
  const [activeTab, setActiveTab] = useState<GalleryTab>("description");
  const isClient = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  if (!item) return null;

  return (
    <div className="group bg-white rounded-[40px] border border-neutral-200 shadow-sm overflow-hidden flex flex-col lg:flex-row w-full h-auto lg:h-[580px] transition-all duration-500 hover:shadow-2xl hover:border-blue-100">
      {/* 左側：テキスト・情報セクション */}
      <div className="lg:w-[45%] p-8 lg:p-12 flex flex-col border-b lg:border-b-0 lg:border-r border-neutral-100 bg-white flex-shrink-0">
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
        <div
          className={`flex-1 min-h-0 ${
            activeTab === "code"
              ? "overflow-hidden"
              : "overflow-y-auto custom-scrollbar pr-2 lg:pr-6"
          }`}
        >
          <div className="h-full animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col">
            {activeTab === "description" && <DescriptionPanel item={item} />}

            {activeTab === "code" && (
              <div className="flex-1 h-full min-h-0">
                <CodePanel item={item} />
              </div>
            )}

            {activeTab === "preview" && isClient && (
              <div className="lg:hidden h-[400px] rounded-3xl overflow-hidden border border-neutral-100 shadow-inner bg-neutral-50">
                <PreviewPanel item={item} onExpand={() => onExpand(item)} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 右側：PC専用巨大プレビューセクション */}
      <div className="hidden lg:flex flex-[1.1] min-w-0 bg-neutral-50 p-10 flex-col overflow-hidden">
        <div className="relative w-full h-full rounded-[32px] overflow-hidden shadow-2xl border border-white bg-white group-hover:scale-[1.01] transition-all duration-700">
          {isClient && (
            <PreviewPanel item={item} onExpand={() => onExpand(item)} />
          )}
        </div>
      </div>
    </div>
  );
};
