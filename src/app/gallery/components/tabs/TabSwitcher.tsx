// src/app/gallery/components/tabs/TabSwitcher.tsx
import { GALLERY_TABS } from "@/lib/constants/gallery";
import { TabType, TabItem } from "@/types/gallery/tab";

type TabSwitcherProps = {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
};

export const TabSwitcher = ({ activeTab, onTabChange }: TabSwitcherProps) => {
  const tabs: TabItem[] = GALLERY_TABS;

  return (
    <div className="relative flex p-1.5 bg-neutral-100 rounded-2xl w-full lg:max-w-[240px]">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`
            relative z-10 flex-1 flex items-center justify-center gap-2 py-2 text-[11px] font-bold transition-all duration-300
            ${tab.isMobileOnly ? "lg:hidden" : ""}
            ${activeTab === tab.id ? "text-blue-600" : "text-neutral-500 hover:text-neutral-700"}
          `}
        >
          {tab.label}
          {activeTab === tab.id && (
            <div className="absolute inset-0 bg-white rounded-xl shadow-sm -z-10 animate-in zoom-in-95 duration-200" />
          )}
        </button>
      ))}
    </div>
  );
};
