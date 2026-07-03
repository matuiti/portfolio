'use client';
import { useState, useRef, useEffect } from 'react';
import { GalleryUIPart } from '@/types/gallery';
import { PREVIEW_PANEL_SETTINGS } from '@/gallery/data';
import { ZoomOutMap } from '@/components/ui/Icons';
import { PreviewFrame } from './preview/PreviewFrame';
import { useIframeContentHeight } from '@/gallery/lib/hooks/useIframeContentHeight';

type PreviewPanelProps = {
  item: GalleryUIPart;
  onExpand: () => void;
};

type SelectableViewportWidth =
  (typeof PREVIEW_PANEL_SETTINGS)['VIEWPORTS'][number]['width'];

export const PreviewPanel = ({ item, onExpand }: PreviewPanelProps) => {
  const [viewportWidth, setViewportWidth] = useState<SelectableViewportWidth>(
    PREVIEW_PANEL_SETTINGS.DEFAULT_WIDTH,
  );

  const containerRef = useRef<HTMLDivElement>(null);

  // iframeの中身の高さを監視
  const { height: iframeContentHeight, isCalculated: isHeightCalculated } =
    useIframeContentHeight(containerRef);

  // 表示用パネル全体の実際のサイズを管理
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  // 表示用パネル全体のサイズ変更をリアルタイムに監視
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        setContainerSize({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // レンダリング中に安全にスケールを計算する
  let scale = 1;
  if (
    containerSize.width > 0 &&
    containerSize.height > 0 &&
    iframeContentHeight > 0
  ) {
    const widthScale = containerSize.width / viewportWidth;
    const heightScale = containerSize.height / iframeContentHeight;

    // 縦も横も同時にはみ出さない、最も小さいスケール（最大100%）を採用
    scale = Math.min(widthScale, heightScale, 1);
  }

  return (
    <div className='flex flex-col h-full'>
      {/* プレビューサイズ切り替えボタン */}
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

      {/* 表示パネルのルート（背景領域） */}
      <div
        key={item.url}
        ref={containerRef}
        className='relative flex-1 w-full h-full flex items-center justify-center bg-light-gray p-[calc(18.35/16*1rem)_calc(15/16*1rem)] mobile:p-[calc(24.6/16*1rem)_calc(15/16*1rem)] tablet:p-[calc(20/16*1rem)_calc(20/16*1rem)] overflow-hidden'
      >
        {/* ローディングスピナー */}
        {!isHeightCalculated && (
          <div className='absolute inset-0 flex items-center justify-center bg-light-gray rounded-lg animate-pulse'>
            <div className='w-6 h-6 border-2 border-black/10 border-t-black rounded-full animate-spin' />
          </div>
        )}

        {/* 物理的に縮小させる */}
        <div
          className={`relative bg-white rounded-lg transition-opacity duration-200 ${
            isHeightCalculated ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          style={{
            // スクロールバーを出さずに、外枠の中にぴったり収まるように計算
            width: `${viewportWidth * scale}px`,
            height:
              iframeContentHeight > 0
                ? `${iframeContentHeight * scale}px`
                : '100%',
          }}
        >
          {/* 見た目上のみ縮小させる */}
          <div
            style={{
              // パーツの実寸を指定する
              width: `${viewportWidth}px`,
              height:
                iframeContentHeight > 0 ? `${iframeContentHeight}px` : '100%',
              transform: `scale(${scale})`,
              transformOrigin: 'top left',
            }}
          >
            <PreviewFrame url={item.url} />
          </div>
        </div>
      </div>
    </div>
  );
};
