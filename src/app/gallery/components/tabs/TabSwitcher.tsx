// ここから装飾・補助的な UI

// 15. TabSwitcher
// 説明 / コード / プレビューの切り替え。
// - コア機能ではない
// - モーダルと一覧が完成してからでOK

// src/app/gallery/components/tabs/TabSwitcher.tsx

// タブの型を明示的に定義
export type GalleryTab = "description" | "code" | "preview";

type TabSwitcherProps = {
  activeTab: GalleryTab;
  onTabChange: (tab: GalleryTab) => void;
}

export const TabSwitcher = ({ activeTab, onTabChange }: TabSwitcherProps) => {
  const tabs: { id: GalleryTab; label: string; isMobileOnly?: boolean; icon: React.ReactNode }[] = [
    { id: "description", label: "説明", icon: (/* 省略 */ <svg>...</svg>) },
    { id: "code", label: "コード", icon: (/* 省略 */ <svg>...</svg>) },
    { id: "preview", label: "プレビュー", isMobileOnly: true, icon: (/* 省略 */ <svg>...</svg>) },
  ];

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