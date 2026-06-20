import styles from './PageHeader.module.css';

type PageHeaderProps = {
  enTitle: string;
  jpTitle: string;
  bgiPath?: string;
  className?: string;
};

export function PageHeader({
  enTitle,
  jpTitle,
  bgiPath,
  className = '',
}: PageHeaderProps) {
  const headerStyle: React.CSSProperties = bgiPath
    ? { backgroundImage: `url(${bgiPath})` }
    : {};
  return (
    <div className={`${styles.container} ${className}`} style={headerStyle}>
      <div className={styles.overlay}></div>
      <div className={styles.inner}>
        <span className={styles.enTitle}>{enTitle}</span>
        <h1 className={styles.jpTitle}>{jpTitle}</h1>
      </div>
    </div>
  );
}
