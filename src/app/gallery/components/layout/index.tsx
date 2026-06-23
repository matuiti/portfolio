import { GallerySidebar } from '../GallerySidebar';
import { SearchGalleryDrawer } from '../SearchGalleryDrawer';

type GalleryLayoutProps = {
  children: React.ReactNode;
};

export function GalleryLayout({ children }: GalleryLayoutProps) {
  return (
    <div className='relative'>
      <div className='flex flex-row max-w-[calc(1280/16*1rem)] m-auto'>
        <GallerySidebar />
        <main className='flex-1 min-w-0'>{children}</main>
      </div>
      <SearchGalleryDrawer />
    </div>
  );
}
