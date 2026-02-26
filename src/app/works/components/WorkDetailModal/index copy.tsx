// src / app / works / components / WorkDetailModal / index.tsx;
"use client";

import React from "react";
import Image from "next/image";
import {
  X,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Github,
} from "lucide-react";
import { Work } from "@/types/work";
import styles from "./WorkDetailModal.module.scss";
import { BaseTag } from "@/components/ui/BaseTag";

// 規約：interface を禁止し、すべて type で定義 [cite: 7, 402, 425]
type WorkDetailModalProps = {
  isOpen: boolean;
  onClose: () => void;
  work: Work;
  allFilteredWorks: Work[];
  onNavigate: (work: Work) => void;
  // コンテキスト（トップ or WORKS）に応じた振る舞いを外部から注入する
  onCategoryClick: (category: string) => void;
  onTagClick: (tag: string) => void;
};

/**
 * 実績詳細モーダルコンポーネント
 * 自身の振る舞い（遷移か、状態更新か）を知らず、Props を描画・実行することに特化します。
 */
export const WorkDetailModal = ({
  isOpen,
  onClose,
  work,
  allFilteredWorks,
  onNavigate,
  onCategoryClick,
  onTagClick,
}: WorkDetailModalProps) => {
  // モーダルが閉じている場合は何もレンダリングしない
  if (!isOpen) return null;

  // 前後の実績へのナビゲーションロジック [cite: 3, 381]
  const currentIndex = allFilteredWorks.findIndex((w) => w.id === work.id);
  const prevWork = allFilteredWorks[currentIndex - 1];
  const nextWork = allFilteredWorks[currentIndex + 1];

  // NDA案件のサムネイル判定ロジック [cite: 11, 150, 427]
  const displayThumbnail =
    work.disclosureLevel === "NDA"
      ? "/assets/images/common/noimage.jpg"
      : work.thumbnail;

  return (
    <div className={styles.root} role="dialog" aria-modal="true">
      {/* 背景オーバーレイ：クリックで閉じる [cite: 138] */}
      <div className={styles.overlay} onClick={onClose} aria-hidden="true" />

      {/* モーダルコンテンツ本体 */}
      <div className={styles.content}>
        {/* 閉じるボタン */}
        <button
          type="button"
          onClick={onClose}
          className={styles.closeBtn}
          aria-label="モーダルを閉じる"
        >
          <X size={24} />
        </button>

        <div className={styles.inner}>
          {/* 左側：ビジュアルエリア */}
          <div className={styles.visualArea}>
            <div className={styles.imageWrapper}>
              <Image
                src={displayThumbnail}
                alt={work.title}
                fill
                sizes="(max-width: 840px) 100vw, 600px"
                className={styles.image}
                priority
              />
            </div>
          </div>

          {/* 右側：テキスト情報エリア */}
          <div className={styles.infoArea}>
            {/* カテゴリー：親から注入された関数を実行 */}
            <div className={styles.categories}>
              {work.category.map((cat) => (
                <BaseTag
                  key={cat}
                  shape="tag"
                  onClick={() => onCategoryClick(cat)}
                >
                  {cat}
                </BaseTag>
              ))}
            </div>

            <h2 className={styles.title}>{work.title}</h2>
            <p className={styles.description}>{work.description}</p>

            {/* 基本情報（ role / duration ） [cite: 427] */}
            <dl className={styles.specList}>
              <div className={styles.specItem}>
                <dt className={styles.specLabel}>担当範囲</dt>
                <dd className={styles.specValue}>{work.role}</dd>
              </div>
              <div className={styles.specItem}>
                <dt className={styles.specLabel}>制作期間</dt>
                <dd className={styles.specValue}>{work.duration}</dd>
              </div>
            </dl>

            {/* スキルタグ：親から注入された関数を実行 */}
            <div className={styles.tags}>
              {work.tags.map((tag) => (
                <BaseTag
                  key={tag}
                  shape="tag"
                  hasHash
                  onClick={() => onTagClick(tag)}
                >
                  # {tag}
                </BaseTag>
              ))}
            </div>

            {/* 外部リンクエリア */}
            <div className={styles.links}>
              {work.url && (
                <a
                  href={work.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  <ExternalLink size={18} />
                  <span>Visit Site</span>
                </a>
              )}
              {work.github && (
                <a
                  href={work.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  <Github size={18} />
                  <span>View Code</span>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* ナビゲーションフッター：前後の実績への移動 [cite: 3, 140, 383] */}
        <div className={styles.footerNav}>
          <button
            type="button"
            onClick={() => prevWork && onNavigate(prevWork)}
            disabled={!prevWork}
            className={styles.navBtn}
          >
            <ChevronLeft size={20} />
            <span>PREV</span>
          </button>

          <div className={styles.counter}>
            <span className={styles.current}>{currentIndex + 1}</span>
            <span className={styles.separator}>/</span>
            <span className={styles.total}>{allFilteredWorks.length}</span>
          </div>

          <button
            type="button"
            onClick={() => nextWork && onNavigate(nextWork)}
            disabled={!nextWork}
            className={styles.navBtn}
          >
            <span>NEXT</span>
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};
