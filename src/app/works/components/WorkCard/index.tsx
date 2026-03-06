// src/app/works/components/WorkCard/index.tsx
"use client";

import React, { memo, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Work, WorkFilterCategory } from "@/types/work";
import { useWorkStore } from "@/store/useWorkStore";
import { BaseTag } from "@/components/ui/BaseTag";
import { SafeImage } from "@/components/ui/SafeImage";

type Props = {
  work: Work;
  onClick: () => void;
  onCategoryClick?: (cat: WorkFilterCategory) => void;
  className?: string;
};

// パス定義
const NDA_THUMBNAIL_PATH = "/assets/images/common/noimage.jpg";
const PLACEHOLDER_THUMBNAIL_PATH = "/assets/images/common/noimage.jpg";

export const WorkCard = memo(
  ({ work, onClick, onCategoryClick, className }: Props) => {
    const router = useRouter();
    const pathname = usePathname();
    const selectOnlyCategory = useWorkStore(
      (state) => state.selectOnlyCategory,
    );
    const isWorksPage = pathname.startsWith("/works");

    const [isTagHovered, setIsTagHovered] = useState(false);

    // 画像決定ロジック
    const initialSrc = (() => {
      const hasThumbnail = !!work.thumbnail;
      const hasImages = !!(work.images && work.images.length > 0);

      // 1. まず「具体的な画像」が登録されているかをチェック（thumbnail > images[0]）
      // NDA案件であっても、見せられる画像（抽象化済み等）が登録されていればそれを優先します
      if (hasThumbnail) return work.thumbnail!;
      if (hasImages) return work.images![0];

      // 2. 画像が一切登録されていない場合のフォールバック
      // 画像がない場合に初めて、NDAかどうかの判定を行います
      if (work.disclosureLevel === "NDA") {
        return NDA_THUMBNAIL_PATH;
      }

      // 3. NDAでもなく、画像もない場合はプレースホルダー
      return PLACEHOLDER_THUMBNAIL_PATH;
    })();

    // ホバー時のテキストもこれに連動させるのが自然です
    const hoveredText =
      work.disclosureLevel === "NDA"
        ? "非公開実績"
        : "詳しく見る";

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
        className={`group flex flex-col overflow-hidden cursor-pointer shadow-card rounded-lg ${
          !isTagHovered ? "hover:shadow-none" : ""
        } ${className || ""}
        }`}
      >
        {/* 上部：サムネイルエリア */}
        <div className="relative aspect-video overflow-hidden bg-white">
          <SafeImage
            src={initialSrc}
            alt={work.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={`object-cover transition-transform duration-700 ${
              !isTagHovered ? "group-hover:scale-110" : ""
            }`}
          />

          {/* 「詳しく見る」オーバーレイ */}
          <div
            className={`absolute inset-0 bg-menu-backdrop flex items-center justify-center transition-opacity duration-500 z-image-overlay ${
              !isTagHovered ? "opacity-0 group-hover:opacity-100" : "opacity-0"
            }`}
          >
            <span className="text-white text-[calc(18/16*1rem)]">
              {hoveredText}
            </span>
          </div>
        </div>

        {/* 下部：情報エリア (既存のスタイルを維持) */}
        <div
          className={`bg-white flex flex-col flex-1 pt-[calc(20/16*1rem)] px-[calc(16/16*1rem)] pb-[calc(16/16*1rem)] ${
            !isTagHovered ? "group-hover:bg-light-gray" : ""
          }`}
        >
          <div
            className="mb-4 flex flex-wrap gap-2 relative"
            onMouseEnter={() => setIsTagHovered(true)}
            onMouseLeave={() => setIsTagHovered(false)}
          >
            {work.category.map((cat) => (
              <BaseTag
                key={cat}
                shape="tag"
                onClick={(e) => handleCategoryClick(e, cat)}
              >
                {cat}
              </BaseTag>
            ))}
          </div>

          <h3 className="mb-4 text-[calc(18/16*1rem)] leading-tight  line-clamp-2">
            {work.title}
          </h3>

          <p className="text-[calc(16/16*1rem)] line-clamp-2 leading-normal">
            {work.summary}
          </p>

          <div className="mt-auto">
            <div className="mt-4  border-t border-medium-gray pt-4 flex flex-col gap-y-2.5 text-[calc(12/16*1rem)] text-dark-gray">
              <div className="flex">
                <span className="shrink-0">担当範囲：</span>
                <span className="line-clamp-1">{work.role}</span>
              </div>
              <div className="flex">
                <span className="shrink-0">制作期間：</span>
                <span>{work.duration}</span>
              </div>
            </div>
          </div>
        </div>
      </article>
    );
  }
);

WorkCard.displayName = "WorkCard";
