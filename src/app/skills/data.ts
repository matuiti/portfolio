const PAGE_HEADER_IMAGE_PATH = '/assets/images/common/bg-page-header.jpg';

const PAGE_HEADER_DATA = {
  jpTitle: 'スキル',
  enTitle: 'SKILLS',
  images: PAGE_HEADER_IMAGE_PATH,
  bgPath: `url(${PAGE_HEADER_IMAGE_PATH})`,
} as const;

const breadcrumbItems = [{ label: 'トップ', href: '/' }, { label: 'スキル' }];

const description = `
0→1のテンプレート設計から大規模改修まで、既存コードを壊さず迅速に適応する自走力が強みです。

直近では企業独自CMSの構築にて、デザイナー・エンジニアと密に連携し4テーマを同時完遂しました。
リモート環境でも仕様の行間を読み解き、保守性の高いコードで貴社の制作ラインを支える即戦力として貢献します。
`.trim();

export {
  PAGE_HEADER_DATA,
  breadcrumbItems,
  description,
};
