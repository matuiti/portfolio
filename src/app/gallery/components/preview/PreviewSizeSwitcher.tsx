// src/app/gallery/components/preview/PreviewSizeSwitcher.tsx
export const PreviewSizeSwitcher = ({
  currentWidth,
  onWidthChange,
}: {
  currentWidth: string;
  onWidthChange: (w: string) => void;
}) => {
  const sizes = [
    { label: "SP", value: "375px" },
    { label: "TAB", value: "768px" },
    { label: "FULL", value: "100%" },
  ];

  return (
    <div className="flex p-1 bg-neutral-200/50 rounded-lg">
      {sizes.map((s) => (
        <button
          key={s.label}
          onClick={() => onWidthChange(s.value)}
          className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all ${
            currentWidth === s.value
              ? "bg-white text-neutral-800 shadow-sm"
              : "text-neutral-500 hover:text-neutral-700"
          }`}
        >
          {s.label}
        </button>
      ))}
    </div>
  );
};
