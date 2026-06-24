const PAGE_HEADER_IMAGE_PATH = '/assets/images/common/bg-page-header.jpg';

export const PAGE_HEADER_DATA = {
  jpTitle: 'プライバシーポリシー',
  enTitle: 'PRIVACY POLICY',
  bgiPath: PAGE_HEADER_IMAGE_PATH,
} as const;

export const breadcrumbItems = [
  { label: 'トップ', href: '/' },
  { label: 'プライバシーポリシー' },
];