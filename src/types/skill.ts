// src/types/skill.ts

export type SkillLinkType = "project" | "github" | "cert";
export type labeType = "基礎" | "実務レベル" | "精通";

export type SkillLink = {
  url: string;
  type: SkillLinkType;
  name?: string;
};

export type SkillItem = {
  name: string;
  label: labeType;
  description: string;
  links?: SkillLink[];
};

export type SkillGroup = {
  title: string;
  items: SkillItem[];
};