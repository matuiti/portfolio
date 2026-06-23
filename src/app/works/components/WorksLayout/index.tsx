import { WorksSidebar } from '../WorksSidebar';
import { SearchWorksDrawer } from '@/works/components/SearchWorksDrawer';

type WorksLayoutProps = {
  children: React.ReactNode;
};

export function WorksLayout({ children }: WorksLayoutProps) {
  return (
    <div className='relative'>
      <div className='flex flex-row max-w-[calc(1280/16*1rem)] m-auto'>
        <WorksSidebar />
        <main className='flex-1 min-w-0'>{children}</main>
      </div>
      <SearchWorksDrawer />
    </div>
  );
}
