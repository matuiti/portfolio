// src/app/gallery/components/list/ItemList.tsx
"use client";

import { UIPart } from "@/types/gallery/ui-part";
import { ItemCard } from "./ItemCard";

type ItemListProps = {
  items: UIPart[];
  onItemClick: (item: UIPart) => void; // page.tsxのプロパティ名に合わせる
}

export const ItemList = ({ items, onItemClick }: ItemListProps) => {
  return (
    // カラム数は常に1。gapを大きめにとることで、1つ1つの独立性を高めます。
    <div className="flex flex-col gap-10 lg:gap-16">
      {items.map((item) => (
        <ItemCard 
          key={item.id} 
          item={item} 
          onExpand={onItemClick} 
        />
      ))}
    </div>
  );
};
