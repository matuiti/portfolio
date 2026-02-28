type TitleAndCountProps = {
  title: string;
  count: number;
};

export function TitleAndCount({ title, count }: TitleAndCountProps) {
  return (
    <div className="flex flex-col items-start gap-2.5">
      <h2 className="text-black text-[calc(24/16*1rem)] font-bold tracking-wider leading-none">
        {title}
      </h2>
      <div className="text-dark-gray text-[calc(16/16*1rem)] tracking-wider leading-normal">
        <span>検索結果：{count}件</span>
      </div>
    </div>
  );
}
