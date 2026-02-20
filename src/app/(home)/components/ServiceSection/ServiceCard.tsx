// src / app / home / components / ServiceSection / ServiceCard.tsx;
import { ElementType } from "react";
import styles from "./ServiceSection.module.scss";

type ServiceCardProps = {
  index: number;
  title: string;
  description: string;
  Icon: ElementType;
  className?: string;
};

export const ServiceCard = ({
  index,
  title,
  description,
  Icon,
  className
}: ServiceCardProps) => {
  // 01, 02... 形式の連番生成
  const formattedNumber = (index + 1).toString().padStart(2, "0");

  return (
    <div className={`${styles.cardContainer} ${className}`}>
      {/* 左：画像(SVG) */}
      <div className={styles.iconWrapper}>
        {/* アイコンサイズはプロップス、またはSCSS側で制御 */}
        <Icon color="black" />
      </div>

      {/* 右：テキスト内容 */}
      <div className={styles.textContent}>
        <div className={styles.titleWrapper}>
          <span className={styles.number}>{formattedNumber}</span>
          <h3 className={styles.title}>{title}</h3>
        </div>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
};