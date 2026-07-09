import {
  ServiceWeb,
  ServiceResponsive,
  ServiceCMS,
  ServicePerformance,
} from '@/components/ui/Icons';
import { ElementType } from 'react';

export type ServiceItem = {
  id: string;
  title: string;
  description: string;
  Icon: ElementType;
};

export const SERVICES: ServiceItem[] = [
  {
    id: 'service-01',
    title: '新規スクラッチ制作 / コーディング',
    description: `デザインの忠実な再現に加え、SEOやアクセシビリティ、保守性を考慮したセマンティックなマークアップを徹底。Next.jsなどのモダン環境からHTML/CSS（Sass）まで幅広く対応し、全デバイスでの最適なレスポンシブ表示を標準で実装します。`,
    Icon: ServiceWeb,
  },
  {
    id: 'service-02',
    title: '既存サイトの長期保守・改修サポート',
    description: `他者が設計した既存のコードベースを正確に読み解き、元の設計思想を壊さずに安全な改修・リファクタリングを行います。30サイト超の長期保守実績をベースに、複数ディレクターからの並行タスクも確実な品質とスピードで処理します。`,
    Icon: ServiceResponsive,
  },
  {
    id: 'service-03',
    title: 'WordPress / CMS構築',
    description: `オリジナルテーマ開発から、仕組みに沿ったテンプレート分割、カスタム投稿タイプの設定まで独力で対応。実装者不在でも日々の運用がスムーズに回るよう管理画面のカスタマイズまで配慮し、数年単位の長期運用に耐えうるサイトに仕立てます。`,
    Icon: ServiceCMS,
  },
  {
    id: 'service-04',
    title: 'パフォーマンス / 外部連携最適化',
    description: `不要なJavaScriptに頼らない描画速度の向上など、本質的なパフォーマンス最適化を行います。また、楽天トラベルやB-Cartといった独自プラットフォームの制約・仕様を理解した上での、システムに影響を与えない安全な実装判断も得意としています。`,
    Icon: ServicePerformance,
  },
];
