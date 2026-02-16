// src / app / home / components / ServiceSection / index.tsx;
"use client";

import { SectionTitle } from "@/components/ui/SectionTitle";
import { ServiceCard } from "./ServiceCard";
import { SERVICES } from "@/data/services";
import styles from "./ServiceSection.module.scss";
import { MainButton } from "@/components/ui/Buttons/MainButton";

export const ServiceSection = () => {
  return (
    <div className="section-padding-y section-padding-x bg-white">
      <div className="container-center">
        <div className={styles.sectionHead}>
          {/* セクション見出し */}
          <SectionTitle
            enTitle="service"
            jpTitle="サービス内容"
            variant="default"
          />
        </div>
        <div className={styles.cardGrid}>
          {SERVICES.map((service, index) => (
            <ServiceCard
              key={service.id}
              index={index}
              title={service.title}
              description={service.description}
              Icon={service.Icon}
            />
          ))}
        </div>
        <div className={styles.sectionFoot}>
          <p className="leading-normal">
            その他、ご要望に応じて柔軟に対応いたします。
          </p>
          <MainButton href="/#contact">お問い合わせはこちら</MainButton>
        </div>
      </div>
    </div>
  );
};
