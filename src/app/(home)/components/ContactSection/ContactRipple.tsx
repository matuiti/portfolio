"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { useUIStore } from "@/store/useUIStore";
import styles from "./ContactSection.module.scss";

/**
 * 送信完了時の「雫と波紋」演出コンポーネント
 * ステップ10: GSAPによる情緒的アニメーションの実装
 */
export const ContactRipple = () => {
  const rippleRef = useRef<HTMLDivElement>(null);
  const { contactStatus } = useUIStore();

  useEffect(() => {
    // 送信成功時のみアニメーションを実行
    if (contactStatus === "success" && rippleRef.current) {
      const tl = gsap.timeline();

      tl.to(rippleRef.current, {
        opacity: 0.6,
        scale: 1,
        duration: 0.4,
        ease: "power2.out",
      }).to(rippleRef.current, {
        scale: 40, // 画面いっぱいに広がる波紋
        opacity: 0,
        duration: 1.2,
        ease: "expo.out",
      });
    }
  }, [contactStatus]);

  if (contactStatus !== "success") return null;

  return (
    <div className={styles.rippleContainer}>
      <div ref={rippleRef} className={`${styles.ripple} js-contact-ripple`} />
    </div>
  );
};
