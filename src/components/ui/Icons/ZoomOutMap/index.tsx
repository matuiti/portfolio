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

export type ZoomOutMapProps = React.SVGProps<SVGSVGElement> &
  VariantProps<typeof iconStyles>;

export const ZoomOutMap = ({
  color,
  size,
  className,
  ...props
}: ZoomOutMapProps) => {
  return (
    <svg
      viewBox='0 0 24 24'
      fill='currentColor'
      xmlns='http://www.w3.org/2000/svg'
      className={iconStyles({ color, size, className })}
      {...props}
    >
        <path
          d='M15 3L17.3 5.3L14.41 8.17L15.83 9.59L18.7 6.7L21 9V3H15ZM3 9L5.3 6.7L8.17 9.59L9.59 8.17L6.7 5.3L9 3H3V9ZM9 21L6.7 18.7L9.59 15.83L8.17 14.41L5.3 17.3L3 15V21H9ZM21 15L18.7 17.3L15.83 14.41L14.41 15.83L17.3 18.7L15 21H21V15Z'
          fill='#757575'
        />
    </svg>
  );
};
