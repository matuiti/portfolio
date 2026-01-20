"use client";

import { useState, useEffect } from "react";
import { UIPart } from "@/types/gallery/ui-part";

interface CodePanelProps {
  item: UIPart;
}

type Lang = "html" | "css" | "js";

export const CodePanel = ({ item }: CodePanelProps) => {
  const [activeLang, setActiveLang] = useState<Lang>("html");
  // コピー状態を管理するステート
  const [isCopied, setIsCopied] = useState(false);

  // コピー状態を一定時間後にリセットする
  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => setIsCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isCopied]);

  const getCode = (lang: Lang): string => {
    const source = item.code;
    if (!source) return `// No code content found.`;
    return source[lang] || `// No ${lang.toUpperCase()} code provided`;
  };

  const copyToClipboard = async () => {
    const code = getCode(activeLang);
    try {
      await navigator.clipboard.writeText(code);
      setIsCopied(true); // コピー成功状態にする
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-neutral-50 rounded-[24px] border border-neutral-200 overflow-hidden shadow-inner">
      {/* ヘッダー */}
      <div className="flex items-center justify-between px-5 py-3 bg-white border-b border-neutral-200 flex-shrink-0">
        <div className="flex gap-1.5">
          {(["html", "css", "js"] as const).map((lang) => (
            <button
              key={lang}
              onClick={() => setActiveLang(lang)}
              className={`px-3 py-1.5 text-[10px] font-bold rounded-lg uppercase tracking-wider transition-all ${
                activeLang === lang
                  ? "bg-blue-50 text-blue-600 ring-1 ring-inset ring-blue-200"
                  : "text-neutral-400 hover:text-neutral-600 hover:bg-neutral-50"
              }`}
            >
              {lang}
            </button>
          ))}
        </div>

        {/* コピーボタン（演出付き） */}
        <button
          onClick={copyToClipboard}
          className={`p-2 rounded-lg border transition-all duration-300 flex items-center gap-2 ${
            isCopied
              ? "bg-green-50 border-green-200 text-green-600"
              : "bg-neutral-50 border-transparent text-neutral-400 hover:text-blue-500 hover:bg-white hover:border-neutral-200"
          }`}
        >
          {isCopied ? (
            // チェックマーク（✅）
            <svg
              className="w-4 h-4 animate-in zoom-in duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          ) : (
            // 通常のコピーアイコン
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
                d="M8 16H6a2 2 0 00-2 2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
          )}
          {isCopied && (
            <span className="text-[10px] font-bold uppercase animate-in fade-in slide-in-from-right-1">
              Copied!
            </span>
          )}
        </button>
      </div>

      {/* コード表示エリア */}
      <div className="flex-1 flex flex-col min-h-0 bg-neutral-50 overflow-hidden">
        <pre className="flex-1 overflow-auto custom-scrollbar p-6 font-mono text-[13px] leading-relaxed text-neutral-700 whitespace-pre">
          <code>{getCode(activeLang)}</code>
        </pre>
      </div>

      <div className="px-5 py-2 bg-white border-t border-neutral-100 flex justify-between items-center flex-shrink-0">
        <span className="text-[9px] text-neutral-300 font-mono tracking-widest uppercase italic">
          {activeLang} source
        </span>
      </div>
    </div>
  );
};
