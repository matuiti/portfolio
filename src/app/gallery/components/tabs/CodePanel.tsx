// src/app/gallery/components/tabs/CodePanel.tsx
"use client";

import { useState } from "react";
import { UIPart } from "@/types/gallery/ui-part";

interface CodePanelProps {
  item: UIPart;
}

type Lang = "html" | "css" | "js";

export const CodePanel = ({ item }: CodePanelProps) => {
  const [activeLang, setActiveLang] = useState<Lang>("html");

  // スクロール確認用の大量のダミーコード
  const dummyCodes = {
    html: `${item.codes.html}\n${Array(30)
      .fill('\n<div class="test-item">...</div>')
      .join("\n")}`,
    css: `${item.codes.css}\n${Array(30)
      .fill("/* Scroll Test Style */\n.test-item {\n  padding: 1rem;\n}")
      .join("\n")}`,
    js: `${item.codes.js}\n${Array(30)
      .fill('// Scroll Test Script\nconsole.log("Visual testing...");')
      .join("\n")}`,
  };

  const copyToClipboard = () => {
    const code = dummyCodes[activeLang];
    if (code) {
      navigator.clipboard.writeText(code);
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-neutral-50 rounded-[24px] border border-neutral-200 overflow-hidden">
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

        <button
          onClick={copyToClipboard}
          className="p-2 text-neutral-400 hover:text-blue-500 transition-colors bg-neutral-50 rounded-lg hover:bg-white border border-transparent hover:border-neutral-200"
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
              d="M8 16H6a2 2 0 00-2 2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
        </button>
      </div>

      {/* コード表示エリア：
          flex-1 で余ったスペースを使い切り、pre 自体にスクロールを持たせることで
          スクロールバーをグレー背景の最右端に配置します。
      */}
      <div className="flex-1 flex flex-col min-h-0 bg-neutral-50 overflow-hidden">
        <pre className="flex-1 overflow-auto custom-scrollbar p-6 font-mono text-[13px] leading-relaxed text-neutral-700 whitespace-pre lg:whitespace-pre focus:outline-none">
          <code>{dummyCodes[activeLang]}</code>
        </pre>
      </div>

      {/* フッター */}
      <div className="px-5 py-2 bg-white border-t border-neutral-100 flex justify-between items-center flex-shrink-0">
        <span className="text-[9px] text-neutral-300 font-mono tracking-widest uppercase italic">
          Scrolling in {activeLang}
        </span>
      </div>
    </div>
  );
};
