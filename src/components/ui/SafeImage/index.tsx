'use client';
import { useState } from 'react';
import Image, { ImageProps } from 'next/image';

const DEFAULT_FALLBACK = '/assets/images/common/noimage.jpg';

type SafeImageProps = Omit<ImageProps, 'src'> & {
  src?: string | null;
};

export const SafeImage = ({ src, alt, ...props }: SafeImageProps) => {
  const [isError, setIsError] = useState(false);
  const imgSrc = !isError && src ? src : DEFAULT_FALLBACK;

  return (
    <Image
      {...props}
      key={src} // keyが変わると再レンダリングされるので、State(isError)がfalseに戻る
      src={imgSrc}
      alt={alt}
      onError={() => {
        // フォールバック画像が壊れていても無限ループを回避する
        if (imgSrc !== DEFAULT_FALLBACK) {
          setIsError(true);
        }
      }}
    />
  );
};
