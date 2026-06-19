'use client';
import { BaseTag } from '@/components/ui/BaseTag';
import { WORK_CATEGORIES } from '@/data/works';
import { WorkFilterCategory } from '@/types/work';

type CategoryTabsProps = {
  activeCategory: WorkFilterCategory;
  onCategoryChange: (category: WorkFilterCategory) => void;
};

export const CategoryTabs = ({
  activeCategory,
  onCategoryChange,
}: CategoryTabsProps) => {

  return (
    <div className='flex flex-wrap items-center gap-[calc(10/16*1rem)]'>
      {WORK_CATEGORIES.map((cat) => (
        <BaseTag
          key={cat.value}
          shape='tab'
          size='short'
          isActive={activeCategory === cat.value}
          onClick={() => onCategoryChange(cat.value)}
        >
          {cat.label}
        </BaseTag>
      ))}
    </div>
  );
};
