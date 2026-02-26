// src/components/ui/Breadcrumbs/index.tsx
import Link from "next/link";
import { KeyboardArrowRight } from "@/components/ui/Icons";
import styles from "./Breadcrumbs.module.scss";

/**
 * アイテムの型定義（規約により type を使用 [4]）
 */
type BreadcrumbItem = {
  label: string;
  href?: string; // 現在のページなど、リンクが不要な場合は省略
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
};

/**
 * 下層ページ共通パンくずリストコンポーネント
 * 階層に応じて動的にアイテムを表示し、セパレーターを挿入します。
 */
export const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
  return (
    <nav
      aria-label="Breadcrumb"
      className={`${styles.container} section-padding-x`}
    >
      <ol className={styles.list}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={`${item.label}-${index}`} className={styles.item}>
              {!isLast && item.href ? (
                <Link href={item.href} className={styles.link}>
                  {item.label}
                </Link>
              ) : (
                <span className={styles.current} aria-current="page">
                  {item.label}
                </span>
              )}

              {/* 最後の要素以外にアローアイコンを表示 [2, 3] */}
              {!isLast && (
                <span className={styles.separator} aria-hidden="true">
                  <KeyboardArrowRight size="sm" color="gray" />
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
