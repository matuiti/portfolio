// src/types/skill.ts

export type SkillItem = {
  name: string;
  level: number; // 0-100の数値
};

export type SkillCategory = {
  id: string;
  title: string; // 「Front-end」など
  skills: SkillItem[];
};
