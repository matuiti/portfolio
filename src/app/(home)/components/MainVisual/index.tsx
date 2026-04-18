// src/app/(home)/components/MainVisual/index.tsx
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";
import { useUIStore } from "@/store/useUIStore";
import styles from "./MainVisual.module.scss";

export const MainVisual = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const setPhase = useUIStore((state) => state.setPhase);
  const phase = useUIStore((state) => state.phase);

  const isAllFinished = phase === "ready";
  const isMvItemVisible = phase === "ready";

  useEffect(() => {
    // 既に演出が完了している場合は実行しない [1]
    // if (isAllFinished) return;
    if (phase === "ready") return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => setPhase("ready"),
      });

      timelineRef.current = tl;

      setPhase("playing");

      // --- 1. 初期状態のセット ---
      tl.set(".js-mv-item", {
        filter: "blur(8px)",
        opacity: 0,
      });

      tl.set(".js-scroll-indicator", {
        opacity: 0,
      });

      // --- 2. コンテンツのアニメーション ---
      tl.to(".js-mv-item", {
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
        duration: 2.0, // じわっとさせる演出を維持
        stagger: 0, // 同時に開始
        ease: "power2.out",
      })
        // --- 3. スクロールインジケーターのアニメーション ---
        .to(
          ".js-scroll-indicator",
          {
            opacity: 1,
            filter: "blur(0px)",
            duration: 1.2,
            ease: "slow",
          },
          "-=1.4",
        );
    }, rootRef);

    return () => ctx.revert();
    timelineRef.current = null; // クリーンアップ
  }, [setPhase, phase]);

  useEffect(() => {
    // 演出中(playing)の時だけスクロールを監視する
    if (phase !== "playing") return;

    const handleScrollSkip = () => {
      if (window.scrollY > 10) {
        // 10px以上スクロールしたら実行
        if (timelineRef.current) {
          // 1. アニメーションを最後まで一瞬で進める
          timelineRef.current.progress(1);
          // 2. フェーズを準備完了にする（これに連動してWorksSectionが動き出す）
          setPhase("ready");
        }
        // イベントを解除（一度スキップすれば十分なため）
        window.removeEventListener("scroll", handleScrollSkip);
      }
    };

    window.addEventListener("scroll", handleScrollSkip, { passive: true });
    return () => window.removeEventListener("scroll", handleScrollSkip);
  }, [phase, setPhase]);

  const mvItemClass = `js-mv-item ${isMvItemVisible ? "opacity-100" : "opacity-0"}`;
  const scrollClass = `js-scroll-indicator ${isAllFinished ? "opacity-100" : "opacity-0"} ${styles.scrollIndicator}`;

  return (
    <section
      ref={rootRef}
      className={`${styles.mvSectionContainer} relative w-full overflow-hidden flex items-start justify-center bg-black`}
    >
      <div className={`${styles.mvContainer} relative mx-auto`}>
        <div className={`${styles.mvContentWrapper}`}>
          {/* コピー */}
          <div className="space-y-4 mobile:space-y-5">
            {/* メインコピー */}
            <h1 className={`${styles.mainCopyText}`}>
              <span className={`${mvItemClass}`}>安心して任せられる</span>
              <br />
              <span className={`${mvItemClass}`}>技術者でありたい</span>
            </h1>
            {/* サブコピー */}
            <p className={`${mvItemClass} ${styles.subCopyText}`}>
              {/* ユーザーに寄り添った、品質の高いコーディングを提供します。 */}
              ユーザー・クライアント・開発メンバーの体験を意識したサービス提供
            </p>
          </div>
          {/* 画像 */}
          <div
            className={`${mvItemClass} w-full tablet:w-auto flex justify-start`}
          >
            {/* スマホ用画像コンテナ */}
            <div className="block tablet:hidden w-full h-auto aspect-video relative">
              <Image
                src="/assets/images/home/mv-sp.jpg"
                alt="メインビジュアル"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 540px) 100vw, 443px"
              />
            </div>
            {/* PC用画像コンテナ */}
            <div className="hidden tablet:block w-50 h-50 small:w-75 small:h-75 relative overflow-hidden">
              <Image
                src="/assets/images/home/mv-pc.jpg"
                alt="メインビジュアル"
                fill
                priority
                className="object-cover"
                sizes="300px"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 flex justify-center">
        <div className={`${styles.mvContainer} relative h-full mt-0!`}>
          <div className={scrollClass}>
            <span className={styles.scrollText}>Scroll</span>
            <div className={styles.dropLineTrack} />
          </div>
        </div>
      </div>
    </section>
  );
};
