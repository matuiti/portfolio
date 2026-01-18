// 13. ViewportSlider
// 350〜1920 のレンジスライダー。
// - モーダルが動いてからで十分
// - UI とロジックの結合が強いので後半でOK

// src/app/gallery/components/modal/ViewportSlider.tsx
"use client";

interface ViewportSliderProps {
  value: number;
  onChange: (val: number) => void;
}

export const ViewportSlider = ({ value, onChange }: ViewportSliderProps) => {
  return (
    <div className="flex items-center gap-3 bg-neutral-50 px-3 py-1.5 rounded-full border border-neutral-200">
      <input
        type="range"
        min="350"
        max="1920"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-32 accent-blue-600 cursor-pointer"
      />
      <div className="flex items-center gap-1">
        <input
          type="number"
          min="350"
          max="1920"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-16 text-right bg-transparent border-none text-sm font-mono focus:ring-0 p-0"
        />
        <span className="text-xs text-neutral-400 font-mono">px</span>
      </div>
    </div>
  );
};