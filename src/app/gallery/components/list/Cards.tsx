'use client';

import { UIPart } from '@/gallery/types/type';
import { Card } from './Card';

type CardsProps = {
  items: UIPart[];
  onItemClick: (item: UIPart) => void;
};

export const Cards = ({ items, onItemClick }: CardsProps) => {
  return (
    <div className='flex flex-col gap-10 small:gap-16'>
      {items.map((item) => (
        <Card key={item.id} item={item} onExpand={onItemClick} />
      ))}
    </div>
  );
};
