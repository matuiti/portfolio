import { ALL_SKILLS } from '@/data/skills';
import { breadcrumbItems, description, PAGE_HEADER_DATA } from './data';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { PageHeader } from '@/components/ui/PageHeader';
import { SkillGroupSection } from './components/SkillGroupSection';
import { ScrollToTop } from '@/lib/utility/ScrollToTop';
import styles from './Skills.module.css';

export default function SkillsPage() {
  return (
    <>
      <ScrollToTop />
      <PageHeader
        enTitle={PAGE_HEADER_DATA.enTitle}
        jpTitle={PAGE_HEADER_DATA.jpTitle}
        bgImage={PAGE_HEADER_DATA.images}
      />
      <div className='section-padding-x w-full bg-white'>
        <div className='container-center'>
          <Breadcrumbs items={breadcrumbItems} />
        </div>
      </div>
      <div className={`${styles.pageBody} section-padding-x`}>
        <div className='container-center'>
          <p className={styles.description}>{description}</p>
          <div className={styles.skillGroups}>
            {ALL_SKILLS.map((group, index) => (
              <SkillGroupSection
                key={group.title}
                group={group}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
