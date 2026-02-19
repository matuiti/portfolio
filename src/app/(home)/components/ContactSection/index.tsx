import { SectionTitle } from "@/components/ui/SectionTitle";
import { ContactForm } from "@/home/components/ContactSection/ContactForm";
import styles from "./ContactSection.module.scss";
import { DirectMailTextLink } from "@/components/ui/DirectMailTextLink";
import { siteConfig } from "@/data/site-config";

export const ContactSection = () => {
  return (
    <section id="contact" className="scroll-mt-20">
      <div className="section-padding-y section-padding-x bg-white">
        <div className="container-center">
          <div className={styles.sectionHead}>
            <SectionTitle
              enTitle="contact"
              jpTitle="お問い合わせ"
              variant="center"
              size="large"
            />
            <p className={styles.description}>
              <span>ご質問やご相談がございましたら、</span>
              <span>お気軽にお問い合わせください。</span>
            </p>
          </div>
          <div className={styles.formContainer}>
            <ContactForm />
          </div>
          <div className={styles.directMailArea}>
            {/* 独自ドメインのアドレスをプロップスで分割して渡す */}
            <DirectMailTextLink
              user={siteConfig.email.directUser}
              domain={siteConfig.email.directDomain}
            />

            {/* ボット対策としてアドレス自体は画面上に出さない、あるいは [at] 等で表示を工夫 */}
            <p className={styles.description}>
              <span>※お急ぎの方や、ファイルを添付したい場合は</span>
              <span>こちらをご利用ください</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
