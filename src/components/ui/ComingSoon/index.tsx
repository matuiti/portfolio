import Image from 'next/image';
import styles from './ComingSoon.module.css';

const BG_IMAGE_PATH = '/assets/images/common/comingsoon.png';

type ComingSoonProps = {
  hasOverlay?: boolean;
};

export const ComingSoon = ({ hasOverlay = true }: ComingSoonProps) => {
  return (
    <section className={styles.container}>
      <div className={styles.backgroundImage}>
        <Image
          src={BG_IMAGE_PATH}
          alt=''
          fill
          sizes='100vw'
          priority={false}
          aria-hidden='true'
        />
      </div>
      {hasOverlay && <div className={styles.overlay} />}
      <p className={styles.text}>近日公開予定</p>
    </section>
  );
};
