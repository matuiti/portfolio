// src/types/privacy-policy.ts

export type PrivacyPolicySection = {
  id: string;
  num: string;
  title: string;
  content: string;
  list?: string[]; // 箇条書きがある場合
};

export type PrivacyPolicyData = {
  lastUpdated: string;
  sections: PrivacyPolicySection[];
};
