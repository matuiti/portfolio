'use client';
import { NAV_ITEMS } from '@/data/navigation';
import { MobileMenuItem } from '@/components/ui/MenuItem';
import { ArrowRight, GitHub, Mail, Close } from '@/components/ui/Icons';
import { SubButton } from '@/components/ui/Buttons/SubButton';
import { SITE_CONFIG } from '@/data/site';
import { useActiveNav } from '@/lib/hooks/useActiveNav';

type MobileDrawerMenuProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const MobileDrawerMenu = ({
  isOpen,
  onClose,
}: MobileDrawerMenuProps) => {
  const { checkActive } = useActiveNav();

  return (
    <div
      className={`fixed inset-0 z-drawer ${
        isOpen ? 'visible' : 'invisible pointer-events-none'
      }`}
    >
      {/* overlay */}
      <div
        className={`absolute inset-0 bg-menu-backdrop backdrop-blur-default transition-all duration-500 ease-in ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />
      {/* 本体 */}
      <div
        // メニュー内の操作がオーバーレイに伝わらないようにする
        onClick={(e) => e.stopPropagation()}
        className={`min-h-svh section-padding-x pb-10 absolute top-0 right-0 w-full max-w-mobile-drawer-max-w bg-white shadow-default flex flex-col justify-start transition-all duration-700 ease ${
          isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
        }`}
      >
        <div className='flex items-center justify-end min-h-header-mini mb-[calc(20/16*1rem)]'>
          <button type='button' onClick={onClose} aria-label='メニューを閉じる'>
            <Close />
          </button>
        </div>
        <nav className='overflow-y-auto'>
          <ul className='flex flex-col overflow-hidden'>
            {NAV_ITEMS.map((item) => {
              const isActive = checkActive(item.href);
              return (
                <li
                  key={item.href}
                  className={`group flex items-center justify-between first:pt-[calc(17/16*1rem)] -mb-px py-4 pl-4 border-b first:border-t border-medium-gray ${
                    !item.isPublished ? 'cursor-not-allowed' : ''
                  }`}
                >
                  <MobileMenuItem
                    label={item.label}
                    href={item.href}
                    isPublished={item.isPublished}
                    isActive={isActive}
                    onClick={() => {
                      if (item.isPublished) onClose();
                    }}
                  />
                  <ArrowRight isPublished={item.isPublished} />
                </li>
              );
            })}
          </ul>
        </nav>
        <div className='mt-5 flex gap-x-2.5 justify-end'>
          <SubButton
            href={SITE_CONFIG.links.github}
            leftIcon={GitHub}
            target='_blank'
            rel='noopener noreferrer'
          >
            GitHub
          </SubButton>
          <SubButton
            href={SITE_CONFIG.links.contact}
            leftIcon={Mail}
            onClick={onClose}
          >
            Contact
          </SubButton>
        </div>
      </div>
    </div>
  );
};
