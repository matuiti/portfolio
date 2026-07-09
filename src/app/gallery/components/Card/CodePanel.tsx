'use client';

import { useState, useEffect } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-markup';

import { GalleryUIPart } from '@/types/gallery';

type CodePanelProps = {
  item: GalleryUIPart;
};

type Lang = 'html' | 'css' | 'js';

export const CodePanel = ({ item }: CodePanelProps) => {
  const [activeLang, setActiveLang] = useState<Lang>('html');
  const [isCopied, setIsCopied] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);

  useEffect(() => {
    Prism.highlightAll();
  }, [activeLang, item, isMaximized]);

  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => setIsCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isCopied]);

  useEffect(() => {
    if (isMaximized) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMaximized]);

  const getCode = (lang: Lang): string => {
    const source = item.code;
    if (!source) return `// コードが見つかりませんでした。`;
    return (
      source[lang] ||
      `// "${lang.toUpperCase()}" の記述は見つかりませんでした。`
    );
  };

  const copyToClipboard = async () => {
    const code = getCode(activeLang);
    try {
      await navigator.clipboard.writeText(code);
      setIsCopied(true);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const prismLangClass =
    activeLang === 'js'
      ? 'language-javascript'
      : activeLang === 'html'
        ? 'language-markup'
        : 'language-css';

  return (
    <div
      className={`flex flex-col bg-[#2d2d2d] transition-all duration-200 ${
        isMaximized
          ? 'fixed inset-0 z-50 w-screen h-screen rounded-none'
          : 'h-full w-full rounded-2xl border border-neutral-800 overflow-hidden shadow-2xl'
      }`}
    >
      <div className='flex items-center justify-between px-6 py-3 bg-[#1e1e1e] border-b border-neutral-800 shrink-0'>
        <div className='flex gap-2'>
          {(['html', 'css', 'js'] as const).map((lang) => (
            <button
              key={lang}
              onClick={() => setActiveLang(lang)}
              className={`px-4 py-1.5 text-[10px] font-black rounded-full uppercase tracking-widest transition-all ${
                activeLang === lang
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20'
                  : 'text-neutral-500 hover:text-neutral-300 hover:bg-white/5'
              }`}
            >
              {lang}
            </button>
          ))}
        </div>

        <div className='flex items-center gap-2'>
          <button
            onClick={() => setIsMaximized(!isMaximized)}
            className='p-2 rounded-xl border bg-white/5 border-transparent text-neutral-400 hover:text-white hover:bg-white/10 transition-all'
            title={isMaximized ? '縮小する' : '全画面で見る'}
          >
            <svg
              className='w-4 h-4'
              fill='none'
              stroke='currentColor'
              strokeWidth={2}
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4'
              />
            </svg>
          </button>

          <button
            onClick={copyToClipboard}
            title='コピーする'
            className={`p-2 rounded-xl border transition-all duration-300 flex items-center gap-2 ${
              isCopied
                ? 'bg-green-500/10 border-green-500/50 text-green-400'
                : 'bg-white/5 border-transparent text-neutral-400 hover:text-white hover:bg-white/10 hover:border-white/10'
            }`}
          >
            {isCopied ? (
              <svg
                className='w-4 h-4 animate-in zoom-in duration-300'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M5 13l4 4L19 7'
                />
              </svg>
            ) : (
              <svg
                className='w-4 h-4'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M8 16H6a2 2 0 00-2 2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z'
                />
              </svg>
            )}
            {isCopied && (
              <span className='text-[calc(10/16*1rem)] font-bold uppercase'>
                Copied!
              </span>
            )}
          </button>
        </div>
      </div>

      {/* コード表示エリア */}
      <div className='flex-1 min-h-0 w-full overflow-auto custom-scrollbar-dark bg-[#2d2d2d]'>
        <pre
          className={`p-8 text-[calc(13/16*1rem)] leading-relaxed m-0 ${prismLangClass}`}
          style={{ margin: 0, background: 'transparent' }}
        >
          <code className={prismLangClass}>{getCode(activeLang)}</code>
        </pre>
      </div>

      <div className='px-6 py-4 bg-[#1e1e1e] border-t border-neutral-800 flex justify-between items-center shrink-0'>
        <div className='flex gap-1'>
          <div className='w-2 h-2 rounded-full bg-red-500/50' />
          <div className='w-2 h-2 rounded-full bg-amber-500/50' />
          <div className='w-2 h-2 rounded-full bg-green-500/50' />
        </div>
        <span className='text-[calc(9/16*1rem)] text-neutral-500 tracking-widest uppercase'>
          {activeLang} engine v1.0 {isMaximized && '(MAX MODE)'}
        </span>
      </div>
    </div>
  );
};
