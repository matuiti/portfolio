"use client";

import React from "react";
import Image from "next/image";
import styles from "./ComingSoon.module.scss";

type ComingSoonProps = {
  hasOverlay?: boolean;
};

/**
 * ComingSoonコンポーネント
 */

export const ComingSoon = ({ hasOverlay = true }: ComingSoonProps) => {
  const BG_IMAGE_PATH = "/assets/images/common/comingsoon.png";
  return (
    <section className={styles.container}>
      {/* 背景画像 [2] */}
      <div className={styles.backgroundImage}>
        <Image
          src={BG_IMAGE_PATH}
          alt=""
          fill
          sizes="100vw"
          priority={false}
        />
      </div>

      {/* オーバーレイ */}
      {hasOverlay && <div className={styles.overlay} />}

      {/* テキスト */}
      <p className={styles.text}>コンテンツは近日公開予定です</p>
    </section>
  );
};
