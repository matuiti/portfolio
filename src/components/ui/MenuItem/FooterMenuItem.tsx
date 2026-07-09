import Link from 'next/link';
import { cn } from 'tailwind-variants';
import { menuItemStyles } from './tv';

type FooterMenuItemProps = {
  label: string;
  href: string;
  isPublished: boolean;
  isActive: boolean;
};

export const FooterMenuItem = ({
  label,
  href,
  isPublished,
  isActive,
}: FooterMenuItemProps) => {
  const { base, label: labelStyle } = menuItemStyles({
    color: 'white',
    isPublished,
  });

  const content = (
    <>
      <span
        className={cn(
          'absolute -left-3 bottom-[0.6em] w-2 h-2 -mt-[0.1em] rounded-full bg-current transition-all duration-300',
          isActive
            ? 'opacity-100 mobile:static mobile:inline-flex mobile:align-middle mobile:items-center mobile:mb-[0.2em]'
            : 'opacity-0',
        )}
        aria-hidden
      />
      <span className={labelStyle()}>{label}</span>
    </>
  );

  if (!isPublished) {
    return <span className={base()}>{content}</span>;
  }

  return (
    <Link
      href={href}
      className={cn(base(), 'gap-y-1', isActive && 'mobile:gap-1')}
    >
      {content}
    </Link>
  );
};
