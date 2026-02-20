import { SectionTitle } from "@/components/ui/SectionTitle";
import { ComingSoon } from "@/components/ui/ComingSoon";
import styles from "./GallerySection.module.scss";

export const GallerySection = () => {
  return (
    <section id="gallery" className="scroll-mt-20">
      <div className="section-padding-y section-padding-x bg-light-gray">
        <div className="container-center">
          <div className={styles.sectionHead}>
            {/* セクション見出し */}
            <SectionTitle
              enTitle="gallery"
              jpTitle="ギャラリー"
              variant="default"
              className="js-fuwa-fade"
            />
            <p className={`${styles.description} js-fuwa-fade`}>
              UIパーツやアニメーションなどのギャラリーは準備中です
            </p>
          </div>
          <div className="flex items-center justify-center js-fuwa-fade">
            <ComingSoon />
          </div>
        </div>
      </div>
    </section>
  );
};
