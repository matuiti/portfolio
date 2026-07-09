import Link from 'next/link';
import { cn } from 'tailwind-variants';
import { menuItemStyles } from './tv';

type MobileMenuItemProps = {
  label: string;
  href: string;
  isPublished: boolean;
  isActive: boolean;
  onClick?: () => void;
};

export const MobileMenuItem = ({
  label,
  href,
  isPublished,
  isActive,
  onClick,
}: MobileMenuItemProps) => {
  const { base, label: labelStyle } = menuItemStyles({
    color: 'black',
    isPublished,
  });

  const content = (
    <>
      <span
        className={cn(
          'absolute -left-3 -mt-[0.2em] w-2 h-2 rounded-full bg-current transition-all duration-300',
          isActive ? 'opacity-100' : 'opacity-0',
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
    <Link href={href} className={base()} onClick={onClick}>
      {content}
    </Link>
  );
};
