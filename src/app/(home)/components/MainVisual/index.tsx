// src/app/(home)/components/MainVisual/index.tsx
"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";
import { useUIStore } from "@/store/useUIStore";
import styles from "./MainVisual.module.scss";

export const MainVisual = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const setPhase = useUIStore((state) => state.setPhase);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => setPhase("header-entry"),
      });

      setPhase("mv-playing");

      tl.to(".js-mv-item", {
        opacity: 1,
        y: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power4.out",
      }).to(
        ".js-scroll-indicator",
        {
          opacity: 1,
          duration: 1,
        },
        "-=0.4",
      );
    }, rootRef);

    return () => ctx.revert();
  }, [setPhase]);

  return (
    <section
      ref={rootRef}
      className="relative h-svh w-full overflow-hidden bg-neutral-50 flex items-center"
    >
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 z-10">
          <div className="js-mv-item opacity-0 translate-y-8">
            <p className="text-blue-600 font-bold tracking-widest mb-4 text-sm">
              FRONTEND ENGINEER
            </p>
            <h1 className="text-5xl md:text-8xl font-bold leading-[1.1] text-neutral-900 tracking-tight">
              Design meets
              <br />
              Implementation.
            </h1>
          </div>
          <p className="js-mv-item opacity-0 translate-y-8 text-neutral-600 max-w-md text-lg">
            「実装力」と「設計力」で、アイデアを確かな形にする。
          </p>
        </div>

        <div className="js-mv-item opacity-0 translate-y-8 relative aspect-square w-full max-w-125 mx-auto">
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

      {/* styles を適用することで警告を解消 */}
      <div
        className={`js-scroll-indicator opacity-0 absolute bottom-12 right-12 ${styles.scrollIndicator}`}
      >
        <span className={styles.scrollText}>Scroll</span>
        <div className={styles.dropLineTrack} />
      </div>
    </section>
  );
};
