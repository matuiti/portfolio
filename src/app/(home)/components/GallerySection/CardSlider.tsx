import { CarouselArrowRight } from '@/components/ui/Icons';
import { Card } from '@/gallery/components/Card';
import { GalleryUIPart } from '@/types/gallery';
import { useState, useRef, useEffect, useCallback, TouchEvent } from 'react';
import styles from './CardSlider.module.css';

type CardSliderProps = {
  cards: GalleryUIPart[];
  setSelectedUIPart: (part: GalleryUIPart | null) => void;
};

export const CardSlider = ({ cards, setSelectedUIPart }: CardSliderProps) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [translateX, setTranslateX] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const hasMultiplecards = cards.length > 1;

  // 実際の1枚分の幅(px)を測定してtranslateXを再計算
  const updateTranslate = useCallback(() => {
    const slider = sliderRef.current;
    if (!slider) return;
    const slideEl = slider.children[currentCardIndex] as
      | HTMLElement
      | undefined;
    if (!slideEl) return;

    // 現在のスライドの左端位置を基準に移動量を出す
    const offset = slideEl.offsetLeft;
    setTranslateX(offset);
  }, [currentCardIndex]);

  useEffect(() => {
    updateTranslate();
    window.addEventListener('resize', updateTranslate);
    return () => window.removeEventListener('resize', updateTranslate);
  }, [updateTranslate]);

  const handlePrev = () => {
    setCurrentCardIndex((prev) => (prev > 0 ? prev - 1 : cards.length - 1));
  };
  const handleNext = () => {
    setCurrentCardIndex((prev) => (prev < cards.length - 1 ? prev + 1 : 0));
  };

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    if (!hasMultiplecards) return;
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
    if (touchStartX === null || !hasMultiplecards) return;
    const diffX = touchStartX - e.changedTouches[0].clientX;
    const threshold = 50;
    if (diffX > threshold) handleNext();
    else if (diffX < -threshold) handlePrev();
    setTouchStartX(null);
  };

  return (
    <>
      <div className={styles.cardSection}>
        <div className={styles.cardWrapper}>
          <div
            ref={sliderRef}
            className={styles.cardSlider}
            style={{ transform: `translateX(-${translateX}px)` }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {cards.map((item, index) => (
              <div key={index} className={styles.slide}>
                <div className={styles.slideInner}>
                  <Card item={item} onExpand={() => setSelectedUIPart(item)} />
                </div>
              </div>
            ))}
          </div>

          {/* 複数枚ある場合のみ操作UIを表示 */}
          {hasMultiplecards && (
            <>
              <button
                className={styles.slidePrev}
                onClick={handlePrev}
                aria-label='前の画像へ'
              >
                <CarouselArrowRight left />
              </button>
              <button
                className={styles.slideNext}
                onClick={handleNext}
                aria-label='次の画像へ'
              >
                <CarouselArrowRight />
              </button>
            </>
          )}
        </div>

        {/* 画像の下に配置するインジケーターエリア */}
        {hasMultiplecards && (
          <div className={styles.indicatorContainer}>
            <div className={styles.dotIndicator}>
              {cards.map((_, i) => (
                <span
                  key={i}
                  className={`${styles.dot} ${i === currentCardIndex ? styles.isActive : ''}`}
                  onClick={() => setCurrentCardIndex(i)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};
