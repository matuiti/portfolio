// src/app/(home)/components/SkillsSection/types.ts
export type SkillCardGaugeData = {
  name: string;
  percentage: number;
};

export type SkillCardData = {
  title: string;
  items: SkillCardGaugeData[];
};
