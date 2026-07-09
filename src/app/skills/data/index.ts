const PAGE_HEADER_IMAGE_PATH = '/assets/images/common/bg-page-header.jpg';

export const PAGE_HEADER_DATA = {
  jpTitle: 'スキル',
  enTitle: 'SKILLS',
  bgiPath: PAGE_HEADER_IMAGE_PATH,
} as const;

export const breadcrumbItems = [{ label: 'トップ', href: '/' }, { label: 'スキル' }];

export const description = `
モダン開発から長期保守まで、状況に応じた最適な品質を追求。
これまでの実践のプロセスで培ってきた、技術スタンスの一覧です。
`.trim();