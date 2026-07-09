import Link from 'next/link';
import { cn } from 'tailwind-variants';
import { menuItemStyles } from './tv';

type HeaderMenuItemProps = {
  label: string;
  href: string;
  isPublished: boolean;
  isActive: boolean;
};

export const HeaderMenuItem = ({
  label,
  href,
  isPublished,
  isActive,
}: HeaderMenuItemProps) => {
  const { base, label: labelStyle } = menuItemStyles({
    color: 'black',
    isPublished,
  });

  return (
    <Link href={href} className={cn(base(), isActive ? 'gap-1' : 'gap-0')}>
      <span
        className={cn(
          '-mt-[0.1em] rounded-full bg-current transition-all duration-300',
          isActive ? 'w-2 h-2 shrink-0' : 'w-0 h-0',
        )}
        aria-hidden
      />
      <span className={labelStyle()}>{label}</span>
    </Link>
  );
};
