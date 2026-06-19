'use client';
import { BaseTag } from '../BaseTag';
import styles from './TagFilters.module.css';

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
  className = '',
}: TagFiltersProps) {
  return (
    <div className={`${styles.container} ${className}`}>
      {tags.map((tag) => {
        const isActive = selectedTags.includes(tag);

        return (
          <BaseTag
            key={tag}
            shape='tag'
            hasHash={true}
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
