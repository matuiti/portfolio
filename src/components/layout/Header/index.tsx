'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { tv } from 'tailwind-variants';
import { NAV_ITEMS, SEARCHABLE_PATHS } from '@/data/navigation';
import { useScrollThreshold } from '@/lib/hooks/useScrollThreshold';
// import { Logo } from '@/components/ui/Logo';
import { MenuItem } from '@/components/ui/MenuItem';
import { Hamburger, SearchLarge } from '@/components/ui/Icons';
import { useStore } from '@/lib/store/useStore';
import LogoHeader from '@/components/ui/LogoHeader';

export const headerStyles = tv({
  slots: {
    base: 'section-padding-x fixed top-0 left-0 flex items-center justify-center w-full min-h-header-mini small:min-h-header-small z-header transition-all duration-1000 ease-in',
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

  const { base } = headerStyles({
    isScrolled,
    isSearchablePage,
  });

  return (
    <header className={base()}>
      <div className='container-center flex items-center justify-between'>
        <Link
          href='/'
          className='cursor-default tablet:cursor-pointer hover:opacity-hover transition-opacity w-[120px] small:w-[160px] h-auto duration-300 ease-in-out'
        >
          <LogoHeader />
          {/* <Logo color='black' type='header' /> */}
        </Link>
        <nav>
          <ul className='hidden small:flex items-center leading-normal gap-[calc(15.6/16*1rem)] mt-[calc(6/16*1rem)] mr-[calc(3/16*1rem)]'>
            {NAV_ITEMS.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== '/' && pathname.startsWith(item.href));
              return (
                <li key={item.href}>
                  <MenuItem
                    label={item.label}
                    href={item.href}
                    isPublished={item.isPublished}
                    isActive={isActive}
                    color='black'
                    indicatorLayout='fixed'
                  />
                </li>
              );
            })}
          </ul>
        </nav>

        <div className='flex items-center gap-2.5 small:hidden'>
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
