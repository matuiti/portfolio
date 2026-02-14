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

  const isAllFinished = phase === "ready";
  const isMvItemVisible = phase === "ready";

  useEffect(() => {
    // 既に演出が完了している場合は実行しない
    if (isAllFinished) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => setPhase("ready"),
      });

      setPhase("playing");

      // --- 初期状態のセット ---
      // 全アイテムを一括で「ぼかし20px・透明・少し下配置」に固定
      tl.set(
        [
          ".js-mv-item-main-copy",
          ".js-mv-item-sub-copy",
          ".js-mv-item-image",
        ],
        {
          filter: "blur(8px)",
          opacity: 0,
        },
      );
      tl.set(
        [
          ".js-scroll-indicator",
        ],
        {
          opacity: 0,
        },
      );

      // --- 2. コンテンツのアニメーション ---
      tl.to(".js-mv-item-main-copy", {
        opacity: 1,
        filter: "blur(0px)", // モザイク（ぼかし）を解除
        y: 0,
        duration: 2.0, // より「じわっと」させるため長めに設定
        // stagger: 0.8,
        ease: "power2.out",
      })
        .to(
          ".js-mv-item-sub-copy",
          {
            opacity: 1,
            filter: "blur(0px)",
            duration: 2.0,
            ease: "power2.out",
          },
          "-=2.0", // メインコピーの登場中に重ねる
        )
        .to(
          ".js-mv-item-image",
          {
            opacity: 1,
            filter: "blur(0px)",
            duration: 2.0, // 画像はさらにゆっくり
            ease: "power2.out",
          },
          "-=2.0",
        )
        // --- 3. スクロールインジケーターのアニメーション ---
        .to(
          ".js-scroll-indicator",
          {
            opacity: 1,
            filter: "blur(0px)",
            duration: 1.2,
            ease: "slow",
          },
          "-=1.4", // すべてが晴れた後に静かに登場
        );
    }, rootRef);
    return () => ctx.revert();
  }, [setPhase, isAllFinished]);

  const mainItemClass = `js-mv-item-main-copy ${isMvItemVisible ? "opacity-100" : "opacity-0"}`;
  const subItemClass = `js-mv-item-sub-copy ${isMvItemVisible ? "opacity-100" : "opacity-0"}`;
  const imageItemClass = `js-mv-item-image ${isMvItemVisible ? "opacity-100" : "opacity-0"}`;
  const scrollClass = `js-scroll-indicator ${isAllFinished ? "opacity-100" : "opacity-0"} ${styles.scrollIndicator}`;

  return (
    <section
      ref={rootRef}
      className={`${styles["mv-section-container"]} relative w-full overflow-hidden flex items-start justify-center bg-black`}
    >
      <div className={`${styles["mv-container"]} relative mx-auto`}>
        <div className={`${styles["mv-content-wrapper"]}`}>
          {/* コピー */}
          <div className="space-y-4 mobile:space-y-5">
            {/* メインコピー */}
            <h1 className={`${styles["main-copy-text"]}`}>
              <span className={`${mainItemClass}`}>安心して任せられる</span>
              <br />
              <span className={`${mainItemClass}`}>技術者でありたい</span>
            </h1>
            {/* サブコピー */}
            <p className={`${subItemClass} ${styles["sub-copy-text"]}`}>
              ユーザーに寄り添った、品質の高いコーディングを提供します。
            </p>
          </div>
          {/* 画像 */}
          <div
            className={`${imageItemClass} w-full tablet:w-auto flex justify-start`}
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
            {/* large:w-87.5 large:h-87.5 */}
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
