'use client';
import { useState, useRef, useEffect } from 'react';
import { useLazyIframe } from '@/gallery/lib/hooks/useLazyIframe';

type PreviewFrameProps = {
  url: string;
  onLoadSuccess?: () => void;
};

export const PreviewFrame = ({ url, onLoadSuccess }: PreviewFrameProps) => {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>(
    'loading',
  );
  const [prevUrl, setPrevUrl] = useState(url);

  const { containerRef, isInView } = useLazyIframe('100px');
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // 安全に onLoadSuccess を呼ぶためのRef
  const onLoadSuccessRef = useRef(onLoadSuccess);
  useEffect(() => {
    onLoadSuccessRef.current = onLoadSuccess;
  }, [onLoadSuccess]);

  if (url !== prevUrl) {
    setPrevUrl(url);
    setStatus('loading');
  }

  // 事前のファイル存在チェック
  useEffect(() => {
    // SP版のタブ切り替えに対応するため、「画面内に入った(isInView)」または「URLが新しく切り替わった直後(status === 'loading')」であれば、
    // Observerの誤判定を無視して強制的に fetch を開始するマージ（結合）条件にします。
    if (!isInView && status !== 'loading') return;

    const checkFileExists = async () => {
      try {
        const response = await fetch(url, { method: 'HEAD' });

        if (response.ok) {
          setStatus('success');
          onLoadSuccessRef.current?.();
        } else {
          setStatus('error');
          onLoadSuccessRef.current?.();
        }
      } catch {
        setStatus('error');
        onLoadSuccessRef.current?.();
      }
    };

    checkFileExists();
  }, [url, isInView, status]);

  // タイムアウト監視
  useEffect(() => {
    if (status !== 'loading') return; // ここも isInView 縛りを緩めて安全に
    const timer = setTimeout(() => setStatus('error'), 10000);
    return () => clearTimeout(timer);
  }, [status]);

  return (
    <div
      ref={containerRef}
      className='relative w-full h-full bg-white overflow-hidden flex items-center justify-center'
    >
      {/* ローディングUI */}
      {status === 'loading' && (
        <div className='absolute inset-0 flex flex-col items-center justify-center bg-neutral-50 z-20'>
          <div className='w-8 h-8 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin mb-4' />
          <span className='text-[10px] font-black text-neutral-400 uppercase tracking-widest animate-pulse'>
            Rendering...
          </span>
        </div>
      )}

      {/* エラーUI */}
      {status === 'error' && (
        <div className='absolute inset-0 flex flex-col items-center justify-center bg-neutral-50 z-20 p-4 text-center'>
          <svg
            className='w-8 h-8 text-neutral-300 mb-2'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
            />
          </svg>
          <span className='text-[10px] font-bold text-neutral-400 uppercase'>
            Preview not available
          </span>
        </div>
      )}

      {/* iframe表示エリア */}
      {status !== 'error' && (
        <div className='relative flex items-center justify-center w-full h-full transition-transform duration-500'>
          <iframe
            key={url}
            ref={iframeRef} // refを付与することでマイクロタスクになり、Reactの内部処理と同タイミング（一塊）で処理される（外すと一部のアニメーションがもたつきます）
            src={url}
            className={`w-full h-full border-none transition-opacity duration-700 ${
              status === 'success' ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={onLoadSuccess}
            sandbox='allow-scripts allow-same-origin'
            title='UI Part Preview'
          />
        </div>
      )}
    </div>
  );
};
