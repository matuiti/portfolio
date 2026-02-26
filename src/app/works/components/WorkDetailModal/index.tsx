// src/app/works/components/WorkDetailModal/index.tsx
// src/app/works/components/WorkDetailModal/index.tsx
"use client";

import React, { useEffect, useRef, Dispatch, SetStateAction } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Work } from "@/types/work";
import styles from "./WorkDetailModal.module.scss";

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
      >
        {/* ヘッダーセクション */}
        <header className={styles.header}>
          {/* 左側：ページナビゲーションエリア */}
          <div className={styles.navGroup}>
            {/* ページ番号（SP/PCで順番が変わる対象1） */}
            <div className={styles.pageCounter}>
              <span className={styles.current}>{displayIndex}</span>
              <span className={styles.separator}>/</span>
              <span className={styles.total}>{totalCount}</span>
            </div>

            {/* 前へボタン（SP/PCで順番が変わる対象2） */}
            <button
              className={styles.navButton}
              onClick={() => prevWork && onNavigate(prevWork)}
              disabled={!prevWork}
              aria-label="前へ"
            >
              <ChevronLeft size={24} />
            </button>

            {/* 次へボタン（SP/PCで順番が変わる対象3） */}
            <button
              className={styles.navButton}
              onClick={() => nextWork && onNavigate(nextWork)}
              disabled={!nextWork}
              aria-label="次へ"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* 右側：閉じるボタン */}
          <button
            className={styles.closeButton}
            onClick={onClose}
            aria-label="閉じる"
          >
            <span className={styles.closeText}>CLOSE</span>
            <X size={20} strokeWidth={1.5} />
          </button>
        </header>

        <article className={styles.article}>
          <div className={styles.layoutBody}>
            {/* ビジュアルエリア */}
            <div className={styles.imageSection}>
              <div className={styles.imageWrapper}>
                <Image
                  src={work.thumbnail}
                  alt={work.title}
                  width={1200}
                  height={675}
                  className={styles.mainImage}
                  priority
                />
              </div>
            </div>

            {/* テキスト詳細エリア */}
            <div className={styles.infoSection}>
              <div className={styles.categoryList}>
                {work.category.map((cat) => (
                  <button
                    key={cat}
                    className={styles.categoryTag}
                    onClick={() => onCategoryClick(cat)}
                  >
                    {cat.toUpperCase()}
                  </button>
                ))}
              </div>

              <h2 className={styles.title}>{work.title}</h2>

              <dl className={styles.metaTable}>
                <div className={styles.metaRow}>
                  <dt className={styles.metaLabel}>担当範囲</dt>
                  <dd className={styles.metaValue}>{work.role}</dd>
                </div>
                <div className={styles.metaRow}>
                  <dt className={styles.metaLabel}>制作期間</dt>
                  <dd className={styles.metaValue}>{work.duration}</dd>
                </div>
                <div className={styles.metaRow}>
                  <dt className={styles.metaLabel}>公開範囲</dt>
                  <dd className={styles.metaValue}>
                    {work.disclosureLevel === "NDA"
                      ? "非公開（守秘義務）"
                      : "一般公開"}
                  </dd>
                </div>
              </dl>

              <section className={styles.section}>
                <h3 className={styles.sectionTitle}>PROJECT DESCRIPTION</h3>
                <p className={styles.description}>{work.description}</p>
                {work.url && work.disclosureLevel !== "NDA" && (
                  <div className={styles.linkWrapper}>
                    <a
                      href={work.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.siteLink}
                    >
                      VISIT SITE
                    </a>
                  </div>
                )}
              </section>

              <section className={styles.section}>
                <h3 className={styles.sectionTitle}>TECH STACK</h3>
                <div className={styles.tagGrid}>
                  {work.tags.map((tag) => (
                    <button
                      key={tag}
                      className={styles.techTag}
                      onClick={() => onTagClick(tag)}
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};