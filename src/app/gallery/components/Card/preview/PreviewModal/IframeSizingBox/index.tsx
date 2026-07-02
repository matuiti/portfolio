'use client';
import { useRef } from 'react';
import { useIframeContentHeight } from '@/gallery/lib/hooks/useIframeContentHeight';
import { PreviewFrame } from '../../PreviewFrame';

type IframeSizingBoxProps = {
  url: string;
  viewportWidth: number;
};

export const IframeSizingBox = ({
  url,
  viewportWidth,
}: IframeSizingBoxProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { height: contentHeight } = useIframeContentHeight(containerRef);

  return (
    <div
      ref={containerRef}
      style={{
        width: `${viewportWidth}px`,
        ...(contentHeight > 0 ? { height: `${contentHeight}px` } : {}),
      }}
      className='relative min-h-full max-w-none shrink-0 transition-[width] duration-300 ease-out flex items-center'
    >
      <PreviewFrame url={url} />
    </div>
  );
};
