// 10. ScaleBadge
// スケール率表示。
// - 小さいが UX に重要
// - PreviewFrame ができてからで十分

// src/app/gallery/components/preview/ScaleBadge.tsx
export const ScaleBadge = ({ width }: { width: string }) => {
  return (
    <span className="text-[10px] font-mono text-neutral-400 px-2 py-0.5 border border-neutral-200 rounded-full bg-white">
      Scale: {width === "100%" ? "1.0" : (parseInt(width) / 1200).toFixed(2)}
    </span>
  );
};