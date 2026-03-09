// src / app / home / components / ServiceSection / index.tsx;
"use client";

import { SectionTitle } from "@/components/ui/SectionTitle";
import { ServiceCard } from "./ServiceCard";
import { SERVICES } from "@/data/services";
import styles from "./ServiceSection.module.scss";
import { MainButton } from "@/components/ui/Buttons/MainButton";

export const ServiceSection = () => {
  return (
    <section id="service" className="-scroll-mt-2">
      <div className="section-padding-y section-padding-x bg-white">
        <div className="container-center">
          <div className={styles.sectionHead}>
            {/* セクション見出し */}
            <SectionTitle
              enTitle="service"
              jpTitle="サービス内容"
              variant="default"
              className="js-fuwa-fade"
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
                className="js-fuwa-fade"
              />
            ))}
          </div>
          <div className={`${styles.sectionFoot} js-fuwa-fade`}>
            <p className="leading-normal text-center">
              <span className="inline-block">その他、ご要望に応じて</span>
              <span className="inline-block">柔軟に対応いたします。</span>
            </p>
            <MainButton href="/#contact">お問い合わせはこちら</MainButton>
          </div>
        </div>
      </div>
    </section>
  );
};
