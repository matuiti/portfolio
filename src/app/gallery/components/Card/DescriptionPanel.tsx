import { GalleryUIPart } from '@/types/gallery';

export const DescriptionPanel = ({ item }: { item: GalleryUIPart }) => {
  return (
    <div className='flex flex-col h-full w-full bg-white rounded-lg border border-medium-gray overflow-hidden'>
      <div className='flex-1 overflow-auto custom-scrollbar py-4 px-2.5 pb-14 tablet:px-5 [mask-image:linear-gradient(to_bottom,black_80%,transparent_100%)]'>
        <p className='text-[calc(16/16*1rem)]'>{item.description}</p>
      </div>
    </div>
  );
};
