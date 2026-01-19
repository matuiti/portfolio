interface TitleAndCountProps {
  title: string;
  count: number;
}

export function TitleAndCount({ title, count }: TitleAndCountProps) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <h1 className="text-xl font-bold tracking-tight">「{title}」 ギャラリー</h1>
      <div className="text-left">
        <span className="text-sm text-neutral-500">検索結果：{count} 件</span>
      </div>
    </div>
  );
}
