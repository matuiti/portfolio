'use client';
import { useEffect, useRef, useState } from 'react';
import { IndicatorBox } from './IndicatorBox';
import { ModalNavigation } from './ModalNavigation';
import { GalleryUIPart } from '@/types/gallery';
import { PREVIEW_MODAL_SETTINGS } from '@/gallery/data';
import { useModalNavigation } from '@/gallery/lib/hooks/useModalNavigation';
import { PreviewFrame } from '../PreviewFrame';
import { CloseModal } from '@/components/ui/Icons/CloseModal';

type PreviewModalProps = {
  isOpen: boolean;
  onClose: () => void;
  currentItem: GalleryUIPart;
  allFilteredItems: GalleryUIPart[];
  onNavigate: (item: GalleryUIPart) => void;
};

export const PreviewModal = ({
  isOpen,
  onClose,
  currentItem,
  allFilteredItems,
  onNavigate,
}: PreviewModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const currentUrl = `/gallery-parts/ui/${currentItem.category}/${currentItem.id}/index.html`;

  const [viewportWidth, setViewportWidth] = useState<number>(
    PREVIEW_MODAL_SETTINGS.DEFAULT_WIDTH,
  );

  const { hasPrev, hasNext, goToPrev, goToNext, currentIndex, totalCount } =
    useModalNavigation({
      currentItem,
      allItems: allFilteredItems,
      onNavigate,
      isOpen,
    });

  // モーダル開閉と背面スクロール禁止の制御
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal();
        document.body.style.overflow = 'hidden';
        console.log(1);
        return;
      }
    } else {
      dialog.close();
      document.body.style.overflow = 'unset';
      console.log(2);
      return;
    }

    return () => {
      document.body.style.overflow = 'unset';
      console.log(3);
    };
  }, [isOpen]);

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      className={`
        fixed inset-0 m-auto
        flex items-center justify-center
        w-[88.6%] max-w-225
        p-0 border-none bg-transparent
        backdrop:bg-[rgba(0,0,0,0.8)]
        animate-in fade-in zoom-in-95 duration-300
      `}
      onClick={(e) => e.target === dialogRef.current && onClose()}
    >
      <div className='flex flex-col h-full w-full'>
        {/* ヘッダーセクション */}
        <header className='shrink-0 flex flex-wrap items-center justify-between px-6 py-4 tablet:bg-white gap-4 z-20 overflow-hidden rounded-t-none tablet:rounded-t-[calc(20/16*1rem)]'>
          <div className='flex items-center gap-6'>
            <span className='text-xs text-neutral-400 bg-neutral-100 px-2 py-1 rounded'>
              {currentIndex + 1} / {totalCount}
            </span>
          </div>

          <div className='flex items-center gap-4'>
            <ModalNavigation
              onPrev={goToPrev}
              onNext={goToNext}
              hasPrev={hasPrev}
              hasNext={hasNext}
            />

            <div className='w-px h-6 bg-neutral-200 mx-2' />

            <button
              onClick={onClose}
              className='rounded-[50%] overflow-hidden'
              aria-label='Close modal'
            >
              <CloseModal />
            </button>
          </div>
        </header>

        {/* 情報エリア */}
        <div className='py-5 px-3.75 mobile:px-5 tablet:px-7.5 small:px-10 bg-light-gray flex flex-col justify-between gap-5 tablet:flex-row tablet:items-end overflow-hidden rounded-t-[calc(20/16*1rem)] tablet:rounded-t-none'>
          {/* タイトルボックス */}
          <div>
            <span className='mb-3 text-dark-gray leading-none text-[calc(12/16*1rem)]'>
              カテゴリー：{currentItem.category}
            </span>
            <h3 className='text-black leading-none text-[calc(18/16*1rem)] tablet:text-[calc(24/16*1rem)]'>
              {currentItem.title}
            </h3>
          </div>
          <div>
            <IndicatorBox value={viewportWidth} onChange={setViewportWidth} />
          </div>
        </div>

        {/* プレビューパネル */}
        <div className='pb-5 px-3.75 mobile:px-5 tablet:px-7.5 small:px-10 flex-1 bg-light-gray relative overflow-hidden flex flex-col rounded-b-[calc(20/16*1rem)]'>
          <div className='absolute inset-0 z-0' />

          <div className='flex-1 relative z-10 p-4 small:p-10 flex items-center justify-start overflow-auto'>
            <div
              style={{ width: `${viewportWidth}px` }}
              className='relative h-full max-w-none shrink-0 transition-[width] duration-300 ease-out bg-white flex items-center'
            >
              <PreviewFrame url={currentUrl} />
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
};
