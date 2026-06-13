// src/components/ui/PageHeader/index.tsx

import styles from './PageHeader.module.scss';

type PageHeaderProps = {
  enTitle: string;
  jpTitle: string;
  bgImage?: string;
  className?: string;
};

/**
 * 下層ページ共通ヘッダーコンポーネント
 * 外側から渡された bgImage を背景として設定します。
 */
export function PageHeader({
  enTitle,
  jpTitle,
  bgImage,
  className = '',
}: PageHeaderProps) {
  // 背景画像が渡された場合、CSSのスタイルオブジェクトを生成
  const headerStyle: React.CSSProperties = bgImage
    ? { backgroundImage: `url(${bgImage})` }
    : {};

  return (
    <div
      className={`${styles.container} ${className}`}
      style={headerStyle}
    >
      <div className={styles.overlay}></div>
      <div className={styles.inner}>
        <span className={styles.enTitle}>{enTitle}</span>
        <h1 className={styles.jpTitle}>{jpTitle}</h1>
      </div>
    </div>
  );
}
