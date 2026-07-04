'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { tv } from 'tailwind-variants';
// import { Logo } from '@/components/ui/Logo';
import { MenuItem } from '@/components/ui/MenuItem';
import { NAV_ITEMS } from '@/data/navigation';
import { SITE_CONFIG } from '@/data/site';
import LogoFooter from '@/components/ui/LogoFooter';

const footerStyles = tv({
  slots: {
    root: 'bg-[var(--color-black)] p-[calc(20/16*1rem)] tablet:pt-[calc(20.62/16*1rem)] tablet:pb-[calc(20.62/16*1rem)] small:pt-[calc(40.5/16*1rem)] small:pb-[calc(20.5/16*1rem)] base:pb-[calc(40/16*1rem)]',
    container: 'container-center',
    topArea:
      'flex flex-col items-center p-5 -mb-1.5 small:-mb-px gap-y-10 small:gap-y-0 small:gap-x-5 small:flex-row small:justify-between',
    menuList:
      'flex flex-col justify-start items-start ml-[calc(11/16*1rem)] mobile:ml-0 mobile:flex-row mobile:items-center mobile:justify-center gap-y-[calc(12/16*1rem)] gap-x-[calc(14/16*1rem)] flex-wrap',
    bottomArea: 'mt-5 pt-5 border-t border-dark-gray',
    privacyPolicy:
      'text-white text-[calc(14/16*1rem)] tracking-wider text-center mb-5',
    copyright:
      'text-xs leading-none font-normal text-dark-gray text-center tracking-normal',
  },
});

export function Footer() {
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();
  const {
    root,
    container,
    topArea,
    menuList,
    bottomArea,
    privacyPolicy,
    copyright,
  } = footerStyles();

  return (
    <footer className={root()}>
      <div className={container()}>
        <div className={topArea()}>
          <Link
          href='/'
          className='cursor-default tablet:cursor-pointer hover:opacity-hover transition-opacity w-[150px] mobile:w-[220px] h-auto duration-300 ease-in-out'
        >
          <LogoFooter />
          {/* <Logo color='black' type='header' /> */}
        </Link>
          <nav>
            <ul className={menuList()}>
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
                      color='white'
                      indicatorLayout='responsive'
                    />
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
        <div className={bottomArea()}>
          <div className={privacyPolicy()}>
            <Link
              href='/privacy-policy'
              aria-label='プライバシーポリシーページへ移動する'
              className='hover:opacity-hover transition-opacity'
            >
              プライバシーポリシー
            </Link>
          </div>
          <p className={copyright()}>
            &copy; {currentYear} {SITE_CONFIG.author || SITE_CONFIG.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
