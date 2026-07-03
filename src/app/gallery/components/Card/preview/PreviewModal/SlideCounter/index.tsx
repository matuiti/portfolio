type SlideCounterProps = {
  currentIndex: number;
  totalCount: number;
  color?: string;
};

export const SlideCounter = ({
  currentIndex,
  totalCount,
  color,
}: SlideCounterProps) => {
  return (
    <div
      className={`flex flex-row gap-0.5 items-center justify-center text-[calc(14/16*1rem)] leading-none tracking-widest ${color ? color : 'text-dark-gray'}`}
    >
      <span>{currentIndex + 1}</span>
      <span>/</span>
      <span>{totalCount}</span>
    </div>
  );
};
