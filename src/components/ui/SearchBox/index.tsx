// src/components/ui/SearchBox/index.tsx
"use client";

import React from "react";
import { SearchSmall } from "@/components/ui/Icons";
import styles from "./SearchBox.module.scss";

type SearchBoxProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
};

/**
 * 共通検索ボックスコンポーネント
 * WORKS / GALLERY の両アーカイブページで使用。
 */
export function SearchBox({
  value,
  onChange,
  placeholder = "例：コーポレート",
  className = "",
}: SearchBoxProps) {
  return (
    <div className={`${styles.container} ${className}`}>
      <div className={styles.inputWrapper}>
        <div className={styles.iconWrapper}>
          <SearchSmall color="gray" size="sm" />
        </div>

        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={styles.input}
        />
      </div>

      {/* クリアボタン：入力がある時のみ表示 */}
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          className={styles.clearButton}
          aria-label="検索ワードをクリア"
        >
          <span aria-hidden="true">×</span>
        </button>
      )}
    </div>
  );
}
