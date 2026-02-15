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
      className={`group flex flex-col bg-white overflow-hidden transition-all duration-500 cursor-pointer shadow-sm ${
        !isTagHovered ? "hover:shadow-none" : ""
      }`}
      style={{
        borderRadius: "calc(24 / 16 * 1rem)",
      }}
    >
      {/* 上部：サムネイルエリア */}
      <div className="relative aspect-video overflow-hidden bg-slate-100">
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
          className={`absolute inset-0 bg-black/60 flex items-center justify-center transition-opacity duration-500 z-10 ${
            !isTagHovered ? "opacity-0 group-hover:opacity-100" : "opacity-0"
          }`}
        >
          <span className="text-white font-bold tracking-widest text-[calc(14 / 16 * 1rem)]">
            詳しく見る
          </span>
        </div>
      </div>

      {/* 下部：情報エリア (既存のスタイルを維持) */}
      <div
        className="flex flex-col flex-1"
        style={{ padding: "calc(24 / 16 * 1rem)" }}
      >
        <div
          className="flex flex-wrap gap-2 mb-3 relative z-20"
          onMouseEnter={() => setIsTagHovered(true)}
          onMouseLeave={() => setIsTagHovered(false)}
        >
          {work.category.map((cat) => (
            <span
              key={cat}
              onClick={(e) => handleCategoryClick(e, cat)}
              className="text-[calc(10 / 16 * 1rem)] font-black uppercase tracking-widest text-blue-600 hover:text-blue-400 transition-colors cursor-pointer"
            >
              {cat}
            </span>
          ))}
        </div>

        <h3
          className="font-bold text-slate-900 mb-[calc(8 / 16 * 1rem)]"
          style={{ fontSize: "calc(18 / 16 * 1rem)" }}
        >
          {work.title}
        </h3>

        <p
          className="text-slate-600 mb-[calc(20 / 16 * 1rem)] line-clamp-2"
          style={{ fontSize: "calc(14 / 16 * 1rem)", lineHeight: "1.6" }}
        >
          {work.summary}
        </p>

        <div
          className="mt-auto pt-[calc(16 / 16 * 1rem)] border-t border-slate-100 flex flex-col gap-1"
          style={{ fontSize: "calc(12 / 16 * 1rem)" }}
        >
          <div className="flex">
            <span className="text-slate-400 w-[calc(60 / 16 * 1rem)] shrink-0 font-medium">
              Role
            </span>
            <span className="text-slate-700 font-bold">{work.role}</span>
          </div>
          <div className="flex">
            <span className="text-slate-400 w-[calc(60 / 16 * 1rem)] shrink-0 font-medium">
              Period
            </span>
            <span className="text-slate-700 font-bold">{work.duration}</span>
          </div>
        </div>
      </div>
    </article>
  );
});

WorkCard.displayName = "WorkCard";
