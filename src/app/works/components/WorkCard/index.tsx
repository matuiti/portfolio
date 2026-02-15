// src/app/works/components/WorkCard/index.tsx

"use client";

import React, { memo, useState, useEffect } from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { Work, WorkFilterCategory } from "@/types/work";
import { useWorkStore } from "@/store/useWorkStore";

type Props = {
  work: Work;
  onClick: () => void;
  onCategoryClick?: (cat: WorkFilterCategory) => void;
};

// パス定義
const NDA_THUMBNAIL_PATH = "/assets/images/common/noimage.jpg";
const PLACEHOLDER_THUMBNAIL_PATH = "/assets/images/common/noimage.jpg";

export const WorkCard = memo(({ work, onClick, onCategoryClick }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const selectOnlyCategory = useWorkStore((state) => state.selectOnlyCategory);
  const isWorksPage = pathname.startsWith("/works");

  const [isTagHovered, setIsTagHovered] = useState(false);

  /**
   * 画像のソースを管理するステート
   * 初期値の決定ロジック：
   * 1. NDA案件なら専用画像
   * 2. サムネイルが未設定（空文字など）ならプレースホルダー
   * 3. それ以外は設定されたサムネイル
   */
  const initialSrc =
    work.disclosureLevel === "NDA"
      ? NDA_THUMBNAIL_PATH
      : work.thumbnail || PLACEHOLDER_THUMBNAIL_PATH;

  const [imgSrc, setImgSrc] = useState(initialSrc);

  // フィルタリング等で work が切り替わった際に画像をリセット
  useEffect(() => {
    setImgSrc(initialSrc);
  }, [initialSrc]);

  const handleCategoryClick = (e: React.MouseEvent, cat: string) => {
    e.stopPropagation();
    if (onCategoryClick) {
      onCategoryClick(cat as WorkFilterCategory);
      return;
    }
    if (isWorksPage) {
      selectOnlyCategory(cat as WorkFilterCategory);
    } else {
      router.push(`/works?category=${encodeURIComponent(cat)}`);
    }
  };

  return (
    <article
      onClick={onClick}
      className={`group flex flex-col bg-white overflow-hidden transition-all duration-500 cursor-pointer shadow-card rounded-lg ${
        !isTagHovered ? "hover:shadow-none" : ""
      }`}
    >
      {/* 上部：サムネイルエリア */}
      <div className="relative aspect-video overflow-hidden bg-gray">
        <Image
          src={imgSrc}
          alt={work.title}
          fill
          className={`object-cover transition-transform duration-700 ${
            !isTagHovered ? "group-hover:scale-110" : ""
          }`}
          // パスの間違いなどで読み込みエラーが発生した際にプレースホルダーに差し替える
          onError={() => setImgSrc(PLACEHOLDER_THUMBNAIL_PATH)}
        />

        {/* 「詳しく見る」オーバーレイ */}
        <div
          className={`absolute inset-0 bg-menu-backdrop flex items-center justify-center transition-opacity duration-500 z-image-overlay ${
            !isTagHovered ? "opacity-0 group-hover:opacity-100" : "opacity-0"
          }`}
        >
          <span className="text-white text-[calc(18/16*1rem)]">詳しく見る</span>
        </div>
      </div>

      {/* 下部：情報エリア (既存のスタイルを維持) */}
      <div className="flex flex-col flex-1 pt-[calc(28/16*1rem)] px-[calc(16/16*1rem)] pb-[calc(16/16*1rem)] gap-4">
        <div
          className="flex flex-wrap gap-2 relative"
          onMouseEnter={() => setIsTagHovered(true)}
          onMouseLeave={() => setIsTagHovered(false)}
        >
          {work.category.map((cat) => (
            <span
              key={cat}
              onClick={(e) => handleCategoryClick(e, cat)}
              className="text-[calc(12/16*1rem)] bg-light-gray hover:bg-gray hover:text-white transition cursor-pointer py-1 px-3"
            >
              {cat}
            </span>
          ))}
        </div>

        <h3 className="text-[calc(18/16*1rem)] leading-tight">{work.title}</h3>

        <p className="text-[calc(16/16*1rem)] line-clamp-2 leading-normal">
          {work.summary}
        </p>

        <div className="mt-auto  border-t border-light-gray flex flex-wrap gap-x-5 gap-y-2.5 text-[calc(12/16*1rem)] text-gray">
          <div className="flex">
            <span className="shrink-0">担当範囲：</span>
            <span>{work.role}</span>
          </div>
          <div className="flex">
            <span className="shrink-0">制作期間：</span>
            <span>{work.duration}</span>
          </div>
        </div>
      </div>
    </article>
  );
});

WorkCard.displayName = "WorkCard";
