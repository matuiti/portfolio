// src/components/ui/CategoryList/index.tsx
"use client";

import React from "react";
import { tv } from "tailwind-variants";
import styles from "./CategoryList.module.scss";

// 規約：interfaceを禁止し、typeで定義 [cite: 425]
type CategoryItem<T> = {
  label: string;
  value: T;
};

type CategoryListProps<T> = {
  items: CategoryItem<T>[];
  selected: T;
  onChange: (value: T) => void;
  counts?: Record<string, number>;
  className?: string;
};

// スタイリングのバリアント管理 [cite: 166, 167]
const categoryItemStyles = tv({
  base: styles.button,
  variants: {
    isActive: {
      true: styles.isActive,
      false: "",
    },
  },
});

export function CategoryList<T extends string>({
  items,
  selected,
  onChange,
  counts = {},
  className = "",
}: CategoryListProps<T>) {
  return (
    <nav className={`${styles.nav} ${className}`} aria-label="カテゴリー選択">
      <ul className={styles.list}>
        {items.map((item) => {
          const count = counts[item.value] ?? 0;
          const isActive = selected === item.value;

          // 見た目の制御ロジック：件数0のカテゴリーは非表示（共通仕様準拠） [cite: 220]
          if (item.value !== ("all" as T) && count === 0) return null;

          return (
            <li key={item.value}>
              <button
                type="button"
                onClick={() => onChange(item.value)}
                className={categoryItemStyles({ isActive })}
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