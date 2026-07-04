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
          'absolute -left-3 w-2 h-2 rounded-full bg-current tablet:static transition-all duration-300',
          isActive
            ? 'opacity-100 tablet:w-2 tablet:h-2 tablet:shrink-0'
            : 'opacity-0 tablet:w-0 tablet:h-0',
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
      className={cn(base(), 'gap-y-1', isActive && 'tablet:gap-1')}
    >
      {content}
    </Link>
  );
};
