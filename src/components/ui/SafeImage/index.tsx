// src / components / ui / SafeImage / index.tsx;
"use client";

import React, { useState, useEffect } from "react";
import Image, { ImageProps } from "next/image";

// 規約に従い type で定義 [2]
type SafeImageProps = ImageProps & {
  fallbackSrc?: string;
};

const DEFAULT_FALLBACK = "/assets/images/common/noimage.jpg"; // [3]

export const SafeImage = ({
  src,
  alt,
  fallbackSrc = DEFAULT_FALLBACK,
  ...props
}: SafeImageProps) => {
  const [imgSrc, setImgSrc] = useState(src);

  // 重要：props.src が変更された場合にステートを同期させる [4]
  // これがないと、モーダルで別の実績に切り替えた時に画像が更新されません
  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  return (
    <Image
      {...props}
      src={imgSrc}
      alt={alt}
      // 読み込みエラー時にフォールバック画像に差し替え [1]
      onError={() => setImgSrc(fallbackSrc)}
    />
  );
};
