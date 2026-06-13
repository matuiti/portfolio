// src/components/ui/DirectMailTextLink/index.tsx
'use client';

import { Mail } from '@/components/ui/Icons';
import { tv } from 'tailwind-variants';

const textLinkStyles = tv({
  base: 'group inline-flex items-center gap-[calc(6/16*1rem)] transition-all cursor-pointer',
  variants: {
    color: {
      black: 'text-black',
      gray: 'text-dark-gray',
    },
  },
  defaultVariants: {
    color: 'black',
  },
});

type DirectMailTextLinkProps = {
  user: string;
  domain: string;
  color?: 'black' | 'gray';
  className?: string;
};

export const DirectMailTextLink = ({
  user,
  domain,
  color,
  className,
}: DirectMailTextLinkProps) => {
  // スパムボット（クローラー）によるメールアドレスの自動収集を対策
  const handleMailClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.href = `mailto:${user}@${domain}`;
  };

  return (
    <button
      onClick={handleMailClick}
      className={textLinkStyles({ color, className })}
      aria-label='メールソフトを起動して連絡する'
    >
      <Mail
        size='sm'
        className='group-hover:translate-x-[calc(2/16*1rem)] transition-transform duration-300'
      />
      <span className='text-[calc(15/16*1rem)] font-medium border-b border-current pb-[calc(1/16*1rem)] group-hover:opacity-hover transition-opacity'>
        直接メールでのご連絡も歓迎します
      </span>
    </button>
  );
};
