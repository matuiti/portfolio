// src/lib/hooks/useScrollThreshold.ts
"use client";

import { useState, useEffect } from "react";

/**
 * 指定した閾値(threshold)を超えてスクロールしたかどうかを判定する
 */
export function useScrollThreshold(threshold: number) {
  const [isExceeded, setIsExceeded] = useState(false);

  useEffect(() => {
    // サーバーサイド実行時は何もしない
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      setIsExceeded(window.scrollY > threshold);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // 初期実行
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return isExceeded;
}
