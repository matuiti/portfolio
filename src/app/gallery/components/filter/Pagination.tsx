"use client";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  // 全1ページ以下の場合は何も表示しない
  if (totalPages <= 1) return null;

  // 表示するページ番号の配列を作成
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="flex items-center justify-center gap-2 mt-12 pb-10">
      {/* 前へボタン */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 text-sm font-medium rounded-xl border border-neutral-200 bg-white text-neutral-600 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-neutral-50 transition-colors"
      >
        Prev
      </button>

      {/* ページ番号 */}
      <div className="flex items-center gap-1">
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-10 h-10 text-sm font-bold rounded-xl transition-all ${
              currentPage === page
                ? "bg-neutral-900 text-white shadow-md shadow-neutral-200"
                : "bg-white text-neutral-500 border border-neutral-100 hover:border-neutral-300"
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      {/* 次へボタン */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 text-sm font-medium rounded-xl border border-neutral-200 bg-white text-neutral-600 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-neutral-50 transition-colors"
      >
        Next
      </button>
    </nav>
  );
}
