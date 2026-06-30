'use client';
import { useEffect, useState } from 'react';
import { DescriptionPanel } from './DescriptionPanel';
import { CodePanel } from './CodePanel';
import { TabSwitcher } from './TabSwitcher';
import { TabType, GalleryUIPart } from '@/gallery/types';
import dynamic from 'next/dynamic';

// 実際に必要になったタイミングでコンポーネントを遅延読み込み。クライアントサイドのみに設定。
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
  const BP_TABLET = 840;
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= BP_TABLET) {
        setActiveTab('description');
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!item) return null;

  return (
    <div
      className={`group shadow-gallery-card bg-white rounded-[calc(20/16*1rem)] overflow-hidden tablet:flex tablet:flex-row w-full h-auto transition-all duration-500`}
    >
      {/* 3tab↔2tab(tablet~) */}
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
        <div className='relative flex flex-col'>
          {/* className=
            {`flex-1 min-h-0 ${
              activeTab === 'code'
                ? 'overflow-hidden' // CodePanel自体にスクロールを任せる
                : 'overflow-y-auto custom-scrollbar pr-2 tablet:pr-6'
            }`} */}
          <div className='flex-1 h-full min-h-[calc(168.82/16*1rem)] tablet:min-h-[calc(196.34/16*1rem)] overflow-hidden'>
            <div className='aspect-[300/168.82] tablet:aspect-[350/196.34]'>
              {activeTab === 'description' && <DescriptionPanel item={item} />}

              {activeTab === 'code' && (
                <div className='h-full w-full'>
                  <CodePanel item={item} />
                </div>
              )}

              {activeTab === 'preview' && (
                <PreviewPanel
                  key={item.url}
                  item={item}
                  onExpand={() => onExpand(item)}
                />
              )}
            </div>
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
      <div className='hidden tablet:block flex-1 overflow-hidden'>
        {
          <PreviewPanel
            key={item.url}
            item={item}
            onExpand={() => onExpand(item)}
          />
        }
      </div>
    </div>
  );
};
