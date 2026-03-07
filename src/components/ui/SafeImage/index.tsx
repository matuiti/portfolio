// src / components / ui / SafeImage / index.tsx;
"use client";

import { useState } from "react";
import Image, { ImageProps } from "next/image";

// プロジェクト標準の代替画像パス [3, 4]
const DEFAULT_FALLBACK = "/assets/images/common/noimage.jpg";

type SafeImageProps = Omit<ImageProps, "src"> & {
  src?: string | null;
  fallbackSrc?: string;
};

export const SafeImage = ({
  src,
  alt,
  fallbackSrc = DEFAULT_FALLBACK,
  ...props
}: SafeImageProps) => {
  // 1. 直前の src プロップスを記録するためのステート
  const [prevSrc, setPrevSrc] = useState(src);
  // 2. 現在表示中の画像パスを管理するステート
  const [imgSrc, setImgSrc] = useState<string>(src || fallbackSrc);

  // 3. レンダリング中にプロップスの変更を検知してステートを調整
  // useEffect を使わないことで cascading renders を回避します
  if (src !== prevSrc) {
    setPrevSrc(src);
    setImgSrc(src || fallbackSrc);
  }

  return (
    <Image
      {...props}
      src={imgSrc}
      alt={alt}
      // 4. 読み込み失敗（404等）の際のみフォールバックに切り替え
      onError={() => {
        if (imgSrc !== fallbackSrc) {
          setImgSrc(fallbackSrc);
        }
      }}
    />
  );
};