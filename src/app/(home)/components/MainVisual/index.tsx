// src/app/(home)/components/MainVisual/index.tsx
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";
import { useUIStore } from "@/store/useUIStore";
import styles from "./MainVisual.module.scss";

export const MainVisual = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const setPhase = useUIStore((state) => state.setPhase);
  const phase = useUIStore((state) => state.phase);

  /**
   * 演出スキップ判定（他ページから戻った際などの挙動）
   */
  const isAllFinished = phase === "ready";

  /**
   * コンテンツ（メインテキスト等）の表示判定
   * ヘッダー登場フェーズ（header-entry）以降であれば表示状態にする
   */
  const isMvItemVisible = phase === "ready" || phase === "header-entry";

  useEffect(() => {
    // すでに演出済みならGSAPを実行しない
    if (isAllFinished) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        // すべてのアニメーション完了後に phase を "ready" に更新 [ソース118, 184]
        onComplete: () => setPhase("ready"),
      });

      // 1. 演出開始フェーズへ [ソース34, 184]
      setPhase("mv-playing");

      // 2. メインコンテンツの登場アニメーション
      tl.to(".js-mv-item", {
        opacity: 1,
        y: 0,
        duration: 1.4,
        stagger: 0.7,
        ease: "power4.out",
      })
        // 3. ヘッダーを登場させる（コンテンツの演出中に少し早めに開始） [ソース118, 185]
        .add(() => setPhase("header-entry"), "-=0.8")

        // 4. スクロールインジケーターの登場
        .to(
          ".js-scroll-indicator",
          {
            opacity: 1,
            duration: 1.2,
            ease: "power2.out",
          },
          "+=0.5",
        );
    }, rootRef);

    return () => ctx.revert();
  }, [setPhase, isAllFinished]);

  // クラス名の動的生成
  const itemClass = `js-mv-item ${isMvItemVisible ? "opacity-100" : "opacity-0"}`;
  const scrollClass = `js-scroll-indicator ${isAllFinished ? "opacity-100" : "opacity-0"} ${styles.scrollIndicator}`;

  return (
    <section
      ref={rootRef}
      className="relative w-full overflow-hidden flex items-start justify-center bg-black h-svh min-h-mv-height-mini mobile:min-h-mv-height-mobile tablet:min-h-mv-height-tablet small:min-h-mv-height-small"
    >
      <div className={`${styles["mv-container"]} relative mx-auto`}>
        <div
          className={`${itemClass} flex flex-col tablet:flex-row gap-4 small:gap-10 items-center pt-header-mini small:pt-header-small`}
        >
          <div className="flex-1 space-y-6 z-10">
            <h1 className="text-[calc(28/16*1em)] mobile:text-[calc(32/16*1em)] tablet:text-[calc(45/16*1em)] small:text-[calc(60/16*1em)] default:text-[calc(70/16*1em)] font-black leading-normal mobile:leading-[1.7] text-white">
              安心して任せられる
              <br />
              技術者でありたい
            </h1>
            <p className="text-white max-w-md text-lg">
              ユーザーに寄り添った、品質の高いコーディングを提供します。
            </p>
          </div>

          <div className={`${itemClass}`}>
            <div className="block tablet:hidden w-full aspect-video relative">
              <Image
                src="/assets/images/home/mv-sp.jpg"
                alt="メインビジュアル"
                fill
                priority
                className="object-cover"
                sizes="100vw"
              />
            </div>
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
        <div className={`${styles["mv-container"]} relative h-full mt-0!`}>
          <div className={scrollClass}>
            <span className={styles.scrollText}>Scroll</span>
            <div className={styles.dropLineTrack} />
          </div>
        </div>
      </div>
    </section>
  );
};
