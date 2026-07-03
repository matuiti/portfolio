'use client';
import { useEffect, useRef, useState } from 'react';
import { IndicatorBox } from './IndicatorBox';
import { ModalNavigation } from './ModalNavigation';
import { GalleryUIPart } from '@/types/gallery';
import { PREVIEW_MODAL_SETTINGS } from '@/gallery/data';
import { useModalNavigation } from '@/gallery/lib/hooks/useModalNavigation';
import { CloseModal } from '@/components/ui/Icons/CloseModal';
import { IframeSizingBox } from './IframeSizingBox';
import { LabelWithCounter } from './LabelWithCounter';
import { ModalNavWithCounter } from './ModalNavWithCounter';

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
        w-[88.6%] max-w-225 h-[68%]
        p-0 border-none bg-transparent
        backdrop:bg-[rgba(0,0,0,0.8)]
        animate-in fade-in zoom-in-95 duration-300
      `}
      onClick={(e) => e.target === dialogRef.current && onClose()}
    >
      <div className='flex flex-col h-full w-full'>
        <header className='shrink-0 flex items-center justify-between tablet:bg-white gap-2.5 overflow-hidden rounded-t-none tablet:rounded-t-[calc(20/16*1rem)] tablet:py-2.5  tablet:px-7.5'>
          <div className='flex-1 flex flex-row justify-between'>
            <div className='block tablet:hidden'>
              <ModalNavWithCounter
                onPrev={goToPrev}
                onNext={goToNext}
                hasPrev={hasPrev}
                hasNext={hasNext}
                currentIndex={currentIndex}
                totalCount={totalCount}
                color='text-dark-gray'
              />
            </div>
            <div className='hidden tablet:block'>
              <LabelWithCounter
                currentIndex={currentIndex}
                totalCount={totalCount}
                color='text-black'
              />
            </div>

            <div className='hidden tablet:block'>
              <ModalNavigation
                onPrev={goToPrev}
                onNext={goToNext}
                hasPrev={hasPrev}
                hasNext={hasNext}
              />
            </div>
          </div>
          <button
            onClick={onClose}
            className='rounded-[50%] overflow-hidden'
            aria-label='Close modal'
          >
            <CloseModal />
          </button>
        </header>

        {/* 情報エリア */}
        <div className='py-5 px-3.75 mobile:px-5 tablet:px-7.5 small:px-10 bg-light-gray flex flex-col justify-between gap-5 tablet:flex-row tablet:items-end overflow-hidden rounded-t-[calc(20/16*1rem)] tablet:rounded-t-none'>
          {/* タイトルボックス */}
          <div>
            <span className='inline-block mb-3 text-dark-gray leading-none text-[calc(12/16*1rem)]'>
              カテゴリー：{currentItem.category}
            </span>
            <h3 className='text-black leading-none text-[calc(18/16*1rem)] tablet:text-[calc(24/16*1rem)]'>
              {currentItem.title}
            </h3>
          </div>
          <div className='w-full tablet:w-auto'>
            <IndicatorBox value={viewportWidth} onChange={setViewportWidth} />
          </div>
        </div>

        {/* プレビューパネル */}
        <div className='pb-5 px-3.75 mobile:px-5 tablet:px-7.5 small:px-10 flex-1 bg-light-gray relative overflow-hidden flex flex-col rounded-b-[calc(20/16*1rem)]'>
          <div className='absolute inset-0 z-0' />

          <div className='flex-1 relative z-10 p-4 small:p-10 flex items-start bg-white overflow-auto'>
            <IframeSizingBox
              key={currentUrl}
              url={currentUrl}
              viewportWidth={viewportWidth}
            />
          </div>
        </div>
      </div>
    </dialog>
  );
};
