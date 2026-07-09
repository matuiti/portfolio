'use client';
import { useState, useRef, useEffect } from 'react';
import { useLazyIframe } from '@/gallery/lib/hooks/useLazyIframe';

type PreviewFrameProps = {
  url: string;
};

export const PreviewFrame = ({ url }: PreviewFrameProps) => {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>(
    'loading',
  );

  const { containerRef, isInView } = useLazyIframe('100px');
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const stateRef = useRef({ status, isInView });
  useEffect(() => {
    stateRef.current = { status, isInView };
  }, [status, isInView]);

  // 事前のファイル存在チェック
  useEffect(() => {
    const { status: currentStatus, isInView: currentInView } = stateRef.current;

    if (!currentInView && currentStatus !== 'loading') return;
    if (currentStatus !== 'loading') return;

    let isMounted = true;
    const checkFileExists = async () => {
      try {
        const response = await fetch(url, { method: 'HEAD' });
        if (!isMounted) return;

        if (response.ok) {
          setStatus('success');
        } else {
          setStatus('error');
        }
      } catch {
        if (!isMounted) return;
        setStatus('error');
      }
    };

    checkFileExists();

    return () => {
      isMounted = false;
    };
  }, [url]);

  // タイムアウト監視
  useEffect(() => {
    if (status !== 'loading') return;
    const timer = setTimeout(() => setStatus('error'), 10000);
    return () => clearTimeout(timer);
  }, [status]);

  return (
    <div
      ref={containerRef}
      className='relative w-full h-full overflow-hidden flex items-center justify-center'
    >
      {/* ローディングUI */}
      {status === 'loading' && (
        <div className='absolute inset-0 flex flex-col items-center justify-center bg-neutral-50 z-20'>
          <div className='w-10 h-10 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin mb-4' />
          <span className='text-[calc(24/16*1rem)] font-black text-neutral-400 uppercase tracking-widest animate-pulse'>
            Rendering...
          </span>
        </div>
      )}

      {/* エラーUI */}
      {status === 'error' && (
        <div className='absolute inset-0 flex flex-col items-center justify-center z-20 text-center h-auto'>
          <svg
            className='w-10 h-10 text-red mb-2'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 40 40'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
            />
          </svg>
          <span className='text-[calc(24/16*1rem)] font-bold text-dark-gray uppercase'>
            パーツの取得に失敗
          </span>
        </div>
      )}

      {/* iframe表示エリア */}
      {status !== 'error' && (
        <div className='relative flex items-center justify-center w-full h-full transition-transform duration-500'>
          <iframe
            ref={iframeRef}
            src={url}
            className={`p-[0.8em] bg-medium-gray w-full h-full border-none transition-opacity duration-700 ${
              status === 'success' ? 'opacity-100' : 'opacity-0'
            }`}
            sandbox='allow-scripts allow-same-origin'
            title='UI Part Preview'
          />
        </div>
      )}
    </div>
  );
};