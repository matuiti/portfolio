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
    size: 'md',
  },
});

export type PhoneProps = React.SVGProps<SVGSVGElement> &
  VariantProps<typeof iconStyles>;

export const Phone = ({ color, size, className, ...props }: PhoneProps) => {
  return (
    <svg
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={iconStyles({ color, size, className })}
      {...props}
    >
      <path
        d='M15.0769 3.5H8.92308C7.86154 3.5 7 4.36545 7 5.43182V18.5682C7 19.6345 7.86154 20.5 8.92308 20.5H15.0769C16.1385 20.5 17 19.6345 17 18.5682V5.43182C17 4.36545 16.1385 3.5 15.0769 3.5ZM12 19.7273C11.3615 19.7273 10.8462 19.2095 10.8462 18.5682C10.8462 17.9268 11.3615 17.4091 12 17.4091C12.6385 17.4091 13.1538 17.9268 13.1538 18.5682C13.1538 19.2095 12.6385 19.7273 12 19.7273ZM15.4615 16.6364H8.53846V5.81818H15.4615V16.6364Z'
        fill='currentColor'
      />
    </svg>
  );
};
