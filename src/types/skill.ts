export type SkillLinkType = 'project' | 'github';
export type LabelType = '基礎レベル' | '実務レベル' | '精通レベル';
export type LabelDescription = Record<LabelType, string>;

export type SkillLink = {
  url: string;
  type: SkillLinkType;
  name?: string;
};

export type SkillItem = {
  name: string;
  label: LabelType;
  description: string;
  links?: SkillLink[];
};

export type AllSkills = {
  title: string;
  items: SkillItem[];
};
