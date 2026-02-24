// src/components/ui/TagFilters/index.tsx
"use client";

import React from "react";
import { tv } from "tailwind-variants";
import styles from "./TagFilters.module.scss";

type TagFiltersProps = {
  tags: string[];
  selectedTags: string[];
  onToggle: (tag: string) => void;
  className?: string;
};

const tagStyles = tv({
  base: styles.tag,
  variants: {
    isActive: {
      true: styles.isActive,
      false: "",
    },
  },
});

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
            className={tagStyles({ isActive })}
            aria-pressed={isActive}
          >
            # {tag}
          </button>
        );
      })}
    </div>
  );
}