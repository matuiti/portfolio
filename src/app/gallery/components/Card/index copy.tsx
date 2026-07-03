'use client';
import { useState } from 'react';
import { DescriptionPanel } from './DescriptionPanel';
import { CodePanel } from './CodePanel';
import { TabSwitcher } from './TabSwitcher';
import { TabType, GalleryUIPart } from '@/types/gallery';
import dynamic from 'next/dynamic';

// PreviewPanelコンポーネントをクライアントサイドのみで読み込む設定
const PreviewPanel = dynamic(
  () => import('./PreviewPanel').then((mod) => mod.PreviewPanel),
  { ssr: false },
);

type CardProps = {
  item: GalleryUIPart;
  onExpand: (item: GalleryUIPart) => void;
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
          <h3 className='text-[calc(18/16*1rem)] tablet:text-3xl text-black leading-none tablet:group-hover:opacity-[var(--opacity-hover)] tablet:transition-all'>
            {item.title}
          </h3>
        </div>

        <div className='mb-2.5 shrink-0'>
          <TabSwitcher activeTab={activeTab} onTabChange={setActiveTab} />
        </div>

        {/* コンテンツエリア */}
        <div className='flex-1 min-h-0 relative flex flex-col'>
          {/* className=
            {`flex-1 min-h-0 ${
              activeTab === 'code'
                ? 'overflow-hidden' // CodePanel自体にスクロールを任せる
                : 'overflow-y-auto custom-scrollbar pr-2 tablet:pr-6'
            }`} */}
          <div className='flex-1 h-full aspect-[300/168.82] tablet:aspect-[350/196.34] min-h-[calc(168.82/16*1rem)] tablet:min-h-[calc(196.34/16*1rem)] overflow-hidden'>
            {activeTab === 'description' && <DescriptionPanel item={item} />}

            {activeTab === 'code' && (
              <div className='h-full w-full'>
                <CodePanel item={item} />
              </div>
            )}

            {activeTab === 'preview' && (
              <div className={`tablet:hidden`}>
                <PreviewPanel item={item} onExpand={() => onExpand(item)} />
              </div>
            )}
          </div>
          <div className='flex flex-wrap gap-2 mt-4'>
            {item.tags?.map((tag) => (
              <span
                key={tag}
                className='px-2 py-1 bg-white border border-dark-gray rounded-sm text-[calc(12/16*1rem)] text-dark-gray leading-none'
              >
                # {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* PC only プレビューパネル */}
      <div className='hidden tablet:flex flex-1 min-w-0 bg-neutral-50 p-10 flex-col overflow-hidden'>
        <div
          className={`relative w-full h-full overflow-hidden shadow-2xl border border-white bg-white transition-all duration-700`}
        >
          {<PreviewPanel item={item} onExpand={() => onExpand(item)} />}
        </div>
      </div>
    </div>
  );
};
