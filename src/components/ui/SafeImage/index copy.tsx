'use client';
import { useState } from 'react';
import Image, { ImageProps } from 'next/image';

const DEFAULT_FALLBACK = '/assets/images/common/noimage.jpg';

type SafeImageProps = Omit<ImageProps, 'src'> & {
  src?: string | null;
  DEFAULT_FALLBACK?: string;
};

export const SafeImage = ({
  src,
  alt,
  ...props
}: SafeImageProps) => {
  const [prevSrc, setPrevSrc] = useState(src);
  const [imgSrc, setImgSrc] = useState<string>(src || DEFAULT_FALLBACK);

  if (src !== prevSrc) {
    setPrevSrc(src);
    setImgSrc(src || DEFAULT_FALLBACK);
  }

  return (
    <Image
      {...props}
      src={imgSrc}
      alt={alt}
      onError={() => {
        if (imgSrc !== DEFAULT_FALLBACK) {
          setImgSrc(DEFAULT_FALLBACK);
        }
      }}
    />
  );
};
