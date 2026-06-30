'use client';

import { KeyboardArrowRight } from '@/components/ui/Icons';

type ModalNavigationProps = {
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
};

export const ModalNavigation = ({
  onPrev,
  onNext,
  hasPrev,
  hasNext,
}: ModalNavigationProps) => {
  return (
    <div className='flex items-center gap-2.5 bg-light-gray p-[calc(4/16*1rem)_calc(8/16*1rem)] rounded-lg'>
      <button onClick={onPrev} disabled={!hasPrev} aria-label='Previous item'>
        <KeyboardArrowRight
          direction='left'
          className={`flex items-center justify-center rounded-l-sm ${hasPrev ? 'text-black tablet:hover:bg-white tablet:hover:shadow-gallery-arrow-bg tablet:cursor-pointer' : 'text-dark-gray/30'}`}
        />
      </button>

      {/* セパレーター */}
      <div className='w-[calc(1/16*1rem)] h-4 bg-medium-gray' />

      <button onClick={onNext} disabled={!hasNext} aria-label='Next item'>
        <KeyboardArrowRight
          className={`flex items-center justify-center rounded-l-sm ${hasNext ? 'text-black tablet:hover:bg-white tablet:hover:shadow-gallery-arrow-bg tablet:cursor-pointer' : 'text-dark-gray/30'}`}
        />
      </button>
    </div>
  );
};
