"use client";

import { useState, useRef, useEffect, useLayoutEffect } from "react";
import { useLazyIframe } from "@/lib/hooks/useLazyIframe";

type PreviewFrameProps = {
  url: string;
  baseWidth?: number;
}

export const PreviewFrame = ({ url, baseWidth = 1280 }: PreviewFrameProps) => {
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading",
  );
  const [prevUrl, setPrevUrl] = useState(url);
  const [scale, setScale] = useState(1);

  const { containerRef, isInView } = useLazyIframe("100px");
  const iframeRef = useRef<HTMLIFrameElement>(null);

  if (url !== prevUrl) {
    setPrevUrl(url);
    setStatus("loading");
  }

  useLayoutEffect(() => {
    // containerRef.current をローカル変数に保持（安全な参照のため）
    const currentContainer = containerRef.current;

    const updateScale = () => {
      if (!currentContainer) return;
      const containerWidth = currentContainer.offsetWidth;

      if (containerWidth < baseWidth) {
        setScale(containerWidth / baseWidth);
      } else {
        setScale(1);
      }
    };

    updateScale();

    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);

    // 依存配列に containerRef を追加して警告を解消
  }, [baseWidth, isInView, containerRef]);

  useEffect(() => {
    if (status !== "loading" || !isInView) return;
    const timer = setTimeout(() => setStatus("error"), 10000);
    return () => clearTimeout(timer);
  }, [status, url, isInView]);

  const handleLoad = () => setStatus("success");
  const handleError = () => setStatus("error");

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full bg-white overflow-hidden flex items-center justify-center"
    >
      {/* プレースホルダー / ローディング */}
      {(!isInView || status === "loading") && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-neutral-50 z-20">
          <div className="w-8 h-8 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin mb-4" />
          <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest animate-pulse">
            {!isInView ? "Waiting for scroll..." : "Rendering..."}
          </span>
        </div>
      )}

      {/* エラー表示 */}
      {status === "error" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-neutral-50 z-20 p-4 text-center">
          <svg
            className="w-8 h-8 text-neutral-300 mb-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <span className="text-[10px] font-bold text-neutral-400 uppercase">
            Preview not available
          </span>
        </div>
      )}

      {/* iframe本体 */}
      {isInView && (
        <div
          className="relative flex items-center justify-center transition-transform duration-500"
          style={{
            width: baseWidth,
            height: `${100 / scale}%`,
            transform: `scale(${scale})`,
            transformOrigin: "center center",
          }}
        >
          <iframe
            key={url}
            ref={iframeRef}
            src={url}
            className={`w-full h-full border-none transition-opacity duration-700 ${
              status === "success" ? "opacity-100" : "opacity-0"
            }`}
            onLoad={handleLoad}
            onError={handleError}
            sandbox="allow-scripts allow-same-origin"
            title="UI Part Preview"
          />
        </div>
      )}

      {status === "success" && scale < 1 && (
        <div className="absolute bottom-3 right-3 bg-neutral-900/10 backdrop-blur-md px-2 py-1 rounded text-[9px] font-mono text-neutral-500 pointer-events-none border border-white/20 select-none">
          {Math.round(scale * 100)}% View
        </div>
      )}
    </div>
  );
};
