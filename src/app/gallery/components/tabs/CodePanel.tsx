"use client";

import { useState, useEffect } from "react";
import { UIPart } from "@/types/gallery/ui-part";
import Prism from "prismjs";

// Prismのテーマ（お好みのものを選べます。ここではシンプルでモダンな明日系を使用）
import "prismjs/themes/prism-tomorrow.css";
// 必要な言語のみインポート
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-css";
import "prismjs/components/prism-markup"; // HTML用

interface CodePanelProps {
  item: UIPart;
}

type Lang = "html" | "css" | "js";

export const CodePanel = ({ item }: CodePanelProps) => {
  const [activeLang, setActiveLang] = useState<Lang>("html");
  const [isCopied, setIsCopied] = useState(false);

  // 【追加】言語が切り替わったり、コンポーネントが表示された時にハイライトを適用
  useEffect(() => {
    Prism.highlightAll();
  }, [activeLang, item]);

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
      setIsCopied(true);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  // Prism用の言語クラス名を解決
  const prismLangClass =
    activeLang === "js"
      ? "language-javascript"
      : activeLang === "html"
        ? "language-markup"
        : "language-css";

  return (
    <div className="flex flex-col h-full w-full bg-[#2d2d2d] rounded-[24px] border border-neutral-800 overflow-hidden shadow-2xl">
      {/* ヘッダー */}
      <div className="flex items-center justify-between px-6 py-4 bg-[#1e1e1e] border-b border-neutral-800 flex-shrink-0">
        <div className="flex gap-2">
          {(["html", "css", "js"] as const).map((lang) => (
            <button
              key={lang}
              onClick={() => setActiveLang(lang)}
              className={`px-4 py-1.5 text-[10px] font-black rounded-full uppercase tracking-widest transition-all ${
                activeLang === lang
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20"
                  : "text-neutral-500 hover:text-neutral-300 hover:bg-white/5"
              }`}
            >
              {lang}
            </button>
          ))}
        </div>

        {/* コピーボタン */}
        <button
          onClick={copyToClipboard}
          className={`p-2 rounded-xl border transition-all duration-300 flex items-center gap-2 ${
            isCopied
              ? "bg-green-500/10 border-green-500/50 text-green-400"
              : "bg-white/5 border-transparent text-neutral-400 hover:text-white hover:bg-white/10 hover:border-white/10"
          }`}
        >
          {isCopied ? (
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
            <span className="text-[10px] font-bold uppercase">Copied!</span>
          )}
        </button>
      </div>

      {/* コード表示エリア：ダークテーマに合わせて背景を調整 */}
      <div className="flex-1 flex flex-col min-h-0 bg-[#2d2d2d] overflow-hidden">
        <pre
          className={`flex-1 overflow-auto custom-scrollbar-dark p-8 font-mono text-[13px] leading-relaxed ${prismLangClass}`}
        >
          <code className={prismLangClass}>{getCode(activeLang)}</code>
        </pre>
      </div>

      <div className="px-6 py-3 bg-[#1e1e1e] border-t border-neutral-800 flex justify-between items-center flex-shrink-0">
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-full bg-red-500/50" />
          <div className="w-2 h-2 rounded-full bg-amber-500/50" />
          <div className="w-2 h-2 rounded-full bg-green-500/50" />
        </div>
        <span className="text-[9px] text-neutral-500 font-mono tracking-widest uppercase">
          {activeLang} engine v1.0
        </span>
      </div>
    </div>
  );
};
