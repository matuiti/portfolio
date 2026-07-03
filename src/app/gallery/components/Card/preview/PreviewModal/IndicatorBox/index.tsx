'use client';
import { Laptop, Phone } from '@/components/ui/Icons';
import { PREVIEW_MODAL_SETTINGS } from '@/gallery/data';

type IndicatorBoxProps = {
  value: number;
  min?: number;
  max?: number;
  onChange: (val: number) => void;
};

export const IndicatorBox = ({
  value,
  min = PREVIEW_MODAL_SETTINGS.MIN_WIDTH,
  max = PREVIEW_MODAL_SETTINGS.MAX_WIDTH,
  onChange,
}: IndicatorBoxProps) => {
  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = Number(e.target.value);
    if (val > max) val = max;
    onChange(val);
  };

  return (
    <div className='flex items-center gap-4 bg-white px-4 py-1.5 rounded-lg transition-colors group shadow-gallery-indicator-box'>
      <div className='flex-1 flex flex-row items-center justify-center gap-1.5'>
        <div
          className='tablet:cursor-pointer'
          onClick={() => onChange(Number(min))}
        >
          <Phone />
        </div>
        {/* レンジスライダー */}
        <input
          type='range'
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className='w-full h-1.5 accent-black cursor-default tablet:cursor-pointer'
          aria-label='Viewport width slider'
        />
        <div
          className='tablet:cursor-pointer'
          onClick={() => onChange(Number(max))}
        >
          <Laptop />
        </div>
      </div>

      <span className='w-[calc(1/16*1rem)] h-4 bg-medium-gray'></span>

      {/* 数値入力フィールド */}
      <div className='flex flex-row gap-0.5'>
        <input
          type='number'
          min={min}
          max={max}
          value={value}
          onChange={handleNumberChange}
          className='w-[calc(50/16*1rem)] h-5 text-center bg-transparent border border-medium-gray font-bold text-black tracking-widest leading-none text-[calc(14/16*1rem)] rounded-sm p-[calc(1.5/16*1rem)_calc(4/16*1rem)] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
          aria-label='Viewport width value'
        />
        <span className='text-[calc(14/16*1rem)] text-dark-gray tracking-widest leading-none self-center'>
          px
        </span>
      </div>
    </div>
  );
};
