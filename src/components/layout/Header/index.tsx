'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { tv } from 'tailwind-variants';
import { usePathname } from 'next/navigation';
import { NAV_ITEMS, SEARCHABLE_PATHS } from '@/data/navigation';
import { useScrollThreshold } from '@/lib/hooks/useScrollThreshold';
import { HeaderMenuItem } from '@/components/ui/MenuItem';
import { Hamburger, SearchLarge } from '@/components/ui/Icons';
import { useStore } from '@/lib/store/useStore';
import LogoHeader from '@/components/ui/LogoHeader';
import { scrollToTop } from '@/lib/utility/scrollToTop';
import { useActiveNav } from '@/lib/hooks/useActiveNav';

export const headerStyles = tv({
  slots: {
    base: 'section-padding-x fixed top-0 left-0 flex items-center justify-center w-full min-h-header-mini small:min-h-header-small z-header transition-all duration-1000 ease-in',
    inner: 'container-center flex items-center justify-between',
    logoLink:
      'cursor-default tablet:cursor-pointer hover:opacity-hover transition-opacity w-[150px] small:w-[220px] h-auto duration-300 ease-in-out',
    ul: 'hidden small:flex items-center leading-normal gap-[calc(15.6/16*1rem)] mt-[calc(6/16*1rem)] mr-[calc(3/16*1rem)]',
    buttonWrapper: 'flex items-center gap-2.5 small:hidden',
  },
  variants: {
    isScrolled: {
      true: { base: 'backdrop-blur-default shadow-default' },
      false: { base: 'bg-white' },
    },
    isSearchablePage: {
      true: { base: 'shadow-default' },
    },
  },
  defaultVariants: {
    isScrolled: false,
    isSearchablePage: false,
  },
});

type HeaderProps = {
  onMenuOpen: () => void;
};

export const Header = ({ onMenuOpen }: HeaderProps) => {
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const { setPhase, setSearchDrawerOpen } = useStore();
  const { checkActive } = useActiveNav();

  useEffect(() => {
    if (!isHomePage) setPhase('ready');
  }, [isHomePage, setPhase]);

  const [dynamicThreshold, setDynamicThreshold] = useState<number | null>(null);

  useEffect(() => {
    if (!isHomePage) return;
    const updateHeight = () => setDynamicThreshold(window.innerHeight);
    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, [isHomePage]);

  const isScrolled = useScrollThreshold(
    isHomePage ? (dynamicThreshold ?? Infinity) : 20,
  );

  const isSearchablePage = SEARCHABLE_PATHS.some((p) => pathname.startsWith(p));

  const { base, inner, logoLink, ul, buttonWrapper } = headerStyles({
    isScrolled,
    isSearchablePage,
  });

  return (
    <header className={base()}>
      <div className={inner()}>
        <Link href='/' onClick={scrollToTop} className={logoLink()}>
          <LogoHeader />
        </Link>
        <nav>
          <ul className={ul()}>
            {NAV_ITEMS.map((item) => {
              const isActive = checkActive(item.href);
              return (
                <li key={item.href}>
                  <HeaderMenuItem
                    label={item.label}
                    href={item.href}
                    isPublished={item.isPublished}
                    isActive={isActive}
                  />
                </li>
              );
            })}
          </ul>
        </nav>

        <div className={buttonWrapper()}>
          {isSearchablePage && (
            <button type='button' onClick={() => setSearchDrawerOpen(true)}>
              <SearchLarge />
            </button>
          )}
          <button type='button' onClick={onMenuOpen}>
            <Hamburger />
          </button>
        </div>
      </div>
    </header>
  );
};
