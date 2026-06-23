'use client';
import { scrollToTop } from '@/lib/utility/scrollToTop';
import { BaseTag } from '../BaseTag';
import styles from './CategoryList.module.css';

type CategoryItem<T> = {
  label: string;
  id: T;
};

type CategoryListProps<T> = {
  items: CategoryItem<T>[];
  selected: T;
  onChange: (id: T) => void;
  counts?: Record<string, number>;
  className?: string;
};

export function CategoryList<T extends string>({
  items,
  selected,
  onChange,
  counts = {},
  className = '',
}: CategoryListProps<T>) {
  const handleClick = (id: T) => {
    onChange(id);
    scrollToTop();
  };
  return (
    <nav className={`${styles.nav} ${className}`} aria-label='カテゴリー選択'>
      <ul className={styles.list}>
        {items.map((item) => {
          const count = counts[item.id] ?? 0;
          const isActive = selected === item.id;

          // 件数0のカテゴリーは非表示
          if (item.id !== 'all' && count === 0) return null;

          return (
            <li key={item.id}>
              <BaseTag
                shape='tab'
                size='long'
                isActive={isActive}
                count={count}
                showCount={count > 0}
                onClick={() => handleClick(item.id)}
              >
                {item.label}
              </BaseTag>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
