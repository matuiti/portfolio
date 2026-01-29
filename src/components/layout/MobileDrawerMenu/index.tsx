// src/components/layout/MobileDrawerMenu/index.tsx

type MobileDrawerMenuProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const MobileDrawerMenu = ({
  isOpen,
  onClose,
}: MobileDrawerMenuProps) => {
  if (!isOpen) return null; // 閉じている時は何も表示しない

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <nav className="relative w-64 h-full bg-white">
        <button onClick={onClose}>閉じる</button>
        {/* メニュー項目 */}
      </nav>
    </div>
  );
};
