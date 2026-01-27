// src/app/gallery/components/ui/DifficultyBadge.tsx

import { UIPart } from "@/types/gallery/ui-part";

type DifficultyConfig = {
  label: string;
  color: string;
  dots: number;
};

const DIFFICULTY_MAP: Record<UIPart["difficulty"], DifficultyConfig> = {
  basic: {
    label: "Basic",
    color: "text-emerald-600 bg-emerald-50 border-emerald-100",
    dots: 1,
  },
  advanced: {
    label: "Advanced",
    color: "text-blue-600 bg-blue-50 border-blue-100",
    dots: 2,
  },
  expert: {
    label: "Expert",
    color: "text-rose-600 bg-rose-50 border-rose-100",
    dots: 3,
  },
} as const;

type DifficultyBadgeProps = {
  level: UIPart["difficulty"];
};

export const DifficultyBadge = ({ level }: DifficultyBadgeProps) => {
  // 定義外が来ても安心なようにフォールバック
  const current = DIFFICULTY_MAP[level] || DIFFICULTY_MAP.basic;

  return (
    <div
      className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-full border ${current.color} transition-all duration-300`}
    >
      <div className="flex gap-0.5">
        {[...Array(3)].map((_, i) => (
          <span
            key={i}
            className={`w-1 h-1 rounded-full ${
              i < current.dots ? "bg-current" : "bg-current/20"
            }`}
          />
        ))}
      </div>
      <span className="text-[10px] font-black uppercase tracking-wider">
        {current.label}
      </span>
    </div>
  );
};
