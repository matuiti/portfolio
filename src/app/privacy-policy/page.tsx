import { MainButton } from '@/components/ui/Buttons/MainButton';
import { PageHeader } from '@/components/ui/PageHeader';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { PRIVACY_POLICY_DATA } from '@/data/privacyPolicy';
import { useScrollToTop } from '@/lib/hooks/useScrollToTop';
import styles from './PrivacyPolicy.module.css';

/**
 * プライバシーポリシーページ
 *
 * 外部データソース（SSoT）から内容を動的に生成します。
 * 各セクションのタイトル、本文、箇条書きリストを網羅的に出力します。
 */
export default function PrivacyPolicyPage() {
  const PAGE_HEADER_IMAGE_PATH = '/assets/images/common/bg-page-header.jpg';

  const PAGE_HEADER_DATA = {
    jpTitle: 'プライバシーポリシー',
    enTitle: 'PRIVACY POLICY',
    bgiPath: PAGE_HEADER_IMAGE_PATH,
  } as const;

  const breadcrumbItems = [
    { label: 'トップ', href: '/' },
    { label: 'プライバシーポリシー' },
  ];

  return (
    <>
      <useScrollToTop />
      <PageHeader
        enTitle={PAGE_HEADER_DATA.enTitle}
        jpTitle={PAGE_HEADER_DATA.jpTitle}
        bgiPath={PAGE_HEADER_DATA.bgiPath}
      />

      <div className='section-padding-x w-full bg-white'>
        <div className='container-center'>
          <Breadcrumbs items={breadcrumbItems} />
        </div>
      </div>

      <div className={`${styles.pageBody} pt-10 pb-37.5`}>
        <div className='container-center'>
          <div className={styles.sectionGroups}>
            {PRIVACY_POLICY_DATA.sections.map((section) => (
              <section key={section.id} className={styles.section}>
                <div className={styles.titleWrapper}>
                  <span className={styles.num}>{section.num}</span>
                  <h2 className={styles.heading}>{section.title}</h2>
                </div>
                <p className={styles.text}>{section.content}</p>

                {/* 箇条書きリストがある場合のみレンダリング */}
                {section.list && section.list.length > 0 && (
                  <ul className={styles.list}>
                    {section.list.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
            <div className={styles.buttonWrapper}>
              <MainButton variant='underline' href='/#contact'>
                トップページに戻る
              </MainButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
