import { tv, type VariantProps } from 'tailwind-variants';
import Link from 'next/link';
import { ArrowRight } from '@/components/ui/Icons';

export const mainButtonStyles = tv({
  slots: {
    base: 'group inline-flex items-center justify-center font-bold transition-all active:scale-95 disabled:opacity-50 cursor-default tablet:cursor-pointer',
    separator: 'h-5.5 border-l border-current',
    icon: 'transition-transform duration-300 group-hover:translate-x-1 shrink-0',
  },
  variants: {
    variant: {
      long: {
        base: 'justify-end bg-black text-white px-2 py-3.25 w-full rounded-lg',
        separator: 'ml-6 mr-1.75',
      },
      short: {
        base: 'bg-black text-white py-3.25 pr-4 pl-7.5 rounded-lg',
        separator: 'ml-3 mr-1.75',
      },
      underline: {
        base: 'text-black border-b border-black px-0 pb-1',
        icon: 'ml-6',
      },
    },
  },
});

type MainButtonProps = React.ComponentPropsWithoutRef<typeof Link> &
  VariantProps<typeof mainButtonStyles> & {
    href: string;
  };

export const MainButton = ({
  variant = 'short',
  href = '/',
  className,
  children,
  ...props
}: MainButtonProps) => {
  const { base, separator, icon } = mainButtonStyles({ variant, className });
  const iconColor =
    variant === 'short' || variant === 'long' ? 'white' : 'black';

  return (
    <Link href={href} className={base()} {...props}>
      {children}
      {(variant === 'long' || variant === 'short') && (
        <span className={separator()} aria-hidden='true' />
      )}
      <ArrowRight className={icon()} color={iconColor} />
    </Link>
  );
};
