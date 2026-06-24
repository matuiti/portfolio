import { UIPart } from '@/gallery/types';

export const DescriptionPanel = ({ item }: { item: UIPart }) => {
  return (
    <div className='flex flex-col h-full w-full bg-white rounded-lg border border-medium-gray overflow-hidden'>
      <div className='flex-1 overflow-auto custom-scrollbar py-4 px-2.5 tablet:px-5 [mask-image:linear-gradient(to_bottom,black_80%,transparent_100%)]'>
        <p className='text-[calc(16/16*1rem)]'>{item.description}</p>
        {/* ぼかし確認用のダミーテキスト（必要に応じて） */}
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus omnis
        tenetur est, voluptatibus beatae nesciunt animi mollitia cum sint
        pariatur blanditiis cumque, ullam dicta provident dignissimos laborum
        debitis vero saepe? Lorem ipsum dolor sit, amet consectetur adipisicing
        elit. Ducimus omnis tenetur est, voluptatibus beatae nesciunt animi
        mollitia cum sint pariatur blanditiis cumque, ullam dicta provident
        dignissimos laborum debitis vero saepe? Lorem ipsum dolor sit, amet
        consectetur adipisicing elit. Ducimus omnis tenetur est, voluptatibus
        beatae nesciunt animi mollitia cum sint pariatur blanditiis cumque,
        ullam dicta provident dignissimos laborum debitis vero saepe? Lorem
        ipsum dolor sit, amet consectetur adipisicing elit. Ducimus omnis
        tenetur est, voluptatibus beatae nesciunt animi mollitia cum sint
        pariatur blanditiis cumque, ullam dicta provident dignissimos laborum
        debitis vero saepe? Lorem ipsum dolor sit, amet consectetur adipisicing
        elit. Ducimus omnis tenetur est, voluptatibus beatae nesciunt animi
        mollitia cum sint pariatur blanditiis cumque, ullam dicta provident
        dignissimos laborum debitis vero saepe? Lorem ipsum dolor sit, amet
        consectetur adipisicing elit. Ducimus omnis tenetur est, voluptatibus
        beatae nesciunt animi mollitia cum sint pariatur blanditiis cumque,
        ullam dicta provident dignissimos laborum debitis vero saepe? Lorem
        ipsum dolor sit, amet consectetur adipisicing elit. Ducimus omnis
        tenetur est, voluptatibus beatae nesciunt animi mollitia cum sint
        pariatur blanditiis cumque, ullam dicta provident dignissimos laborum
        debitis vero saepe?
        {/* スクロール確認用の余白（必要に応じて） */}
        <div className='h-200' />
      </div>
    </div>
  );
};
