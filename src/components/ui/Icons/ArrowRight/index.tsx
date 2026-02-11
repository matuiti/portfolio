import { tv, type VariantProps } from "tailwind-variants";
import React from "react";

const iconStyles = tv({
  base: "inline-block shrink-0 transition-all duration-300",
  variants: {
    color: {
      black: "text-black",
    },
    size: {
      sm: "w-icon-20 h-icon-20",
      md: "w-icon-24 h-icon-24",
      lg: "w-icon-30 h-icon-30",
      xl: "w-icon-50 h-icon-50",
    },
    isPublished: {
      true: {
        base: "text-black",
      },
      false: {
        base: "text-gray",
      },
    },
  },
  defaultVariants: {
    color: "black",
    size: "sm",
  },
});

export type ArrowRightProps = React.SVGProps<SVGSVGElement> &
  VariantProps<typeof iconStyles>;

export const ArrowRight = ({
  color,
  size,
  isPublished,
  className,
  ...props
}: ArrowRightProps) => {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={iconStyles({ color, size, isPublished, className })}
      {...props}
    >
        <path
          d="M10.9711 13.3868C10.8427 13.2584 10.7811 13.1032 10.7862 12.9213C10.7918 12.7394 10.8587 12.5843 10.9872 12.4558L12.801 10.642H5.64205C5.46014 10.642 5.30754 10.5804 5.18427 10.4571C5.06142 10.3343 5 10.1819 5 9.99999C5 9.81807 5.06142 9.66548 5.18427 9.5422C5.30754 9.41935 5.46014 9.35793 5.64205 9.35793H12.801L10.9711 7.52808C10.8427 7.39967 10.7785 7.24707 10.7785 7.07029C10.7785 6.89394 10.8427 6.74156 10.9711 6.61315C11.0995 6.48474 11.2521 6.42053 11.4289 6.42053C11.6052 6.42053 11.7576 6.48474 11.886 6.61315L14.8234 9.55055C14.8876 9.61475 14.9332 9.68431 14.9602 9.75922C14.9867 9.83412 15 9.91438 15 9.99999C15 10.0856 14.9867 10.1659 14.9602 10.2408C14.9332 10.3157 14.8876 10.3852 14.8234 10.4494L11.87 13.4029C11.7523 13.5206 11.6052 13.5794 11.4289 13.5794C11.2521 13.5794 11.0995 13.5152 10.9711 13.3868Z"
          fill="currentColor"
        />
    </svg>
  );
};
