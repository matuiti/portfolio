// src/components/ui/CategoryList/index.tsx
"use client";

import React from "react";
import styles from "./CategoryList.module.scss";
import { BaseTag } from "../BaseTag";

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
              <BaseTag
                shape="tab"
                size="long"
                isActive={isActive}
                count={count}
                showCount={count > 0}
                onClick={() => onChange(item.value)}
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