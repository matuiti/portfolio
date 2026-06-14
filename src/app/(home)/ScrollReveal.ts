'use client';

import { useEffect, useCallback, useRef } from 'react';
import gsap from 'gsap';
import { useUIStore } from '@/store/useUIStore';

/**
 * TOPページ専用（現在）
 */
export const ScrollReveal = () => {
  const phase = useUIStore((state) => state.phase);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const revealedSet = useRef(new WeakSet<Element>());
  const revealingSet = useRef(new WeakSet<Element>());

  /**
   * アニメーションを実行し、完了後に制御を CSS へバトンタッチする
   */
  const revealElement = useCallback((el: Element) => {
    const target = el as HTMLElement;

    if (revealedSet.current.has(target) || revealingSet.current.has(target))
      return;

    revealingSet.current.add(target);

    gsap.to(target, {
      autoAlpha: 1,
      y: 0,
      duration: 1.2,
      ease: 'power3.out',
      overwrite: 'auto',
      onComplete: () => {
        // 1. GSAPのインラインスタイルを全削除（ホバーの解放）
        gsap.set(target, { clearProps: 'all' });

        // 2. CSSの初期スタイル（opacity:0等）に負けないよう、表示状態を固定
        target.style.opacity = '1';
        target.style.visibility = 'visible';
        target.style.pointerEvents = 'auto';

        // 3. 完了フラグを立て、進行中フラグを下ろす
        revealedSet.current.add(target);
        revealingSet.current.delete(target);
      },
    });
  }, []);

  /**
   * スクロール監視のためにIntersectionObserverを一度だけ初期化
   */
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            revealElement(entry.target);
            observerRef.current?.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -50px 0px' },
    );

    return () => {
      observerRef.current?.disconnect();
    };
  }, [revealElement]);

  /**
   * スキャン処理
   */
  const observeNewElements = useCallback(() => {
    if (!observerRef.current) return;
    const targets = document.querySelectorAll('.js-fuwa-fade');

    targets.forEach((target) => {
      if (revealedSet.current.has(target)) return;
      const rect = target.getBoundingClientRect();
      // すでに画面内ならアニメーションを即実行、外なら監視カメラに登録
      if (rect.top < window.innerHeight) {
        revealElement(target);
      } else if (observerRef.current) {
        observerRef.current.observe(target);
      }
    });
  }, [revealElement]);

  /**
   * DOM変化を監視してスキャン処理を呼び出す
   */
  useEffect(() => {
    const isScrolled = typeof window !== 'undefined' && window.scrollY > 100;
    if (!isScrolled && phase !== 'ready') return;

    observeNewElements();

    let timer: NodeJS.Timeout;
    const mutationObserver = new MutationObserver(() => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        observeNewElements();
      }, 100);
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      mutationObserver.disconnect();
      clearTimeout(timer);
    };
  }, [phase, observeNewElements]);

  return null;
};
