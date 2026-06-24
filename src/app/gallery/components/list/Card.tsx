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

export const Card = ({ item, onExpand }: CardProps) => {
  const [activeTab, setActiveTab] = useState<TabType>('description');

  if (!item) return null;

  return (
    <div
      className={`group shadow-gallery-card bg-white rounded-[calc(20/16*1rem)] flex flex-col tablet:flex-row w-full h-auto transition-all duration-500`}
    >
      {/* SP 3tab / PC 2tab */}
      <div className='tablet:w-[50%] py-5 px-2.5 mobile:px-[calc(15/16*1rem)] tablet:px-5  flex flex-col border-b tablet:border-b-0 tablet:border-r border-medium-gray shrink-0 min-w-0'>
        <div className='mb-4 shrink-0'>
          <h3 className='text-[calc(18/16*1rem)] tablet:text-3xl text-black leading-none group-hover:opacity-[var(--opacity-hover)] transition-all'>
            {item.title}
          </h3>
        </div>

        <div className='mb-2.5 shrink-0'>
          <TabSwitcher activeTab={activeTab} onTabChange={setActiveTab} />
        </div>

        {/* コンテンツエリア */}
        <div className='flex-1 min-h-0 relative flex flex-col'>
          <div className='flex flex-col'>
            {/* className=
            {`flex-1 min-h-0 ${
              activeTab === 'code'
                ? 'overflow-hidden' // CodePanel自体にスクロールを任せる
                : 'overflow-y-auto custom-scrollbar pr-2 tablet:pr-6'
            }`} */}
            <div className='flex-1 h-full aspect-[300/168.82] tablet:aspect-[350/196.34] min-h-[calc(168.82/16*1rem)] tablet:min-h-[calc(196.34/16*1rem)]'>
              {activeTab === 'description' && <DescriptionPanel item={item} />}

              {activeTab === 'code' && (
                <div className='h-full w-full'>
                  <CodePanel item={item} />
                </div>
              )}

              {activeTab === 'preview' && (
                <div
                  className={`tablet:hidden overflow-hidden`}
                >
                  <PreviewPanel item={item} onExpand={() => onExpand(item)} />
                </div>
              )}
            </div>
            <div className='flex flex-wrap gap-2'>
              {item.tags?.map((tag) => (
                <span
                  key={tag}
                  className='px-3 py-1.5 bg-white border border-neutral-200 rounded-lg text-[11px] font-bold text-neutral-500 shadow-sm'
                >
                  # {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* PC only プレビューパネル */}
      <div className='hidden tablet:flex flex-[1.1] min-w-0 bg-neutral-50 p-10 flex-col overflow-hidden'>
        <div
          className={`relative w-full h-full overflow-hidden shadow-2xl border border-white bg-white group-hover:scale-[1.01] transition-all duration-700`}
        >
          {<PreviewPanel item={item} onExpand={() => onExpand(item)} />}
        </div>
      </div>
    </div>
  );
};
