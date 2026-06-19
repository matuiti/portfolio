'use client';
import { tv, type VariantProps } from 'tailwind-variants';
import React, { useEffect, useState } from 'react';
import { useScrollThreshold } from '@/lib/hooks/useScrollThreshold';

const pageTopButtonStyles = tv({
  base: [
    'fixed z-pagetop uppercase text-sm',
    'flex h-20 w-20 flex-col items-center justify-center rounded-full',
    'bg-black text-white shadow-lg',
    'transition-[opacity,transform,bottom] duration-500 ease-in-out',
    'hover:opacity-hover active:scale-95 cursor-pointer',
    'focus:outline-none',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white',
  ],
  variants: {
    isVisible: {
      true: 'opacity-100 translate-y-0',
      false: 'opacity-0 translate-y-4 pointer-events-none',
    },
  },
  defaultVariants: {
    isVisible: false,
  },
});

type PageTopButtonProps = VariantProps<typeof pageTopButtonStyles> & {
  threshold?: number;
  containerWidth?: number;
};

export const PageTopButton = ({
  threshold = 300,
  containerWidth = 1200,
}: PageTopButtonProps) => {
  const isExceeded = useScrollThreshold(threshold);
  const [positionStyle, setPositionStyle] = useState<React.CSSProperties>({
    bottom: '1.25rem', // 20px
    right: '1.25rem',
    left: 'auto',
  });

  // フッターの交差判定状態を保持
  const [footerIntersecting, setFooterIntersecting] = useState(false);
  const [footerHeight, setFooterHeight] = useState(0);

  useEffect(() => {
    const footer = document.querySelector('footer');
    if (!footer) return;

    // 1. フッターが画面内に入ってきたかを監視（スクロールイベントの削減）
    const observer = new IntersectionObserver(
      ([entry]) => {
        setFooterIntersecting(entry.isIntersecting);
      },
      { rootMargin: '0px 0px 0px 0px' },
    );
    observer.observe(footer);

    // 2. 画面リサイズ、およびフッター自体のサイズ変化（文字拡大による縦伸び）を監視
    const resizeObserver = new ResizeObserver(() => {
      const viewportWidth = window.innerWidth;
      const BUTTON_WIDTH_PX = 80;

      // セクションパディングの決定
      let sectionPaddingPx = 15;
      if (viewportWidth >= 1140) sectionPaddingPx = 40;
      else if (viewportWidth >= 840) sectionPaddingPx = 30;
      else if (viewportWidth >= 540) sectionPaddingPx = 20;

      const isWideScreen =
        viewportWidth > containerWidth + sectionPaddingPx * 2;

      // 文字サイズ拡大などでフッターの高さが動的に変わっても、常に最新の「正確な高さ」をキャッチ
      if (footer) {
        setFooterHeight(footer.offsetHeight);
      }

      setPositionStyle({
        left: isWideScreen ? '50%' : 'auto',
        right: isWideScreen ? 'auto' : `calc(${sectionPaddingPx}/16*1rem)`,
        marginLeft: isWideScreen
          ? `calc((${containerWidth}/2 - ${BUTTON_WIDTH_PX})/16*1rem)`
          : '0',
      });
    });

    // body全体の変更に加え、フッター単体のサイズ変更も直接監視（アクセシビリティ強化）
    resizeObserver.observe(document.body);
    resizeObserver.observe(footer);

    return () => {
      observer.disconnect();
      resizeObserver.disconnect();
    };
  }, [containerWidth]);

  // フッターと交差している場合のみ、ボトムの位置を動的に引き上げる
  const finalStyle: React.CSSProperties = {
    ...positionStyle,
    bottom: footerIntersecting
      ? `calc((${footerHeight} + 20)/16*1rem)`
      : '1.25rem',
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      type='button'
      onClick={scrollToTop}
      className={pageTopButtonStyles({ isVisible: isExceeded })}
      style={finalStyle}
      aria-label='ページ上部へ戻る'
    >
      <span>Page</span>
      <span>Top</span>
    </button>
  );
};
