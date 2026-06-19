'use client';
import { useCallback, useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout//Footer';
import { MobileDrawerMenu } from '@/components/layout//MobileDrawerMenu';
import { PageTopButton } from '@/components/ui/Buttons/PageTopButton';

export function PageLayout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleMenuToggle = useCallback(
    () => setIsMenuOpen((prev) => !prev),
    [],
  );
  const handleMenuClose = useCallback(() => setIsMenuOpen(false), []);

  return (
    <div className='flex min-h-dvh flex-col mt-[var(--spacing-header-mini)] small:mt-[var(--spacing-header-small)]'>
      <Header onMenuOpen={handleMenuToggle} />
      <MobileDrawerMenu isOpen={isMenuOpen} onClose={handleMenuClose} />
      <main>{children}</main>
      <Footer />
      <PageTopButton />
    </div>
  );
}
