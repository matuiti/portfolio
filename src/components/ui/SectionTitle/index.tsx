// src / components / ui / SectionTitle / index.tsx;
import { tv, type VariantProps } from 'tailwind-variants';

/**
 * 3つのタイプ × 2つのサイズ = 計6パターンの組み合わせに対して個別のスタイル調整が可能です。
 */
const sectionTitleStyles = tv({
  slots: {
    base: 'flex flex-col font-bold text-black leading-none',
    enTitle: 'uppercase tracking-wider',
    jpWrapper: 'flex items-center gap-x-[calc(8/16*1rem)]',
    jpTitle: 'text-[calc(18/16*1rem)]',
    bullet:
      'shrink-0 rounded-full bg-dark-gray w-[calc(8/16*1rem)] h-[calc(8/16*1rem)]',
  },
  variants: {
    variant: {
      default: {
        base: 'items-start',
        enTitle: 'text-[calc(48/16*1rem)] small:text-[calc(60/16*1rem)]',
        jpWrapper: 'mt-[calc(16/16*1rem)]',
      },
      underlined: {
        base: 'items-start border-b border-dark-gray pb-[calc(20/16*1rem)]',
        enTitle: 'text-[calc(48/16*1rem)] small:text-[calc(60/16*1rem)]',
        jpWrapper: 'mt-[calc(16/16*1rem)]',
      },
      center: {
        base: 'items-center text-center',
        enTitle: 'text-[calc(30/16*1rem)] small:text-[calc(36/16*1rem)]',
        jpWrapper: 'mt-[calc(16/16*1rem)] justify-center',
        bullet: 'hidden',
      },
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

type SectionTitleStylesProps = VariantProps<typeof sectionTitleStyles>;

type SectionTitleProps = {
  enTitle: string;
  jpTitle: string;
  variant?: SectionTitleStylesProps['variant'];
  className?: string;
  enClassName?: string;
  jpClassName?: string;
};

export const SectionTitle = ({
  enTitle,
  jpTitle,
  variant,
  className,
  enClassName,
  jpClassName,
}: SectionTitleProps) => {
  const {
    base,
    enTitle: enStyle,
    jpWrapper,
    jpTitle: jpStyle,
    bullet,
  } = sectionTitleStyles({
    variant,
  });

  return (
    <div className={base({ className })}>
      {/* 英語タイトル */}
      <span className={enStyle({ className: enClassName })}>{enTitle}</span>

      {/* 日本語タイトルエリア */}
      <div className={jpWrapper()}>
        {/* 丸ポチ：centerタイプでは自動的に hidden になります */}
        <span className={bullet()} aria-hidden='true' />
        {/* 日本語タイトル */}
        <h2 className={jpStyle({ className: jpClassName })}>{jpTitle}</h2>
      </div>
    </div>
  );
};
