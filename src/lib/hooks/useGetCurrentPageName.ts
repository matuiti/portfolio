'use client';
import { usePathname } from 'next/navigation';

const REGISTERED_KEYWORDS = [
  'works',
  'gallery',
  'skills',
  'privacy-policy',
] as const;

type PageName = (typeof REGISTERED_KEYWORDS)[number] | '/';

export function useGetCurrentPageName(): PageName {
  const pathname = usePathname();
  if (!pathname) return '/';

  const firstKeyword = pathname.split('/')[1];
  if (!firstKeyword) return '/';

  if ((REGISTERED_KEYWORDS as readonly string[]).includes(firstKeyword)) {
    return firstKeyword as PageName;
  }

  return '/';
}
