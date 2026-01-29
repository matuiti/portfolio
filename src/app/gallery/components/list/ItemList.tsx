// src/app/gallery/components/list/ItemList.tsx
"use client";

import { UIPart } from "@/gallery/_types/ui-part";
import { Item } from "./Item";

type ItemListProps = {
  items: UIPart[];
  onItemClick: (item: UIPart) => void;
};

export const ItemList = ({ items, onItemClick }: ItemListProps) => {
  return (
    <div className="flex flex-col gap-10 lg:gap-16">
      {items.map((item) => (
        <Item key={item.id} item={item} onExpand={onItemClick} />
      ))}
    </div>
  );
};
