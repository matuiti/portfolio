'use client';

import { PREVIEW_MODAL_SETTINGS } from '@/gallery/data';

type ViewportSliderProps = {
  value: number;
  min?: number;
  max?: number;
  onChange: (val: number) => void;
};

export const ViewportSlider = ({
  value,
  min = PREVIEW_MODAL_SETTINGS.MIN_WIDTH,
  max = PREVIEW_MODAL_SETTINGS.MAX_WIDTH,
  onChange,
}: ViewportSliderProps) => {
  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = Number(e.target.value);
    if (val > max) val = max;
    onChange(val);
  };

  return (
    <div className='flex items-center gap-4 bg-neutral-100/50 tablet:hoverbg-neutral-100 px-4 py-1.5 rounded-full border border-neutral-200 transition-colors group'>
      <svg
        className='w-4 h-4 text-neutral-400 tablet:group-hover:text-blue-500 transition-colors'
        fill='none'
        stroke='currentColor'
        viewBox='0 0 24 24'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z'
        />
      </svg>

      {/* レンジスライダー */}
      <div className='flex items-center gap-3'>
        <input
          type='range'
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className='w-24 small:w-32 accent-blue-600 tablet:cursor-pointer'
          aria-label='Viewport width slider'
        />

        {/* 数値入力フィールド */}
        <div className='flex items-center gap-1 min-w-[80px] border-l border-neutral-200 pl-3 ml-1'>
          <input
            type='number'
            min={min}
            max={max}
            value={value}
            onChange={handleNumberChange}
            className='w-14 text-right bg-transparent border-none text-sm font-mono font-bold text-neutral-700 focus:ring-0 p-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
            aria-label='Viewport width value'
          />
          <span className='text-[10px] text-neutral-400 font-mono uppercase tracking-tighter'>
            px
          </span>
        </div>
      </div>
    </div>
  );
};
