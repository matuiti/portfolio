'use client';
import { KeyboardArrowRight } from '@/components/ui/Icons';
import { SlideCounter } from '../SlideCounter';

type ModalNavWithCounterProps = {
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
  currentIndex: number;
  totalCount: number;
  color?: string;
};

export const ModalNavWithCounter = ({
  onPrev,
  onNext,
  hasPrev,
  hasNext,
  currentIndex,
  totalCount,
  color,
}: ModalNavWithCounterProps) => {
  return (
    <div className='flex items-center gap-2.5 bg-light-gray p-[calc(4/16*1rem)_calc(8/16*1rem)] rounded-[calc(28/16*1rem)]'>
      <button onClick={onPrev} disabled={!hasPrev} aria-label='Previous item'>
        <KeyboardArrowRight
          direction='left'
          className={`flex items-center justify-center rounded-l-sm ${hasPrev ? 'text-black tablet:hover:bg-white tablet:hover:shadow-gallery-arrow-bg tablet:cursor-pointer' : 'text-dark-gray/30'}`}
        />
      </button>

      <SlideCounter
        currentIndex={currentIndex}
        totalCount={totalCount}
        color={color}
      />

      <button onClick={onNext} disabled={!hasNext} aria-label='Next item'>
        <KeyboardArrowRight
          className={`flex items-center justify-center rounded-l-sm ${hasNext ? 'text-black tablet:hover:bg-white tablet:hover:shadow-gallery-arrow-bg tablet:cursor-pointer' : 'text-dark-gray/30'}`}
        />
      </button>
    </div>
  );
};
