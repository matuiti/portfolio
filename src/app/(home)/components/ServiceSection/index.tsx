'use client';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { ServiceCard } from './ServiceCard';
import { SERVICES } from '@/data/services';
import { MainButton } from '@/components/ui/Buttons/MainButton';
import styles from './ServiceSection.module.css';

export const ServiceSection = () => {
  return (
    <section id='service' className='-scroll-mt-2'>
      <div className='section-padding-y section-padding-x bg-white'>
        <div className='container-center'>
          <div className={styles.sectionHead}>
            <SectionTitle
              enTitle='service'
              jpTitle='サービス内容'
              variant='default'
              className='js-fuwa-fade'
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
                className='js-fuwa-fade'
              />
            ))}
          </div>
          <div className={`${styles.sectionFoot} js-fuwa-fade`}>
            業務内容や対応可否についてご不明な点がございましたら、<br />
            いつでもお気軽にお問い合わせください。
            <MainButton href='/#contact'>お問い合わせはこちら</MainButton>
          </div>
        </div>
      </div>
    </section>
  );
};
