import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { PageHeader } from '@/components/ui/PageHeader';
import { SkillGroupSection } from './components/SkillGroupSection';
import { breadcrumbItems, description, PAGE_HEADER_DATA } from './data';
import { SKILL_GROUPS } from '@/data/skills';
import { ScrollToTopComp } from '@/lib/utility/ScrollToTopComp';
import styles from './Skills.module.css';

export default function SkillsPage() {
  return (
    <>
      <ScrollToTopComp />
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
      <div className={`${styles.pageBody} section-padding-x`}>
        <div className='container-center'>
          <p className={styles.description}>{description}</p>
          <div className={styles.skillGroups}>
            {SKILL_GROUPS.map((group, index) => (
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
