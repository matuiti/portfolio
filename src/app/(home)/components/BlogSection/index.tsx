import { SectionTitle } from "@/components/ui/SectionTitle";
import { ComingSoon } from "@/components/ui/ComingSoon";
import styles from "./BlogSection.module.scss";

export const BlogSection = () => {
  return (
    <section id="blog" className="scroll-mt-20">
      <div className="section-padding-y section-padding-x bg-light-gray">
        <div className="container-center">
          <div className={styles.sectionHead}>
            {/* セクション見出し */}
            <SectionTitle enTitle="blog" jpTitle="ブログ" variant="default" />
            <p className={styles.description}>
              技術記事や制作に関する情報を発信予定です
            </p>
          </div>
          <div className="flex items-center justify-center">
            <ComingSoon />
          </div>
        </div>
      </div>
    </section>
  );
};
