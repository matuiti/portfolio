// src/app/gallery/components/list/NoResults.tsx
"use client";

interface NoResultsProps {
  message: string;
  onReset: () => void;
}

export function NoResults({ message, onReset }: NoResultsProps) {
  return (
    <div className="py-24 text-center bg-white border-2 border-dashed border-neutral-100 rounded-[40px] animate-in fade-in duration-500">
      <div className="text-5xl mb-6">🔍</div>
      <p className="text-neutral-600 font-bold text-lg">{message}</p>
      <p className="text-sm text-neutral-400 mt-3">
        条件をクリアするか、別のキーワードを試してみてください。
      </p>
      <button
        onClick={onReset}
        className="mt-6 px-6 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-600 rounded-full text-xs font-bold transition-colors"
      >
        フィルターをリセット
      </button>
    </div>
  );
}
