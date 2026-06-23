'use client';
import { useUIStore } from '@/lib/hooks/useUIStore';
import { GallerySidebar } from '../GallerySidebar';
import { Filtering } from '@/gallery/types';
import { SearchGalleryDrawer } from '../SearchGalleryDrawer';

type GalleryLayoutProps = {
  children: React.ReactNode;
  filtering: Filtering;
};

export function GalleryLayout({ children, filtering }: GalleryLayoutProps) {
  const { isSearchDrawerOpen, setSearchDrawerOpen } = useUIStore();

  return (
    <div className='flex flex-col small:flex-row gap-8'>
      <aside className='hidden small:block w-80 shrink-0'>
        <GallerySidebar filtering={filtering} />
      </aside>
      <main className='flex-1 min-w-0'>{children}</main>
      <SearchGalleryDrawer
        isOpen={isSearchDrawerOpen}
        onClose={() => setSearchDrawerOpen(false)}
        filtering={filtering}
      />
    </div>
  );
}
