// ここから技術力の“深さ”が見える部分。

// 8. PreviewFrame
// iframe の簡易プレビュー。
// - ギャラリーの最大の技術的特徴
// - transform: scale() の検証が必要
// - UIパーツ側の構造もここで確定する

// src/app/gallery/components/preview/PreviewFrame.tsx
"use client";

import { useState, useRef, useEffect } from "react";

interface PreviewFrameProps {
  url: string;
}

export const PreviewFrame = ({ url }: PreviewFrameProps) => {
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [prevUrl, setPrevUrl] = useState(url); // 直前のURLを保持
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // 【推奨パターン】レンダリング中にURLの変化を検知してStateをリセット
  // これにより useEffect を待たずに、次のレンダリングで即座に loading 状態になります
  if (url !== prevUrl) {
    setPrevUrl(url);
    setStatus("loading");
  }

  // タイムアウト監視用のEffect（こちらは副作用なので useEffect でOK）
  useEffect(() => {
    // 成功・エラー確定済みならタイマーは不要
    if (status !== "loading") return;

    const timer = setTimeout(() => {
      setStatus("error");
    }, 10000);

    return () => {
      clearTimeout(timer);
    };
  }, [status, url]); // statusの変化でクリーンアップ（タイマー解除）

  const handleLoad = () => setStatus("success");
  const handleError = () => setStatus("error");

  return (
    <div className="relative w-full h-full bg-white overflow-hidden flex items-center justify-center">
      {/* 1. ローディング表示 */}
      {status === "loading" && (
        <div className="absolute inset-0 flex items-center justify-center bg-neutral-50 z-20">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
            <p className="text-[10px] font-bold text-neutral-400 tracking-widest uppercase">Loading Preview...</p>
          </div>
        </div>
      )}

      {/* 2. エラー表示 */}
      {status === "error" && (
        <div className="absolute inset-0 flex items-center justify-center bg-red-50 z-30 p-6 text-center">
          <div className="flex flex-col items-center gap-4 max-w-[280px]">
            <div className="w-12 h-12 bg-red-100 text-red-500 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <p className="text-sm font-bold text-red-800">プレビューを表示できません</p>
          </div>
        </div>
      )}

      {/* 3. iframe本体 */}
      <iframe
        key={url}
        ref={iframeRef}
        src={url}
        className={`w-full h-full border-none transition-opacity duration-500 ${
          status === "success" ? "opacity-100" : "opacity-0"
        }`}
        onLoad={handleLoad}
        onError={handleError}
        sandbox="allow-scripts allow-same-origin"
        title="UI Part Preview"
      />
    </div>
  );
};