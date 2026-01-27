// src/lib/constants/gallery.ts

import { TabItem } from "@/types/gallery/tab";

/**
 * ギャラリー全体の基本設定
 */
export const GALLERY_SETTINGS = {
  ITEMS_PER_PAGE: 4,
  DEFAULT_CATEGORY: "all",
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

/**
 * ギャラリー内で使用するタブの基本設定
 */
export const GALLERY_TABS: TabItem[] = [
  { id: "description", label: "説明", icon: /* SVG */ <svg>...</svg> },
  { id: "code", label: "コード", icon: /* SVG */ <svg>...</svg> },
  { id: "preview", label: "プレビュー", isMobileOnly: true, icon: /* SVG */ <svg>...</svg> }
];