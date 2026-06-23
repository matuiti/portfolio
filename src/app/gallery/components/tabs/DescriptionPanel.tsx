import { UIPart } from '@/gallery/types/type';

export const DescriptionPanel = ({ item }: { item: UIPart }) => {
  return (
    <div className='flex flex-col h-full w-full bg-neutral-50/50 rounded-3xl border border-neutral-100 overflow-hidden'>
      <div className='flex-1 overflow-auto custom-scrollbar p-8 space-y-10'>
        <section className='animate-in fade-in slide-in-from-bottom-2 duration-500'>
          <p className='text-[15px] leading-relaxed text-neutral-600 font-medium'>
            {item.description}
          </p>
        </section>

        {/* スクロール確認用の余白（必要に応じて） */}
        <div className='h-4' />
      </div>
    </div>
  );
};
