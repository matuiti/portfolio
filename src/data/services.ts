import {
  ServiceWeb,
  ServiceResponsive,
  ServiceCMS,
  ServicePerformance,
} from "@/components/ui/Icons";
import { ElementType } from "react";

export type ServiceItem = {
  id: string;
  title: string;
  description: string;
  Icon: ElementType;
};

export const SERVICES: ServiceItem[] = [
  {
    id: "service-01",
    title: "Webコーディング",
    description: `HTML/CSS/JavaScriptを用いた高品質なコーディングを提供します。
    レスポンシブ対応はもちろん、SEOやアクセシビリティにも配慮した実装を心がけています。`,
    Icon: ServiceWeb,
  },
  {
    id: "service-02",
    title: "レスポンシブ対応",
    description: `スマートフォン、タブレット、デスクトップなど、あらゆるデバイスで最適な表示を実現します。
モバイルファーストの設計で、快適なユーザー体験を提供します。`,
    Icon: ServiceResponsive,
  },
  {
    id: "service-03",
    title: "CMS構築",
    description: `WordPressをはじめとする各種CMSの構築・カスタマイズに対応。
管理しやすく、拡張性の高いサイト制作を実現します。`,
    Icon: ServiceCMS,
  },
  {
    id: "service-04",
    title: "パフォーマンス最適化",
    description: `ページ読み込み速度の改善、画像最適化、コードの圧縮など、サイトのパフォーマンス向上に取り組みます。ユーザー体験とSEOの両面から最適化を図ります。`,
    Icon: ServicePerformance,
  },
];
