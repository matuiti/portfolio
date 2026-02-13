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
  const isMvItemVisible = phase === "ready" || phase === "header-entry";

  useEffect(() => {
    if (isAllFinished) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => setPhase("ready"),
      });

      setPhase("mv-playing");

      tl.to(".js-mv-item-main-copy", {
        opacity: 1,
        duration: 1,
        stagger: 0.5,
        ease: "power4.out",
      })
        .to(
          ".js-mv-item-sub-copy",
          {
            opacity: 1,
            duration: 1.2,
            ease: "power4.out",
          },
          "-=0.3",
        )
        .to(
          ".js-mv-item-image",
          {
            opacity: 1,
            duration: 2,
            ease: "power4.out",
          },
          "-=0.3",
        )
        .add(() => setPhase("header-entry"), "-=0.8")
        .to(
          ".js-scroll-indicator",
          {
            opacity: 1,
            duration: 2,
            ease: "power4.out",
          },
          "+=1",
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
      // small:h-svh
      className={`${styles["mv-section-container"]} relative w-full overflow-hidden flex items-start justify-center bg-black`}
    >
      <div className={`${styles["mv-container"]} relative mx-auto self-center`}>
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
            <div className="hidden tablet:block w-50 h-50 small:w-75 small:h-75 large:w-87.5 large:h-87.5 relative overflow-hidden">
              <Image
                src="/assets/images/home/mv-pc-l.jpg"
                alt="メインビジュアル"
                fill
                priority
                className="object-cover"
                sizes="350px"
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
