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
 * プレビューパネル内の設定
 */
export const PREVIEW_PANEL_SETTINGS = {
  VIEWPORTS: [
    { label: "SP", width: 375 },
    { label: "TAB", width: 768 },
    { label: "PC", width: 1280 },
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
  NO_RESULTS_DEFAULT: "該当するアイテムがありません。",
  EMPTY_HINT: "条件をクリアするか、別のキーワードを試してみてください。",
  RESET_BUTTON_ALL: "フィルターをリセット",
  RESET_BUTTON_TAG: "タグをリセットする",
} as const;

/**
 * ギャラリー内で使用するタブの基本設定
 */
export const GALLERY_TABS = [
  { id: "description", label: "説明", icon: <svg>...</svg> },
  { id: "code", label: "コード", icon: <svg>...</svg> },
  {
    id: "preview",
    label: "プレビュー",
    isMobileOnly: true,
    icon: <svg>...</svg>,
  },
] as const satisfies readonly TabItem[];
