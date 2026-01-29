// src/components/layout/Header/index.tsx

type HeaderProps = {
  onMenuOpen: () => void;
};

export const Header = ({ onMenuOpen }: HeaderProps) => {
  return (
    <header className="...">
      {/* 他のコンテンツ */}
      <button onClick={onMenuOpen}>メニューを開く</button>
    </header>
  );
};
