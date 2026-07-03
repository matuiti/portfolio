import { SkillCardData } from '../types';

// スキルデータ（トップページ固有）
export const SKILL_CARDS_DATA: SkillCardData[] = [
  {
    title: 'WEBサイト',
    infoItems: [
      { name: 'HTML', percentage: 95 },
      { name: 'CSS / SASS', percentage: 95 },
      { name: 'JavaScript', percentage: 90 },
      { name: 'WordPress / PHP', percentage: 85 },
    ],
  },
  {
    title: 'ライブラリ、フレームワーク',
    infoItems: [
      { name: 'TypeScript', percentage: 85 },
      { name: 'Next.js / React', percentage: 85 },
      { name: 'TailwindCSS', percentage: 85 },
      { name: 'jQuery', percentage: 80 },
    ],
  },
  {
    title: 'ツール',
    infoItems: [
      { name: 'Figma', percentage: 85 },
      { name: 'Git / GitHub', percentage: 85 },
      { name: '生成AI', percentage: 85 },
      { name: 'Slack / Chatwork', percentage: 80 },
    ],
  },
];
