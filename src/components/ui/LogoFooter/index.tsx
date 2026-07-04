import Image from 'next/image';
export default function LogoFooter() {
  return (
    <Image
      src='/assets/images/common/logo_white@2x.png' // 高画質なPC用を兼用
      alt='ロゴ画像'
      width={220} // デザインカンプ上の最大値
      height={41}
      priority
      className='w-full h-auto object-contain'
    />
  );
}
