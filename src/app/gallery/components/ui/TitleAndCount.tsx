interface TitleAndCountProps {
  count: number;
}

export function TitleAndCount({ count }: TitleAndCountProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-xl font-bold tracking-tight">UI Gallery</h1>

      <div className="text-right">
        <span className="text-sm text-neutral-500">検索結果：{count} 件</span>
      </div>
    </div>
  );
}
