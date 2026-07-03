import Image from 'next/image';
export default function LogoFooter() {
  return (
    // 親要素で囲み、Tailwindのインライン任意値「min-[1140px]:」で幅を切り替える
    <Image
      src='/assets/images/common/logo_l_white.png' // 高画質なPC用を兼用
      alt='ロゴ画像'
      width={160} // 本来の最大サイズ
      height={45}
      priority
      className='w-full h-auto object-contain'
    />
  );
}
