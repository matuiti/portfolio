// src/components/ui/DirectMailTextLink/index.tsx
"use client";

import React from "react";
import { Mail } from "@/components/ui/Icons"; // 既存の共通アイコンを使用 [3, 4]
import { tv } from "tailwind-variants";

// プロジェクト規約に従い、スタイルをバリアント管理 [2, 5]
const textLinkStyles = tv({
  base: "group inline-flex items-center gap-[calc(6/16*1rem)] transition-all cursor-pointer",
  variants: {
    color: {
      default: "text-black",
      gray: "text-dark-gray",
    },
  },
  defaultVariants: {
    color: "default",
  },
});

type DirectMailTextLinkProps = {
  user: string; // 例: "contact"
  domain: string; // 例: "your-portfolio.com"
  color?: "default" | "gray";
  className?: string;
};

export const DirectMailTextLink = ({
  user,
  domain,
  color,
  className,
}: DirectMailTextLinkProps) => {
  // クリック時に動的にmailtoを生成（クローラー対策）
  const handleMailClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.href = `mailto:${user}@${domain}`;
  };

  return (
    <button
      onClick={handleMailClick}
      className={textLinkStyles({ color, className })}
      aria-label="メールソフトを起動して連絡する"
    >
      {/* 既存のMailアイコンを再利用。サイズは規約通りrem指定 [5, 6] */}
      <Mail
        size="sm"
        className="group-hover:translate-x-[calc(2/16*1rem)] transition-transform duration-300"
      />

      {/* 指定のテキストをリンク風に装飾 */}
      <span className="text-[calc(15/16*1rem)] font-medium border-b border-current pb-[calc(1/16*1rem)] group-hover:opacity-hover transition-opacity">
        直接メールでのご連絡も歓迎します
      </span>
    </button>
  );
};
