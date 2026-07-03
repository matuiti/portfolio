import { GALLERY_TABS } from '@/gallery/data';
import { TabItem, TabType } from '@/types/gallery';

type TabSwitcherProps = {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
};

export const TabSwitcher = ({ activeTab, onTabChange }: TabSwitcherProps) => {
  const tabs: readonly TabItem[] = GALLERY_TABS;
  return (
    <div className='relative flex gap-1.25 py-2 px-1.5 bg-light-gray rounded-lg w-full'>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`
            relative z-2 flex-1 flex items-center justify-center py-1.5 rounded-lg font-bold transition-all duration-200
            ${tab.id === 'preview' ? 'tablet:hidden' : ''}
            ${activeTab === tab.id ? 'text-black bg-white rounded-lg shadow-gallery-card-tab' : 'text-dark-gray tablet:hover:text-black tablet:hover:bg-white tablet:hover:var(--opacity-hover) tablet:hover:cursor-pointer'}
          `}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};
