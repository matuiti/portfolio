// src/components/ui/PageHeader/index.tsx

import React from "react";
import styles from "./PageHeader.module.scss";

type PageHeaderProps = {
  enTitle: string;
  jpTitle: string;
  bgImage?: string; // 背景画像のパス（例: /assets/images/common/bg.jpg）
  className?: string; // 追加のスタイルクラス（任意）
};

/**
 * 下層ページ共通ヘッダーコンポーネント
 * 外側から渡された bgImage を背景として設定します。
 */
export function PageHeader({
  enTitle,
  jpTitle,
  bgImage,
  className = "",
}: PageHeaderProps) {
  // 背景画像が渡された場合、CSSのスタイルオブジェクトを生成
  const headerStyle: React.CSSProperties = bgImage
    ? { backgroundImage: `url(${bgImage})` }
    : {};

  return (
    <div
      className={`${styles.container} ${className}`}
      style={headerStyle} // 背景画像を適用
    >
      <div className={styles.overlay}></div>
      <div className={styles.inner}>
        <span className={styles.enTitle}>{enTitle}</span>
        <h1 className={styles.jpTitle}>{jpTitle}</h1>
      </div>
    </div>
  );
}
