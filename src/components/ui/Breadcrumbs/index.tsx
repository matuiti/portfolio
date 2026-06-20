import { KeyboardArrowRight } from "@/components/ui/Icons";
import Link from "next/link";
import styles from "./Breadcrumbs.module.css";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
};

export const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
  const lastIndex = items.length ? items.length - 1 : 0;
  
  return (
    <nav aria-label="Breadcrumb" className={styles.container}>
      <ol className={styles.list}>
        {items.map((item, index) => {
          const isLast = index === lastIndex;
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
