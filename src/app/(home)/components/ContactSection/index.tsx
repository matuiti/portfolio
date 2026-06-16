import { SectionTitle } from '@/components/ui/SectionTitle';
import { ContactForm } from '@/home/components/ContactSection/ContactForm';
import styles from './ContactSection.module.scss';
import { DirectMailTextLink } from '@/components/ui/DirectMailTextLink';
import { SITE_CONFIG } from '@/data/site';

export const ContactSection = () => {
  return (
    <section id='contact' className='-scroll-mt-4'>
      <div className='section-padding-y section-padding-x bg-light-gray'>
        <div className='container-center'>
          <div className={styles.sectionHead}>
            <SectionTitle
              enTitle='contact'
              jpTitle='お問い合わせ'
              variant='center'
              className='js-fuwa-fade'
            />
            <p className={`${styles.description} js-fuwa-fade`}>
              <span>ご質問やご相談がございましたら、</span>
              <span>お気軽にお問い合わせください。</span>
            </p>
          </div>
          <div className={`${styles.formContainer} js-fuwa-fade`}>
            <ContactForm />
          </div>
          <div className={`${styles.directMailArea} js-fuwa-fade`}>
            <DirectMailTextLink
              user={SITE_CONFIG.email.directUser}
              domain={SITE_CONFIG.email.directDomain}
            />

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
