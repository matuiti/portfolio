"use client";

import { useState } from "react";
import { UI_PARTS } from "@/gallery/data/ui-parts";
import { useIsMounted } from "@/lib/hooks/useIsMounted";

export default function WorkbenchPage() {
  const isMounted = useIsMounted();

  // useStateの初期値として関数を渡し、マウントに関わらず値を決める
  // これにより useEffect + setSelectedId が不要になります
  const [selectedId, setSelectedId] = useState(() =>
    UI_PARTS.length > 0 ? UI_PARTS[0].id : "",
  );

  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [previewBg, setPreviewBg] = useState<"white" | "gray" | "dark">(
    "white",
  );

  const currentPart = UI_PARTS.find((p) => p.id === selectedId) || UI_PARTS[0];

  const handleManualRefresh = () => {
    setRefreshTrigger(Date.now());
  };

  if (!isMounted) return null;

  if (!currentPart) {
    return <div className="p-10 text-white">パーツが見つかりません。</div>;
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
            className="bg-[#2a2a2a] border border-white/20 rounded px-3 py-1.5 text-sm outline-none focus:border-blue-500 text-white"
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

      <main className="flex-1 flex gap-8 p-10 overflow-x-auto items-start bg-[radial-gradient(#222_1px,transparent_1px)] [background-size:20px_20px]">
        {(["Mobile", "Tablet", "Desktop"] as const).map((name) => {
          const widths = { Mobile: 375, Tablet: 768, Desktop: 1200 };
          return (
            <DevicePreview
              key={name}
              name={name}
              width={widths[name]}
              src={currentPart.path}
              refreshKey={refreshTrigger}
              bgColor={bgColors[previewBg]}
            />
          );
        })}
      </main>
    </div>
  );
}

type DevicePreviewProps = {
  name: string;
  width: number;
  src: string;
  refreshKey: number;
  bgColor: string;
};

function DevicePreview({
  name,
  width,
  src,
  refreshKey,
  bgColor,
}: DevicePreviewProps) {
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
        style={{ width: `${width}px`, height: "70vh" }}
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
