interface TitleAndCountProps {
  count: number;
  message?: string; // ヒット数0時のメッセージを受け取る
}

export function TitleAndCount({ count, message }: TitleAndCountProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-xl font-bold tracking-tight">UI Gallery</h1>

      <div className="text-right">
        {count > 0 ? (
          // ヒットしている時
          <span className="text-sm text-neutral-500">{count} 件</span>
        ) : (
          // ヒット数0の時（具体的な理由を表示）
          <span className="text-sm text-red-500 font-medium">
            {message || "一致するアイテムがありません"}
          </span>
        )}
      </div>
    </div>
  );
}
