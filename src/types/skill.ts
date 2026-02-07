// src/types/skill.ts

export type SkillLinkType = "project" | "github" | "cert";

export type SkillLink = {
  label: string;
  url: string;
  type: SkillLinkType;
};

export type SkillItem = {
  name: string;
  level: number;
  label: string;
  experience: string;
  description: string;
  links?: SkillLink[];
};

export type SkillCategory = {
  label: string;
  items: SkillItem[];
};

/**
 * モジュールからエクスポートされていなかったためエラーが出ていた型
 */
export type SkillGroup = {
  id: string;
  title: string;
  icon: string;
  categories: SkillCategory[];
};
