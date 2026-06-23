import { Category, TabItem, TagGroup } from '@/gallery/types';

/**
 * ギャラリー全体の基本設定
 */
export const GALLERY_SETTINGS = {
  ITEMS_PER_PAGE: 4,
  DEFAULT_CATEGORY: 'all',
} as const;

/**
 * プレビューパネル内の設定
 */
export const PREVIEW_PANEL_SETTINGS = {
  VIEWPORTS: [
    { label: 'SP', width: 375 },
    { label: 'TAB', width: 768 },
    { label: 'PC', width: 1280 },
  ],
  DEFAULT_WIDTH: 1280,
} as const;

/**
 * プレビューモーダル内の設定
 */
export const PREVIEW_MODAL_SETTINGS = {
  MIN_WIDTH: 350,
  MAX_WIDTH: 1920,
  DEFAULT_WIDTH: 1200,
} as const;

/**
 * ギャラリー内で使用する文言
 */
export const GALLERY_MESSAGES = {
  NO_RESULTS_DEFAULT: '該当するアイテムがありません。',
  EMPTY_HINT: '条件をクリアするか、別のキーワードを試してみてください。',
  RESET_BUTTON_ALL: 'フィルターをリセット',
  RESET_BUTTON_TAG: 'タグをリセットする',
} as const;

/**
 * ギャラリー内で使用するタブの基本設定
 */
export const GALLERY_TABS = [
  { id: 'description', label: '説明' },
  { id: 'code', label: 'コード' },
  {
    id: 'preview',
    label: 'プレビュー',
    isMobileOnly: true,
  },
] as const satisfies readonly TabItem[];

const PAGE_HEADER_IMAGE_PATH = '/assets/images/common/bg-page-header.jpg';

export const PAGE_HEADER_DATA = {
  jpTitle: 'UIギャラリー',
  enTitle: 'GALLERY',
  bgiPath: PAGE_HEADER_IMAGE_PATH,
} as const;

export const CATEGORIES: { id: Category; label: string }[] = [
  { id: 'all', label: 'すべて' },
  { id: 'button', label: 'ボタン' },
  { id: 'card', label: 'カード' },
  { id: 'form', label: 'フォーム' },
  { id: 'modal', label: 'モーダル' },
  { id: 'navigation', label: 'ナビゲーション' },
  { id: 'list', label: 'リスト / テーブル' },
  { id: 'loading', label: 'ローディング' },
  { id: 'transition', label: 'トランジション' },
  { id: 'scroll', label: 'スクロール演出' },
  { id: 'layout', label: 'レイアウト' },
  { id: 'other', label: 'その他' },
] as const;

export const TAG_GROUPS: Record<string, TagGroup> = {
  motion: {
    label: '動き',
    icon: '✨',
    tags: [
      'ホバー',
      'アニメーション',
      'トランジション',
      'スクロール演出',
      'マイクロインタラクション',
    ],
  },
  style: {
    label: 'スタイル',
    icon: '🎨',
    tags: [
      'グラデーション',
      'ガラス風',
      '影',
      'ぼかし',
      'ダーク',
      'ライト',
      '3D',
      'ニューモーフィズム',
    ],
  },
  implementation: {
    label: '実装方法',
    icon: '⚙️',
    tags: [
      'CSSのみ',
      'CSS + Vanilla JS',
      'SCSS使用',
      'GSAP',
      'ScrollTrigger',
      'anime.js',
      'Three.js',
      'Lottie',
      'Canvas',
      'SVG',
      'WebGL',
      'IntersectionObserver',
      'CSS Grid',
      'Flexbox',
    ],
  },
  utility: {
    label: '特徴',
    icon: '🔧',
    tags: [
      'レスポンシブ',
      'アクセシブル',
      'ミニマル',
      'モダン',
      '軽量',
      'パフォーマンス重視',
    ],
  },
} as const;
