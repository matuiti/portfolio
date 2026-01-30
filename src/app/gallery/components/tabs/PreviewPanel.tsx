// src/app/gallery/components/tabs/PreviewPanel.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { PreviewFrame } from "../preview/PreviewFrame";
import { UIPart } from "@/gallery/types/ui-part";
import { PREVIEW_PANEL_SETTINGS } from "@/gallery/lib/constants/gallery";

type PreviewPanelProps = {
  item: UIPart;
  onExpand: () => void;
};

export const PreviewPanel = ({ item, onExpand }: PreviewPanelProps) => {
  const [viewportWidth, setViewportWidth] = useState<number>(
    PREVIEW_PANEL_SETTINGS.DEFAULT_WIDTH,
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  // コンテナの幅に合わせてスケールを計算する
  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        // 実サイズ / 仮想サイズ = 倍率
        const newScale = containerWidth / viewportWidth;
        // 1倍以上（等倍以上）にはしない（ボケ防止）
        setScale(Math.min(newScale, 1));
      }
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, [viewportWidth]);

  return (
    <div className="flex flex-col h-full space-y-4">
      {/* 1. ビューポートコントローラー */}
      <div className="flex items-center justify-between bg-white/50 p-2 rounded-2xl border border-neutral-200/50">
        <div className="flex gap-1">
          {PREVIEW_PANEL_SETTINGS.VIEWPORTS.map((v) => (
            <button
              key={v.label}
              onClick={() => setViewportWidth(v.width)}
              className={`px-3 py-1.5 text-[10px] font-bold rounded-xl transition-all ${
                viewportWidth === v.width
                  ? "bg-neutral-800 text-white shadow-md"
                  : "text-neutral-400 hover:bg-neutral-100"
              }`}
            >
              {v.label}
            </button>
          ))}
        </div>

        <button
          onClick={onExpand}
          className="p-2 text-neutral-400 hover:text-blue-600 transition-colors"
          title="全画面表示"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
            />
          </svg>
        </button>
      </div>

      {/* 2. プレビュー表示エリア */}
      <div
        ref={containerRef}
        className="flex-1 relative bg-neutral-200 rounded-2xl overflow-hidden shadow-inner flex items-start justify-center"
      >
        <div
          style={{
            width: `${viewportWidth}px`,
            height: `${100 / scale}%`, // スケール分、高さを補正してエリアを埋める
            transform: `scale(${scale})`,
            transformOrigin: "top center",
          }}
          className="transition-all duration-500 ease-in-out"
        >
          <PreviewFrame url={item.path} />
        </div>
      </div>
    </div>
  );
};
