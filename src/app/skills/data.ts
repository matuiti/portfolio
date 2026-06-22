const PAGE_HEADER_IMAGE_PATH = '/assets/images/common/bg-page-header.jpg';

export const PAGE_HEADER_DATA = {
  jpTitle: 'スキル',
  enTitle: 'SKILLS',
  bgiPath: PAGE_HEADER_IMAGE_PATH,
} as const;

export const breadcrumbItems = [{ label: 'トップ', href: '/' }, { label: 'スキル' }];

export const description = `
ディレクトリ構造・コンポーネントの分割・データ管理などの設計を状況に応じて思考追求するが好きです。
フロントエンド領域を中心に据えつつも周辺領域の知識探求も進めています。
以下の各カードは関連実績へジャンプ可能ですので、筆者のレベル感の把握にお役立てください。
`.trim();