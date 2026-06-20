export type SkillLinkType = "project" | "github";
export type labelType = "基礎レベル" | "実務レベル" | "精通レベル";
export type labelDescription = Record<labelType, string>;

export type SkillLink = {
  url: string;
  type: SkillLinkType;
  name?: string;
};

export type SkillItem = {
  name: string;
  label: labelType;
  description: string;
  links?: SkillLink[];
};

export type SkillGroup = {
  title: string;
  items: SkillItem[];
};