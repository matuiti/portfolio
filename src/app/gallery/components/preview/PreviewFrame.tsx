"use client";

import { useState, useRef, useEffect, useLayoutEffect } from "react";

interface PreviewFrameProps {
  url: string;
  /** 仮想的な基準幅（この幅をベースにスケールを計算する） */
  baseWidth?: number;
}

export const PreviewFrame = ({
  url,
  baseWidth = 1280, // デフォルトの基準幅
}: PreviewFrameProps) => {
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading",
  );
  const [prevUrl, setPrevUrl] = useState(url);
  const [scale, setScale] = useState(1);

  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // URL変化時のリセットロジック
  if (url !== prevUrl) {
    setPrevUrl(url);
    setStatus("loading");
  }

  // 初回マウント時とウィンドウリサイズ時にスケールを再計算
  useLayoutEffect(() => {
    /**
     * 親コンテナの幅を監視して、最適なスケール倍率を計算する
     */
    const updateScale = () => {
      if (!containerRef.current) return;

      const containerWidth = containerRef.current.offsetWidth;

      // 親要素の幅が基準幅より小さい場合、その比率を計算
      if (containerWidth < baseWidth) {
        const newScale = containerWidth / baseWidth;
        setScale(newScale);
      } else {
        setScale(1);
      }
    };
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, [baseWidth]);

  useEffect(() => {
    if (status !== "loading") return;
    const timer = setTimeout(() => setStatus("error"), 10000);
    return () => clearTimeout(timer);
  }, [status, url]);

  const handleLoad = () => setStatus("success");
  const handleError = () => setStatus("error");

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full bg-white overflow-hidden flex items-center justify-center"
    >
      {/* 1. ローディング・エラー表示（略：既存通り） */}
      {status === "loading" && (
        <div className="absolute inset-0 flex items-center justify-center bg-neutral-50 z-20">
          <div className="w-8 h-8 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
        </div>
      )}

      {/* 2. iframe本体：スケール適用 */}
      <div
        className="relative flex items-center justify-center"
        style={{
          width: baseWidth, // iframe自体は常に基準幅で描画
          height: `${100 / scale}%`, // 高さはスケール分だけ逆算して引き伸ばす（歪み防止）
          transform: `scale(${scale})`,
          transformOrigin: "center center",
        }}
      >
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

      {/* 倍率バッジ（オプション：デバッグやUX向上用） */}
      {status === "success" && scale < 1 && (
        <div className="absolute bottom-2 right-2 bg-neutral-900/10 backdrop-blur-md px-2 py-0.5 rounded text-[8px] font-mono text-neutral-500 pointer-events-none">
          {Math.round(scale * 100)}% Scale
        </div>
      )}
    </div>
  );
};
