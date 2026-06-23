'use client';
import { useState } from 'react';
import { DescriptionPanel } from '../tabs/DescriptionPanel';
import { CodePanel } from '../tabs/CodePanel';
import { TabSwitcher } from '../tabs/TabSwitcher';
import { TabType, UIPart } from '@/gallery/types';
import dynamic from 'next/dynamic';

// PreviewPanelをクライアントサイドのみで読み込むように設定
const PreviewPanel = dynamic(
  () => import('../tabs/PreviewPanel').then((mod) => mod.PreviewPanel),
  { ssr: false },
);

type CardProps = {
  item: UIPart;
  onExpand: (item: UIPart) => void;
};

const CARD_STYLE = {
  height: 'small:h-[580px]',
  previewHeight: 'h-[400px]',
  radiusOuter: 'rounded-[40px]',
  radiusInner: 'rounded-[32px]',
} as const;

export const Card = ({ item, onExpand }: CardProps) => {
  const [activeTab, setActiveTab] = useState<TabType>('description');

  if (!item) return null;

  return (
    <div
      className={`group bg-white ${CARD_STYLE.radiusOuter} border border-neutral-200 shadow-sm overflow-hidden flex flex-col small:flex-row w-full h-auto ${CARD_STYLE.height} transition-all duration-500 hover:shadow-2xl hover:border-blue-100`}
    >
      {/* 左側：テキスト・情報セクション */}
      <div className='small:w-[45%] p-8 small:p-12 flex flex-col border-b small:border-b-0 small:border-r border-neutral-100 bg-white shrink-0 min-w-0'>
        <header className='mb-8 shrink-0'>
          <h3 className='text-2xl small:text-3xl font-black text-neutral-900 mb-4 leading-tight group-hover:text-blue-600 transition-colors'>
            {item.title}
          </h3>
        </header>

        <div className='mb-8 shrink-0'>
          <TabSwitcher activeTab={activeTab} onTabChange={setActiveTab} />
        </div>

        {/* コンテンツエリア */}
        <div className='flex-1 min-h-0 relative flex flex-col'>
          <div
          // className={`flex-1 min-h-0 ${
          //   activeTab === 'code'
          //     ? 'overflow-hidden' // CodePanel自体にスクロールを任せる
          //     : 'overflow-y-auto custom-scrollbar pr-2 small:pr-6'
          // }`}
          >
            <div className='h-full animate-in fade-in slide-in-from-bottom-4 duration-500'>
              {activeTab === 'description' && <DescriptionPanel item={item} />}

              {activeTab === 'code' && (
                <div className='h-full w-full'>
                  <CodePanel item={item} />
                </div>
              )}

              {activeTab === 'preview' && (
                <div
                  className={`small:hidden ${CARD_STYLE.previewHeight} rounded-3xl overflow-hidden border border-neutral-100 shadow-inner bg-neutral-50`}
                >
                  <PreviewPanel item={item} onExpand={() => onExpand(item)} />
                </div>
              )}
            </div>
            <div className='animate-in fade-in slide-in-from-bottom-4 duration-1000'>
              <div className='flex flex-wrap gap-2'>
                {item.tags?.map((tag) => (
                  <span
                    key={tag}
                    className='px-3 py-1.5 bg-white border border-neutral-200 rounded-lg text-[11px] font-mono font-bold text-neutral-500 shadow-sm'
                  >
                    # {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* グラデーションマスク：Descriptionタブの時のみ、スクロールエリアの上に配置 */}
          {/* {activeTab === 'description' && (
            <div className='absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none z-10' />
          )} */}
        </div>
      </div>

      {/* PC時に独立するプレビューパネル */}
      <div className='hidden small:flex flex-[1.1] min-w-0 bg-neutral-50 p-10 flex-col overflow-hidden'>
        <div
          className={`relative w-full h-full ${CARD_STYLE.radiusInner} overflow-hidden shadow-2xl border border-white bg-white group-hover:scale-[1.01] transition-all duration-700`}
        >
          {<PreviewPanel item={item} onExpand={() => onExpand(item)} />}
        </div>
      </div>
    </div>
  );
};
