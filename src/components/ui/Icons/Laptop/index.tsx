import { tv, type VariantProps } from 'tailwind-variants';

const iconStyles = tv({
  base: 'inline-block shrink-0 transition-all duration-300',
  variants: {
    color: {
      gray: 'text-dark-gray',
    },
    size: {
      sm: 'w-icon-20 h-icon-20',
      md: 'w-icon-24 h-icon-24',
      lg: 'w-icon-30 h-icon-30',
      xl: 'w-icon-50 h-icon-50',
    },
  },
  defaultVariants: {
    color: 'gray',
    size: 'sm',
  },
});

export type LaptopProps = React.SVGProps<SVGSVGElement> &
  VariantProps<typeof iconStyles>;

export const Laptop = ({ color, size, className, ...props }: LaptopProps) => {
  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={iconStyles({ color, size, className })}
      {...props}
    >
      <path
        d='M18.6667 17.3529C19.5833 17.3529 20.325 16.6118 20.325 15.7059L20.3333 6.64706C20.3333 5.74118 19.5833 5 18.6667 5H5.33333C4.41667 5 3.66667 5.74118 3.66667 6.64706V15.7059C3.66667 16.6118 4.41667 17.3529 5.33333 17.3529H2C2 18.2588 2.75 19 3.66667 19H20.3333C21.25 19 22 18.2588 22 17.3529H18.6667ZM5.33333 6.64706H18.6667V15.7059H5.33333V6.64706ZM12 18.1765C11.5417 18.1765 11.1667 17.8059 11.1667 17.3529C11.1667 16.9 11.5417 16.5294 12 16.5294C12.4583 16.5294 12.8333 16.9 12.8333 17.3529C12.8333 17.8059 12.4583 18.1765 12 18.1765Z'
        fill='currentColor'
      />
    </svg>
  );
};
