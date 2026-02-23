// src/components/ui/CategoryList/index.tsx
"use client";

import React from "react";
import styles from "./CategoryList.module.scss";

// アイテムの型もジェネリックに変更
type CategoryItem<T extends string> = {
  label: string;
  value: T;
};

type CategoryListProps<T extends string> = {
  items: CategoryItem<T>[];
  selected: T;
  onChange: (value: T) => void; // any を排除し、T 型を保証
  counts?: Record<string, number>;
  className?: string;
};

/**
 * 共通カテゴリー選択リスト
 * ジェネリクスにより、WORKS / GALLERY それぞれの固有の型を安全に受け入れます。
 */
export function CategoryList<T extends string>({
  items,
  selected,
  onChange,
  counts = {},
  className = "",
}: CategoryListProps<T>) {
  return (
    <nav className={`${styles.nav} ${className}`}>
      <ul className={styles.list}>
        {items.map((item) => {
          const count = counts[item.value] ?? 0;
          const isActive = selected === item.value;

          // 「すべて」以外で件数が0の場合は表示しない（共通仕様書準拠）
          if (item.value !== ("all" as T) && count === 0) return null;

          return (
            <li key={item.value} className={styles.item}>
              <button
                type="button"
                onClick={() => onChange(item.value)}
                className={`${styles.button} ${isActive ? styles.isActive : ""}`}
                aria-current={isActive ? "page" : undefined}
              >
                <span className={styles.label}>{item.label}</span>
                {count > 0 && <span className={styles.count}>{count}</span>}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
