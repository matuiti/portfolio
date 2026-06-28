'use client';
import { useState, useRef, useEffect } from 'react';
import { GalleryUIPart } from '@/gallery/types';
import { PREVIEW_PANEL_SETTINGS } from '@/gallery/data';
import { ZoomOutMap } from '@/components/ui/Icons';
import { PreviewFrame } from './preview/PreviewFrame';

type PreviewPanelProps = {
  item: GalleryUIPart;
  onExpand: () => void;
};

export const PreviewPanel = ({ item, onExpand }: PreviewPanelProps) => {
  // 実際にどのサイズで表示させるか
  const [viewportWidth, setViewportWidth] = useState<number>(
    PREVIEW_PANEL_SETTINGS.DEFAULT_WIDTH,
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  // iframe内のコンテンツの実際の高さ（縮小前）
  const [iframeContentHeight, setIframeContentHeight] = useState<number>(0);

  // 高さの計算が「完全に完了したか」を管理するフラグ
  const [isHeightCalculated, setIsHeightCalculated] = useState<boolean>(false);

  // iframe内のコンテンツの実際の高さ（縮小前）を更新する関数
  useEffect(() => {
    const iframe = containerRef.current?.querySelector('iframe');
    if (!(iframe instanceof HTMLIFrameElement)) return;

    let observer: ResizeObserver | null = null;
    let cancelled = false;

    const attach = () => {
      try {
        const target = iframe.contentWindow?.document.documentElement;
        if (!target) return;
        observer = new ResizeObserver((entries) => {
          const h = entries[0]?.contentRect.height ?? target.scrollHeight;
          if (!cancelled && h > 0 && h < 3000) {
            setIframeContentHeight(h);
            setIsHeightCalculated(true);
          }
        });
        observer.observe(target);
      } catch {
        if (!cancelled) setIsHeightCalculated(true); // クロスオリジン等のフォールバック
      }
    };

    iframe.addEventListener('load', attach);
    attach(); // 既に読み込み済みのケースにも対応

    return () => {
      cancelled = true;
      iframe.removeEventListener('load', attach);
      observer?.disconnect();
    };
  }, [item.url]);

  // コンテナの幅に合わせてスケールを計算する
  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const newScale = containerWidth / viewportWidth; // 実際の幅 ÷ 表示したい仮想ビューポート幅
        const finalScale = Math.min(newScale, 1); // 拡大はしない（最大100%）
        setScale(finalScale);
      }
    };

    updateScale();
    const handleResize = () => {
      updateScale();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [viewportWidth]);

  return (
    <div className='flex flex-col h-full'>
      {/* ビューポートコントローラー */}
      <div className='flex items-center justify-between bg-white py-2.5 tablet:p-[calc(10/16*1rem)_calc(16.5/16*1rem)_calc(16/16*1rem)_calc(20/16*1rem)]'>
        <div className='flex items-center gap-2'>
          {PREVIEW_PANEL_SETTINGS.VIEWPORTS.map((v) => (
            <button
              key={v.label}
              onClick={() => setViewportWidth(v.width)}
              className={`px-4 py-2 text-[calc(14/16*1rem)] rounded-[calc(20/16*1rem)] border transition-all ${
                viewportWidth === v.width
                  ? 'bg-black text-white border-black'
                  : 'bg-white text-black border-dark-gray tablet:hover:bg-light-gray tablet:hover:cursor-pointer'
              }`}
            >
              {v.label}
            </button>
          ))}
        </div>

        <button
          onClick={onExpand}
          className='tablet:hover:cursor-pointer'
          title='全画面表示'
        >
          <ZoomOutMap />
        </button>
      </div>

      {/* key={item.url} をここに付与することでカードが切り替わるたびにローディングから再開されます */}
      <div
        key={item.url}
        className='relative flex-1 w-full h-full flex items-center justify-center bg-light-gray p-[calc(18.35/16*1rem)_calc(15/16*1rem)] mobile:p-[calc(24.6/16*1rem)_calc(15/16*1rem)] tablet:p-[calc(20/16*1rem)_calc(20/16*1rem)]'
      >
        {/* 計算中のローディングスピナー */}
        {!isHeightCalculated && (
          <div className='absolute inset-0 flex items-center justify-center bg-light-gray rounded-lg animate-pulse'>
            <div className='w-6 h-6 border-2 border-black/10 border-t-black rounded-full animate-spin' />
          </div>
        )}

        {/* プレビュー表示エリア */}
        <div
          ref={containerRef}
          className={`relative flex items-start justify-center overflow-x-hidden overflow-y-auto w-auto h-full tablet:aspect-[350/196.34] bg-white rounded-lg ${
            isHeightCalculated ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div
            style={{
              width: `${viewportWidth}px`,
              height:
                iframeContentHeight > 0 ? `${iframeContentHeight}px` : '100%',
              transform: `scale(${scale})`,
              transformOrigin: 'top center',
            }}
          >
            <PreviewFrame url={item.url} />
          </div>
        </div>
      </div>
    </div>
  );
};
