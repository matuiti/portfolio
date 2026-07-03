import { useEffect, useState, RefObject } from 'react';

type UseIframeContentHeightResult = {
  height: number;
  isCalculated: boolean;
};

/**
 * containerRef配下のiframe要素を見つけ、その中のコンテンツの実際の高さを監視する。
 * ※ urlが変わった際のリセットは、呼び出し側で key を使ってコンポーネントをリマウントすることで担保する。
 */
export function useIframeContentHeight(
  containerRef: RefObject<HTMLElement | null>,
): UseIframeContentHeightResult {
  const [height, setHeight] = useState(0);
  const [isCalculated, setIsCalculated] = useState(false);

  useEffect(() => {
    const iframe = containerRef.current?.querySelector('iframe');
    if (!(iframe instanceof HTMLIFrameElement)) return;
    let observer: ResizeObserver | null = null;

    const attach = () => {
      try {
        const iframeHtmlElement =
          iframe.contentWindow?.document.documentElement;
        if (!iframeHtmlElement) return;

        observer = new ResizeObserver((entries) => {
          const h =
            entries[0]?.contentRect.height ?? iframeHtmlElement.scrollHeight;

          if (h > 0 && h < 3000) {
            setHeight(h);
            setIsCalculated(true);
          }
        });
        observer.observe(iframeHtmlElement);
      } catch {
        setIsCalculated(true);
      }
    };

    iframe.addEventListener('load', attach);
    attach();

    return () => {
      iframe.removeEventListener('load', attach);
      observer?.disconnect();
    };
  }, [containerRef]);

  return { height, isCalculated };
}
