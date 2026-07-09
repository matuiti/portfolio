import { SkillCardData } from '../types';

// TOPページのスキルセクション専用

export const SKIIL_DESCRIPTION = `
0からのスクラッチ制作から他者の意図を読み解く安全な長期保守まで。
現場のニーズに高い解像度で応える、実践的な技術スタンスと対応スキルの一覧です。
`;

export const SKILL_CARDS_DATA: SkillCardData[] = [
  {
    title: 'フロントエンド基盤 / 保守・改修',
    infoItems: [
      { name: 'HTML / セマンティックマークアップ', percentage: 95 },
      { name: 'CSS / Sass / Tailwind CSS', percentage: 95 },
      { name: 'JavaScript（ES6+）', percentage: 90 },
      { name: 'WordPress（PHP）/ CMS構築', percentage: 80 },
    ],
  },
  {
    title: 'モダン開発 / 応用技術',
    infoItems: [
      { name: 'React / Next.js', percentage: 85 },
      { name: 'TypeScript', percentage: 85 },
      { name: 'アクセシビリティへの配慮', percentage: 80 },
      { name: 'jQuery（既存コード解析・改修）', percentage: 70 },
    ],
  },
  {
    title: 'リモートワーク / チーム開発環境',
    infoItems: [
      { name: 'Figma（デザインカンプ再現）', percentage: 95 },
      { name: 'Slack / Chatwork（確実な進捗共有）', percentage: 85 },
      { name: 'Git / GitHub（バージョン管理）', percentage: 80 },
      { name: '生成AI（効率的なコーディング）', percentage: 75 },
    ],
  },
];
