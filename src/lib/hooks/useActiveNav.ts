'use client';

import { useEffect, useState, startTransition } from 'react';
import { usePathname } from 'next/navigation';

export const useActiveNav = () => {
  const pathname = usePathname();
  const [currentHash, setCurrentHash] = useState('');

  useEffect(() => {
    let animationFrameId: number;

    const checkHashLoop = () => {
      const actualHash =
        typeof window !== 'undefined' ? window.location.hash : '';

      if (currentHash !== actualHash) {
        startTransition(() => {
          setCurrentHash(actualHash);
        });
      }

      animationFrameId = requestAnimationFrame(checkHashLoop);
    };

    checkHashLoop();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [currentHash]);

  const checkActive = (href: string): boolean => {
    const isHashItem = href.includes('#');

    if (isHashItem) {
      return (
        pathname === '/' && href.endsWith(currentHash) && currentHash !== ''
      );
    }

    if (href === '/') {
      return pathname === '/' && currentHash === '';
    }

    return pathname.startsWith(href);
  };

  return { checkActive };
};
