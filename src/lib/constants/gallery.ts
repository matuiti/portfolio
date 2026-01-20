// src/lib/constants/gallery.ts

/**
 * ギャラリー全体の基本設定
 */
export const GALLERY_SETTINGS = {
  ITEMS_PER_PAGE: 12,
  DEFAULT_CATEGORY: "all" as const,
} as const;

/**
 * プレビューモーダル内の制限値
 */
export const PREVIEW_SETTINGS = {
  MIN_WIDTH: 350,
  MAX_WIDTH: 1920,
  DEFAULT_WIDTH: 1200,
} as const;

/**
 * ギャラリー内で使用する文言
 */
export const GALLERY_MESSAGES = {
  NO_RESULTS_DEFAULT: "該当するアイテムがありません。",
  EMPTY_HINT: "条件をクリアするか、別のキーワードを試してみてください。",
  RESET_BUTTON_ALL: "フィルターをリセット",
  RESET_BUTTON_TAG: "タグをリセットする",
} as const;
