// src/types/skill.ts

export type SkillLevelValue = 1 | 2 | 3 | 4 | 5;
export type SkillLinkType = "project" | "github" | "cert";

export type SkillLink = {
  label: string;
  url: string;
  type: SkillLinkType;
};

export type SkillItem = {
  name: string;
  level: SkillLevelValue;
  label: string;
  experience: string;
  description: string;
  links?: SkillLink[];
};

export type SkillCategory = {
  label: string;
  items: SkillItem[];
};

export type SkillGroup = {
  id: string;
  title: string;
  icon: string;
  categories: SkillCategory[];
};
