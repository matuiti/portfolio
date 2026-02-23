// src/components/ui/TagFilters/index.tsx
"use client";

import React from "react";
import styles from "./TagFilters.module.scss";

type TagFiltersProps = {
  tags: string[];
  selectedTags: string[];
  onToggle: (tag: string) => void;
  className?: string;
};

/**
 * 共通タグ選択フィルター
 * WORKS / GALLERY のタグ一覧を表示。
 */
export function TagFilters({
  tags,
  selectedTags,
  onToggle,
  className = "",
}: TagFiltersProps) {
  return (
    <div className={`${styles.container} ${className}`}>
      {tags.map((tag) => {
        const isActive = selectedTags.includes(tag);
        return (
          <button
            key={tag}
            type="button"
            onClick={() => onToggle(tag)}
            className={`${styles.tag} ${isActive ? styles.isActive : ""}`}
            aria-pressed={isActive}
          >
            #{tag}
          </button>
        );
      })}
    </div>
  );
}
