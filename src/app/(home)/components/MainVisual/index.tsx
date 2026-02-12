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
  // 現在のフェーズを取得
  const phase = useUIStore((state) => state.phase);

  // すでに準備完了状態（他ページから戻った等）かどうか
  const isAlreadyReady = phase === "ready" || phase === "header-entry";

  useEffect(() => {
    // すでに演出済みなら何もしない
    if (isAlreadyReady) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => setPhase("ready"),
      });

      setPhase("mv-playing");

      tl.to(".js-mv-item", {
        opacity: 1,
        y: 0,
        duration: 1.4,
        stagger: 0.7,
        ease: "power4.out", // 登場時は out の方が自然です
      })
        .add(() => setPhase("header-entry"), "-=0.8")
        .to(
          ".js-scroll-indicator",
          {
            opacity: 1,
            duration: 1,
          },
          "+=1.5",
        );
    }, rootRef);

    return () => ctx.revert();
  }, [setPhase, isAlreadyReady]);

  // すでにReadyなら opacity-100、そうでなければ opacity-0 (GSAPで操作)
  const itemClass = `js-mv-item ${isAlreadyReady ? "opacity-100" : "opacity-0"}`;
  const scrollClass = `js-scroll-indicator ${isAlreadyReady ? "opacity-100" : "opacity-0"} absolute bottom-12 right-12 ${styles.scrollIndicator}`;

  return (
    <section
      ref={rootRef}
      className="relative w-full overflow-hidden flex items-center bg-black h-svh min-h-mv-height-mini mobile:min-h-mv-height-mobile tablet:min-h-mv-height-tablet small:min-h-mv-height-small"
    >
      <div
        className={`${itemClass} container-center grid grid-cols-1 md:grid-cols-2 gap-12 items-center small:pt-header-small pt-header-mini`}
      >
        <div className="space-y-6 z-10">
          <h1 className="text-5xl md:text-8xl font-bold leading-[1.1] text-white tracking-tight">
            Design meets
            <br />
            Implementation.
          </h1>
          <p className="text-white max-w-md text-lg">
            「実装力」と「設計力」で、アイデアを確かな形にする。
          </p>
        </div>

        <div
          className={`${itemClass} relative aspect-square w-full max-w-125 mx-auto`}
        >
          <div className="absolute inset-0 border border-blue-600 translate-x-6 translate-y-6 -z-10" />
          <div className="relative w-full h-full bg-neutral-200 overflow-hidden shadow-2xl">
            <Image
              src="/assets/images/mv-main.jpg"
              alt="Main Visual"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>

      <div className={scrollClass}>
        <span className={styles.scrollText}>Scroll</span>
        <div className={styles.dropLineTrack} />
      </div>
    </section>
  );
};
