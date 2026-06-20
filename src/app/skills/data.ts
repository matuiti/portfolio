const PAGE_HEADER_IMAGE_PATH = '/assets/images/common/bg-page-header.jpg';

const PAGE_HEADER_DATA = {
  jpTitle: 'スキル',
  enTitle: 'SKILLS',
  bgiPath: PAGE_HEADER_IMAGE_PATH,
} as const;

const breadcrumbItems = [{ label: 'トップ', href: '/' }, { label: 'スキル' }];

const description = `
ディレクトリ構造・コンポーネントの分割・データ管理などの設計を状況に応じて思考追求するが好きです。
全体のスキル感としては、フロントエンド領域を中心として周辺領域の知識探求も継続実行しています。

以下の各スキルカードは関連実績へジャンプ可能ですので、筆者のレベル感把握にお役立てください。
`.trim();

export { PAGE_HEADER_DATA, breadcrumbItems, description };
