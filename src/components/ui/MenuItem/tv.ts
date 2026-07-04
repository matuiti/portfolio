import { tv } from 'tailwind-variants';

export const menuItemStyles = tv({
  slots: {
    base: 'group relative flex items-center leading-none transition-all duration-300 w-full',
    label: 'font-bold transition-all duration-300 pb-[calc(6/16*1rem)]',
  },
  variants: {
    color: {
      black: { base: 'text-black' },
      white: { base: 'text-white' },
    },
    isPublished: {
      true: {
        base: 'cursor-default tablet:cursor-pointer',
        label: [
          'bg-[linear-gradient(currentColor,currentColor)] bg-no-repeat bg-bottom-right bg-size-[0_1px]',
          'transition-[background-size] duration-500 ease-out',
          'tablet:group-hover:bg-bottom-left tablet:group-hover:bg-size-[100%_1px]',
        ],
      },
      false: { base: 'text-dark-gray cursor-not-allowed' },
    },
  },
  compoundVariants: [
    { isPublished: true, color: 'black', class: { base: 'hover:text-black' } },
    { isPublished: true, color: 'white', class: { base: 'hover:text-white' } },
  ],
  defaultVariants: { color: 'black', isPublished: true },
});
