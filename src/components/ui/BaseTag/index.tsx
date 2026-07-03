'use client';
import Link from 'next/link';
import { tv, type VariantProps } from 'tailwind-variants';

/**
 * タブ(ショート・ロング) / タグ(ハッシュ有・無)
 */
const tagStyles = tv({
  slots: {
    base: 'inline-flex items-center justify-center transition-all duration-300 leading-none tracking-wider tablet:cursor-pointer',
    countBadge:
      'ml-[calc(6/16*1rem)] text-[calc(14/16*1rem)] transition-colors tracking-widest leading-none',
  },
  variants: {
    shape: {
      tab: { base: '' },
      tag: {
        base: 'rounded-sm text-[calc(12/16*1rem)] py-[calc(4/16*1rem)] bg-white text-dark-gray border border-dark-gray tablet:hover:border-medium-gray tablet:hover:bg-medium-gray tablet:hover:text-white leading-none tracking-wider',
      },
    },
    // タブ
    size: {
      short: { base: '' },
      long: { base: 'w-full' },
    },
    // タグ：ハッシュの有無による余白調整
    hasHash: {
      true: { base: 'px-[calc(8/16*1rem)]' },
      false: { base: 'px-[calc(12/16*1rem)]' },
    },
    // 共通
    isActive: {
      true: { base: '' },
      false: { base: '' },
    },
    isStatic: {
      true: { base: 'cursor-default pointer-events-none active:scale-100' },
    },
  },
  compoundVariants: [
    {
      shape: 'tab',
      size: 'short',
      class: {
        base: 'rounded-[calc(20/16*1rem)] text-[calc(14/16*1rem)] py-[calc(8/16*1rem)] px-[calc(16/16*1rem)] bg-white text-black border border-dark-gray tablet:hover:bg-dark-gray tablet:hover:text-white tablet:hover:border-dark-gray',
      },
    },
    {
      shape: 'tab',
      size: 'long',
      class: {
        base: 'flex justify-between rounded-lg text-[calc(16/16*1rem)] leading-normal py-[calc(10/16*1rem)] px-[calc(16/16*1rem)] bg-light-gray tablet:hover:bg-dark-gray text-black tablet:hover:text-white',
      },
    },
    {
      shape: 'tab',
      isActive: true,
      class: {
        base: 'bg-black text-white border-black',
        countBadge: 'text-white',
      },
    },
    {
      shape: 'tag',
      isActive: true,
      class: {
        base: 'bg-dark-gray text-white',
        countBadge: 'text-white',
      },
    },
  ],
  defaultVariants: {
    shape: 'tag',
    size: 'short',
    hasHash: false,
    isActive: false,
  },
});

type TagVariants = VariantProps<typeof tagStyles>;

type BaseTagProps = {
  children: React.ReactNode;
  href?: string;
  count?: number;
  showCount?: boolean;
  isStatic?: boolean;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  className?: string;
} & TagVariants;

export function BaseTag({
  children,
  shape,
  size,
  hasHash,
  isActive,
  isStatic,
  count,
  showCount = true,
  href,
  onClick,
  className,
}: BaseTagProps) {
  const { base, countBadge } = tagStyles({
    shape,
    size,
    hasHash,
    isActive,
    isStatic,
    className,
  });

  const content = (
    <>
      {children}
      {showCount && typeof count === 'number' && (
        <span className={countBadge()}>{count}</span>
      )}
    </>
  );

  if (href && !isStatic) {
    return (
      <Link href={href} className={base()} onClick={onClick}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type='button'
      className={base()}
      onClick={onClick}
      aria-pressed={isActive}
      disabled={isStatic}
    >
      {content}
    </button>
  );
}
