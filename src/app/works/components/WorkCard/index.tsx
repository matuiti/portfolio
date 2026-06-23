'use client';
import { memo, useState } from 'react';
import { Work, WorkCategory } from '@/types/work';
import { BaseTag } from '@/components/ui/BaseTag';
import { SafeImage } from '@/components/ui/SafeImage';
import { scrollToTop } from '@/lib/utility/scrollToTop';
import { useGetCurrentPageName } from '@/lib/hooks/useGetCurrentPageName';

const NDA_THUMBNAIL_PATH = '/assets/images/common/noimage.jpg';
const PLACEHOLDER_THUMBNAIL_PATH = '/assets/images/common/noimage.jpg';

type WorkCardProps = {
  work: Work;
  onClick: () => void;
  onCategoryClick?: (cat: WorkCategory) => void;
  className?: string;
};

export const WorkCard = memo(
  ({ work, onClick, onCategoryClick, className }: WorkCardProps) => {
    const [isTagHovered, setIsTagHovered] = useState(false);

    const getImageSrc = (() => {
      const hasThumbnail = !!work.thumbnail;
      const hasImages = !!(work.images && work.images.length > 0);
      if (hasThumbnail) return work.thumbnail;
      if (hasImages) return work.images![0];
      if (work.disclosureLevel === 'NDA') return NDA_THUMBNAIL_PATH;
      return PLACEHOLDER_THUMBNAIL_PATH;
    })();

    const hoveredText =
      work.disclosureLevel === 'NDA' ? '非公開実績' : '詳しく見る';

    const currentPageName = useGetCurrentPageName();
    const handleCategoryClick = (e: React.MouseEvent, cat: string) => {
      e.stopPropagation();
      if (!onCategoryClick) return;
      onCategoryClick(cat as WorkCategory);
      if (currentPageName === 'works') {
        scrollToTop();
      }
    };

    return (
      <article
        onClick={onClick}
        className={`group flex flex-col overflow-hidden cursor-pointer shadow-card rounded-lg ${
          !isTagHovered ? 'hover:shadow-none' : ''
        } ${className || ''}
        }`}
      >
        {/* サムネイル */}
        <div className='relative aspect-video overflow-hidden bg-white'>
          <SafeImage
            src={getImageSrc}
            alt={work.title}
            fill
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            className={`object-cover transition-transform duration-700 ${
              !isTagHovered ? 'group-hover:scale-110' : ''
            }`}
          />

          {/* 画像オーバーレイ */}
          <div
            className={`absolute inset-0 bg-menu-backdrop flex items-center justify-center transition-opacity duration-500 z-image-overlay ${
              !isTagHovered ? 'opacity-0 group-hover:opacity-100' : 'opacity-0'
            }`}
          >
            <span className='text-white text-[calc(18/16*1rem)]'>
              {hoveredText}
            </span>
          </div>
        </div>

        {/* 情報 */}
        <div
          className={`bg-white flex flex-col flex-1 pt-[calc(28/16*1rem)] px-[calc(16/16*1rem)] pb-[calc(16/16*1rem)] ${
            !isTagHovered ? 'group-hover:bg-light-gray' : ''
          }`}
        >
          <div
            className='mb-4 flex flex-wrap gap-2 relative'
            onMouseEnter={() => setIsTagHovered(true)}
            onMouseLeave={() => setIsTagHovered(false)}
          >
            {work.category.map((cat) => (
              <BaseTag
                key={cat}
                shape='tag'
                onClick={(e) => handleCategoryClick(e, cat)}
              >
                {cat}
              </BaseTag>
            ))}
          </div>

          <h3 className='mb-4 text-[calc(18/16*1rem)] leading-tight  line-clamp-2'>
            {work.title}
          </h3>

          <p className='text-[calc(16/16*1rem)] line-clamp-2 leading-normal'>
            {work.summary}
          </p>

          <div className='mt-auto'>
            <div className='mt-4  border-t border-medium-gray pt-4 flex flex-col gap-y-2.5 text-[calc(12/16*1rem)] text-dark-gray'>
              <div className='flex'>
                <span className='shrink-0'>担当範囲：</span>
                <span className='line-clamp-1'>{work.role}</span>
              </div>
              <div className='flex'>
                <span className='shrink-0'>制作期間：</span>
                <span>{work.duration}</span>
              </div>
            </div>
          </div>
        </div>
      </article>
    );
  },
);

WorkCard.displayName = 'WorkCard';
