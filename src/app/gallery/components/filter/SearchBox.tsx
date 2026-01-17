// このコンポーネントの役割は、ユーザーが入力したテキストを useFiltering の searchQuery に届けることです。
// 設計のポイントは、**「入力のしやすさ」と「リセットのしやすさ」**です。
"use client";

interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBox({ value, onChange }: SearchBoxProps) {
  return (
    <div className="relative group w-full">
      {/* 検索アイコン (左側) */}
      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
        <span className="text-sm grayscale group-focus-within:grayscale-0 transition-all">
          🔍
        </span>
      </div>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="キーワードで検索..."
        className="block w-full pl-10 pr-10 py-2.5 bg-white border border-neutral-200 rounded-xl text-sm placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
      />

      {/* クリアボタン (入力がある時だけ右側に表示) */}
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute inset-y-0 right-2 flex items-center px-2 text-neutral-400 hover:text-neutral-600 transition-colors"
          aria-label="検索ワードをクリア"
        >
          <span className="text-lg leading-none">×</span>
        </button>
      )}
    </div>
  );
}