// src/app/(home)/components/SkillsSection/types.ts
export type HighlightSkillItem = {
  name: string;
  percentage: number;
};

export type HighlightSkillGroup = {
  title: string;
  items: HighlightSkillItem[];
};
