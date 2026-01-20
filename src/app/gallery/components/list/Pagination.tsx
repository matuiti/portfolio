// src/app/gallery/components/list/Pagination.tsx
type PaginationProps = {
  current: number;
  total: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({
  current,
  total,
  onPageChange,
}: PaginationProps) => {
  if (total <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-16 mb-8">
      {/* 戻るボタン */}
      <button
        onClick={() => onPageChange(Math.max(1, current - 1))}
        disabled={current === 1}
        className="p-3 rounded-2xl bg-white border border-neutral-200 text-neutral-400 disabled:opacity-30 disabled:cursor-not-allowed hover:border-blue-500 hover:text-blue-500 transition-all shadow-sm"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      {/* ページ番号 */}
      <div className="flex items-center gap-1 bg-white p-1.5 rounded-[24px] border border-neutral-200 shadow-sm">
        {[...Array(total)].map((_, i) => {
          const page = i + 1;
          const isActive = current === page;
          return (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`
                w-12 h-12 rounded-[18px] text-sm font-black transition-all duration-300
                ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-200 scale-105"
                    : "text-neutral-400 hover:bg-neutral-50 hover:text-neutral-900"
                }
              `}
            >
              {page}
            </button>
          );
        })}
      </div>

      {/* 次へボタン */}
      <button
        onClick={() => onPageChange(Math.min(total, current + 1))}
        disabled={current === total}
        className="p-3 rounded-2xl bg-white border border-neutral-200 text-neutral-400 disabled:opacity-30 disabled:cursor-not-allowed hover:border-blue-500 hover:text-blue-500 transition-all shadow-sm"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
};
