import { PageHeader } from '@/components/ui/PageHeader';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { MainButton } from '@/components/ui/Buttons/MainButton';

export default function NotFound() {
  const PAGE_HEADER_DATA = {
    jpTitle: 'ページが見つかりません',
    enTitle: '404 NOT FOUND',
    images: '/assets/images/common/bg-page-header.jpg',
  } as const;

  const breadcrumbItems = [{ label: 'トップ', href: '/' }, { label: '404' }];

  return (
    <>
      <PageHeader
        enTitle={PAGE_HEADER_DATA.enTitle}
        jpTitle={PAGE_HEADER_DATA.jpTitle}
        bgiPath={PAGE_HEADER_DATA.bgiPath}
      />
      <div className='section-padding-x bg-white'>
        <div className='container-center'>
          <Breadcrumbs items={breadcrumbItems} />
        </div>
      </div>
      <div className='section-padding-x w-full bg-[var(--color-white)]'>
        <div className='container-center text-center w-full pt-[calc(100/16*1rem)] pb-[calc(100/16*1rem)]'>
          <p className='text-[var(--color-black)] leading-[1.8] mb-[calc(40/16*1rem)]'>
            <span className='inline-block'>お探しのページは、</span>
            <span className='inline-block'>移動または</span>
            <span className='inline-block'>削除された可能性があります。</span>
            <br />
            <span className='inline-block'>お手数ですが、</span>
            <span className='inline-block'>トップページから</span>
            <span className='inline-block'>再度お探しください。</span>
          </p>
          <div className='flex justify-center'>
            <MainButton variant='short' href='/'>
              トップページへ戻る
            </MainButton>
          </div>
        </div>
      </div>
    </>
  );
}
