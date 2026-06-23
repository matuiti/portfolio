'use client';
import { BaseTag } from '@/components/ui/BaseTag';
import { WORK_CATEGORIES } from '@/data/works';
import { WorkCategory } from '@/types/work';

type CategoryTabsProps = {
  activeCategory: WorkCategory;
  onCategoryChange: (category: WorkCategory) => void;
};

export const CategoryTabs = ({
  activeCategory,
  onCategoryChange,
}: CategoryTabsProps) => {
  return (
    <div className='flex flex-wrap items-center gap-[calc(10/16*1rem)]'>
      {WORK_CATEGORIES.map((cat) => (
        <BaseTag
          key={cat.id}
          shape='tab'
          size='short'
          isActive={activeCategory === cat.id}
          onClick={() => onCategoryChange(cat.id)}
        >
          {cat.label}
        </BaseTag>
      ))}
    </div>
  );
};
