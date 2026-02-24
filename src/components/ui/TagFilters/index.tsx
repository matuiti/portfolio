// src/components/ui/TagFilters/index.tsx
"use client";

import React from "react";
import { BaseTag } from "../BaseTag";
import styles from "./TagFilters.module.scss";

type TagFiltersProps = {
  tags: string[];
  selectedTags: string[];
  onToggle: (tag: string) => void;
  className?: string;
};

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
          <BaseTag
            key={tag}
            shape="tag" // タグ形状（四角）を指定
            hasHash={true} // ハッシュ有りの余白設定を適用
            isActive={isActive}
            onClick={() => onToggle(tag)}
          >
            # {tag}
          </BaseTag>
        );
      })}
    </div>
  );
}