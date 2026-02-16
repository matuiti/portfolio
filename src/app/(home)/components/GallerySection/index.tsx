import { SectionTitle } from "@/components/ui/SectionTitle";
import { ComingSoon } from "@/components/ui/ComingSoon";
import styles from "./GallerySection.module.scss";

export const GallerySection = () => {
  return (
    <div className="section-padding-y section-padding-x bg-light-gray">
      <div className="container-center">
        <div className={styles.sectionHead}>
          {/* セクション見出し */}
          <SectionTitle
            enTitle="gallery"
            jpTitle="ギャラリー"
            variant="default"
          />
          <p className={styles.sectionHead}>
            UIパーツやアニメーションなどのギャラリーは準備中です
          </p>
        </div>
        <div className="flex items-center justify-center">
          <ComingSoon />
        </div>
      </div>
    </div>
  );
};
