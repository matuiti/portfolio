"use client";

import { useState, useEffect } from "react";
import { UI_PARTS } from "@/data/gallery/ui-parts";

export default function WorkbenchPage() {
  const [selectedId, setSelectedId] = useState("");
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [previewBg, setPreviewBg] = useState<"white" | "gray" | "dark">(
    "white",
  );
  const [isMounted, setIsMounted] = useState(false);

  // マウント完了を待つ（Hydration Error対策）
useEffect(() => {
  // ESLintの警告を意図的に抑制：マウント判定のためのsetStateは許容されるべきパターンです
  // eslint-disable-next-line react-hooks/set-state-in-effect
  setIsMounted(true);

  if (UI_PARTS.length > 0) {
    setSelectedId(UI_PARTS[0].id);
  }
}, []);

  const currentPart = UI_PARTS.find((p) => p.id === selectedId) || UI_PARTS[0];

  const handleManualRefresh = () => {
    setRefreshTrigger(Date.now());
  };

  // マウントされる前は何も表示しない（サーバーとクライアントの差異をゼロにする）
  if (!isMounted) return null;

  if (!currentPart) {
    return (
      <div className="p-10 text-white font-sans">パーツが見つかりません。</div>
    );
  }

  const bgColors = {
    white: "bg-white",
    gray: "bg-gray-200",
    dark: "bg-[#333]",
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white flex flex-col font-sans">
      <header className="h-16 border-b border-white/10 flex items-center justify-between px-6 bg-[#1a1a1a] sticky top-0 z-10">
        <div className="flex items-center gap-6">
          <span className="text-blue-400 font-black tracking-tighter text-xl italic">
            WORKBENCH
          </span>

          <select
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
            className="bg-[#2a2a2a] border border-white/20 rounded px-3 py-1.5 text-sm outline-none focus:border-blue-500"
          >
            {UI_PARTS.map((part) => (
              <option key={part.id} value={part.id}>
                [{part.category.toUpperCase()}] {part.title}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex bg-[#2a2a2a] rounded p-1 border border-white/10">
            {(["white", "gray", "dark"] as const).map((bg) => (
              <button
                key={bg}
                onClick={() => setPreviewBg(bg)}
                className={`w-6 h-6 rounded ${bgColors[bg]} border border-white/10 mx-1 transition-transform hover:scale-110 ${
                  previewBg === bg ? "ring-2 ring-blue-500" : ""
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleManualRefresh}
            className="bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-bold px-4 py-2 rounded transition-all active:scale-95"
          >
            REFRESH VIEW
          </button>
        </div>
      </header>

      <main className="flex-1 flex gap-10 p-10 overflow-x-auto items-start bg-[radial-gradient(#222_1px,transparent_1px)] [background-size:20px_20px]">
        <DevicePreview
          name="Mobile"
          width={375}
          src={currentPart.path}
          refreshKey={refreshTrigger}
          bgColor={bgColors[previewBg]}
        />
        <DevicePreview
          name="Desktop"
          width={1200}
          src={currentPart.path}
          refreshKey={refreshTrigger}
          bgColor={bgColors[previewBg]}
        />
      </main>
    </div>
  );
}

function DevicePreview({
  name,
  width,
  src,
  refreshKey,
  bgColor,
}: {
  name: string;
  width: number;
  src: string;
  refreshKey: number;
  bgColor: string;
}) {
  const finalSrc = refreshKey ? `${src}?v=${refreshKey}` : src;

  return (
    <div className="flex flex-col gap-3 shrink-0">
      <div className="flex justify-between items-center px-1">
        <span className="text-[10px] font-bold text-gray-500 tracking-widest uppercase">
          {name}
        </span>
        <span className="text-[10px] font-mono text-gray-600 bg-white/5 px-2 py-0.5 rounded">
          {width}px
        </span>
      </div>

      <div
        className={`${bgColor} rounded-xl shadow-2xl overflow-hidden border border-white/5 transition-colors duration-500`}
        style={{ width: `${width}px`, height: "75vh" }}
      >
        <iframe
          key={`${src}-${refreshKey}`}
          src={finalSrc}
          className="w-full h-full border-none"
          title={name}
        />
      </div>
    </div>
  );
}
