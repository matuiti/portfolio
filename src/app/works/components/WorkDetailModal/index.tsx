// src/app/works/components/WorkDetailModal/index.tsx
"use client";

import {
  useEffect,
  useRef,
  Dispatch,
  SetStateAction,
  useState,
  useMemo,
} from "react";
// import Image from "next/image";
import { Work } from "@/types/work";
import styles from "./WorkDetailModal.module.scss";
import { CloseModal } from "@/components/ui/Icons/CloseModal";
import {
  CarouselArrowRight,
  GitHub,
  KeyboardArrowRight,
  Launch,
} from "@/components/ui/Icons";
import { BaseTag } from "@/components/ui/BaseTag";
import { SubButton } from "@/components/ui/Buttons/SubButton";
import { SafeImage } from "@/components/ui/SafeImage";

type WorkDetailModalProps = {
  work: Work;
  isOpen: boolean;
  onClose: () => void;
  allFilteredWorks: Work[];
  onNavigate: Dispatch<SetStateAction<Work | null>>;
  onCategoryClick: (cat: string) => void;
  onTagClick: (tag: string) => void;
};

export const WorkDetailModal = ({
  work,
  isOpen,
  onClose,
  allFilteredWorks,
  onNavigate,
  onCategoryClick,
  onTagClick,
}: WorkDetailModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // 1. スライド用のインデックス管理
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  // 2. 表示する画像リストの作成（NDA案件の場合はサムネイルのみに制限 [1, 2]）
  const imageList = useMemo(() => {
    // if (work.disclosureLevel === "NDA") return [work.thumbnail];
    // images 配列があればそれを使い、なければ thumbnail を使う
    return work.images && work.images.length > 0
      ? work.images
      : [work.thumbnail];
  }, [work]);

  const hasMultipleImages = imageList.length > 1;

  // 3. スライド操作関数
  const handlePrev = () => {
    setCurrentImgIndex((prev) => (prev > 0 ? prev - 1 : imageList.length - 1));
  };
  const handleNext = () => {
    setCurrentImgIndex((prev) => (prev < imageList.length - 1 ? prev + 1 : 0));
  };

  // --- ページネーション・ナビゲーションロジック ---
  const currentIndex = allFilteredWorks.findIndex((w) => w.id === work.id);
  const totalCount = allFilteredWorks.length;
  const displayIndex = currentIndex + 1; // 0始まりなので+1する

  const prevWork = currentIndex > 0 ? allFilteredWorks[currentIndex - 1] : null;
  const nextWork =
    currentIndex < allFilteredWorks.length - 1
      ? allFilteredWorks[currentIndex + 1]
      : null;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className={styles.overlay}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className={styles.modalContent}
        onClick={(e) => e.stopPropagation()}
        ref={modalRef}
        key={work.id}
      >
        <header className={styles.header}>
          <div className={styles.inner}>
            {/* 1. ラベル（タブレット以上で表示） */}
            <span className={styles.projectLabel}>該当プロジェクト</span>

            {/* 2. カウンター（SPではアローに挟まれ、PCでは左側へ） */}
            <div className={styles.counter}>
              <span className={styles.current}>{displayIndex}</span>
              <span className={styles.separator}>/</span>
              <span className={styles.total}>{totalCount}</span>
            </div>

            {/* 3. ナビゲーション（前へ） */}
            <button
              className={styles.prevBtn}
              onClick={() => prevWork && onNavigate(prevWork)}
              disabled={!prevWork}
            >
              <KeyboardArrowRight direction="left" />
            </button>

            {/* 縦の仕切り線（tablet以上で表示） */}
            <div className={styles.vLine} />

            {/* 4. ナビゲーション（次へ） */}
            <button
              className={styles.nextBtn}
              onClick={() => nextWork && onNavigate(nextWork)}
              disabled={!nextWork}
            >
              <KeyboardArrowRight />
            </button>

            {/* 5. 閉じるボタン */}
            <button className={styles.closeBtn} onClick={onClose}>
              <CloseModal color="white" size="xl" />
            </button>
          </div>
        </header>

        <article className={`${styles.article} section-padding-x py-5`}>
          <div className={styles.inner}>
            {/* 記事ヘッダーエリア */}
            <div className={styles.articleHead}>
              <div className={styles.categoryList}>
                {work.category.map((cat) => (
                  <BaseTag key={cat} onClick={() => onCategoryClick(cat)}>
                    {cat}
                  </BaseTag>
                ))}
              </div>
              {/* --- タイトル --- */}
              <h2 className={styles.title}>{work.title}</h2>
              {/* --- 外部リンク --- */}
              <div className={styles.linkWrapper}>
                <div className={styles.buttonGroup}>
                  {/* サイトリンク */}
                  {work.url && (
                    <SubButton
                      href={work.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      leftIcon={Launch}
                    >
                      サイトを見る
                    </SubButton>
                  )}

                  {/* GitHubリンク */}
                  {work.github && (
                    <SubButton
                      href={work.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      leftIcon={GitHub}
                    >
                      GitHub
                    </SubButton>
                  )}
                </div>

                {/* 閲覧用認証情報 */}
                {work.url && work.siteId && work.sitePassword && (
                  <div className={styles.authBox}>
                    <p>
                      <span className={styles.authLabel}>サイト閲覧ID：</span>
                      <span className={styles.authValue}>{work.siteId}</span>
                    </p>
                    <p>
                      <span className={styles.authLabel}>
                        サイト閲覧パスワード：
                      </span>
                      <span className={styles.authValue}>
                        {work.sitePassword}
                      </span>
                    </p>
                  </div>
                )}
              </div>
              {/* --- 外部リンクエリア〆 --- */}
            </div>

            {/* 画像エリア（複数枚ある時はスライダー） */}
            <div className={styles.imageSection}>
              <div className={styles.imageWrapper}>
                {/* スライダー本体 */}
                <div
                  className={styles.imageSlider}
                  style={{
                    transform: `translateX(-${currentImgIndex * 100}%)`,
                  }}
                >
                  {imageList.map((src, index) => (
                    <div
                      key={`${work.id}-img-${index}`}
                      className={styles.slide}
                    >
                      <SafeImage
                        src={src}
                        alt={`${work.title} - ${index + 1}`}
                        width={1200}
                        height={675}
                        className={styles.mainImage}
                        priority={index === 0}
                      />
                    </div>
                  ))}
                </div>

                {/* 複数枚ある場合のみ操作UIを表示 */}
                {hasMultipleImages && (
                  <>
                    <button
                      className={styles.slidePrev}
                      onClick={handlePrev}
                      aria-label="前の画像へ"
                    >
                      <CarouselArrowRight left />
                    </button>
                    <button
                      className={styles.slideNext}
                      onClick={handleNext}
                      aria-label="次の画像へ"
                    >
                      <CarouselArrowRight />
                    </button>
                  </>
                )}
              </div>

              {/* 画像の下に配置するインジケーターエリア */}
              {hasMultipleImages && (
                <div className={styles.indicatorContainer}>
                  <div className={styles.dotIndicator}>
                    {imageList.map((_, i) => (
                      <span
                        key={i}
                        className={`${styles.dot} ${i === currentImgIndex ? styles.isActive : ""}`}
                        onClick={() => setCurrentImgIndex(i)} // ドットクリックで移動可能に
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* テキスト詳細エリア */}
            <div className={styles.infoSection}>
              {/* 1. ご依頼の背景・課題 */}
              {work.background && (
                <section className={styles.section}>
                  <h3 className={styles.sectionTitle}>ご依頼の背景・課題</h3>
                  <p className={styles.description}>{work.background}</p>
                </section>
              )}
              {/* 2. 実装機能 */}
              {work.features && work.features.length > 0 && (
                <div className={styles.section}>
                  <h3 className={styles.sectionTitle}>実装機能</h3>
                  <ul className={styles.detailList}>
                    {work.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* 3. 制作のポイント */}
              {work.points && work.points.length > 0 && (
                <div className={styles.section}>
                  <h3 className={styles.sectionTitle}>制作のポイント</h3>
                  <ul className={styles.detailList}>
                    {work.points.map((point, index) => (
                      <li key={index}>{point}</li>
                    ))}
                  </ul>
                </div>
              )}
              {/* 4. 使用スキル */}
              <section className={styles.section}>
                <h3 className={styles.sectionTitle}>使用スキル</h3>
                <div className={styles.tagGrid}>
                  {work.tags.map((tag) => (
                    <BaseTag
                      key={tag}
                      className={styles.techTag}
                      onClick={() => onTagClick(tag)}
                      hasHash
                    >
                      # {tag}
                    </BaseTag>
                  ))}
                </div>
              </section>
              {/* 5. メタ情報 */}
              <dl className={styles.metaTable}>
                <div className={styles.metaRow}>
                  <dt className={styles.metaLabel}>担当範囲：</dt>
                  <dd className={styles.metaValue}>{work.role}</dd>
                </div>
                <div className={styles.metaRow}>
                  <dt className={styles.metaLabel}>制作期間：</dt>
                  <dd className={styles.metaValue}>{work.duration}</dd>
                </div>
                <div className={styles.metaRow}>
                  <dt className={styles.metaLabel}>公開範囲：</dt>
                  <dd className={styles.metaValue}>
                    {work.disclosureLevel === "NDA"
                      ? "非公開（守秘義務）"
                      : "一般公開"}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};
