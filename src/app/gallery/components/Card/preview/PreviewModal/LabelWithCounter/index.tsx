import { SlideCounter } from '../SlideCounter';

type LabelWithCounterProps = {
  currentIndex: number;
  totalCount: number;
  color?: string;
};
export const LabelWithCounter = ({
  currentIndex,
  totalCount,
  color,
}: LabelWithCounterProps) => {
  return (
    <div className='flex flex-row items-center gap-3 py-1.5 px-3 bg-light-gray rounded-[calc(50/16*1rem)]'>
      <span
        className={`text-[calc(12/16*1rem)] leading-none ${color ? color : ''}`}
      >
        該当アイテム
      </span>
      <SlideCounter
        currentIndex={currentIndex}
        totalCount={totalCount}
        color={color}
      />
    </div>
  );
};
