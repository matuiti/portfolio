'use client';
import { useState } from 'react';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { MainButton } from '@/components/ui/Buttons/MainButton';
import { GalleryUIPart } from '@/types/gallery';
import { UI_PARTS } from '@/data/gallery-parts';
import { PreviewModal } from '@/gallery/components/Card/preview/PreviewModal';
import { CardSlider } from './CardSlider';
import styles from './GallerySection.module.css';

const MESSAGE = `ギャラリーのカードからは、概要・コード・レスポンシブの表示をご確認いただけます。
プレビュー内のパーツの使用言語は、ピュアなHTML・CSS（SASS）・JavaScriptです。
独立したサンドボックス環境からiframeタグで読み込み出力しています。

※現状のパーツは表示確認用です。正式版は近日公開致します。`;

const SELECT_IDS = ['modal03', 'card-new', 'primary-btn4'];
const GALLERY_CARDS = UI_PARTS.filter((item) => SELECT_IDS.includes(item.id));

export const GallerySection = () => {
  const [selectedUIPart, setSelectedUIPart] = useState<GalleryUIPart | null>(
    null,
  );

  return (
    <section id='gallery' className='-scroll-mt-2'>
      <div className='section-padding-y section-padding-x bg-light-gray'>
        <div className='container-center'>
          <div className={styles.sectionHead}>
            <SectionTitle
              enTitle='gallery'
              jpTitle='UIギャラリー'
              variant='default'
              className='js-fuwa-fade'
            />
            <p className={`${styles.description} js-fuwa-fade`}>{MESSAGE}</p>
          </div>

          <div className={`${styles.body} js-fuwa-fade`}>
            {GALLERY_CARDS.length > 0 ? (
              <CardSlider
                cards={GALLERY_CARDS}
                setSelectedUIPart={setSelectedUIPart}
              />
            ) : (
              'アイテムが見つかりません'
            )}

            <div className={`${styles.buttonWrapper} js-fuwa-fade`}>
              <MainButton variant='long' href='/gallery'>
                一覧を見る
              </MainButton>
            </div>
          </div>
          {selectedUIPart && (
            <PreviewModal
              key={selectedUIPart.id}
              isOpen={!!selectedUIPart}
              onClose={() => setSelectedUIPart(null)}
              currentItem={selectedUIPart}
              allFilteredItems={GALLERY_CARDS}
              onNavigate={setSelectedUIPart}
            />
          )}
        </div>
      </div>
    </section>
  );
};
