import { tv, type VariantProps } from "tailwind-variants";
import React from "react";

const iconStyles = tv({
  base: "inline-block shrink-0 transition-all duration-300",
  variants: {
    color: {
      black: "text-black",
      white: "text-white",
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
    size: "md",
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
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={iconStyles({ color, size, isPublished, className })}
      {...props}
    >
      <path
        d="M12.9711 15.3868C12.8427 15.2584 12.7811 15.1032 12.7862 14.9213C12.7918 14.7394 12.8587 14.5843 12.9872 14.4558L14.801 12.642H7.64205C7.46014 12.642 7.30754 12.5804 7.18427 12.4571C7.06142 12.3343 7 12.1819 7 12C7 11.8181 7.06142 11.6655 7.18427 11.5422C7.30754 11.4194 7.46014 11.3579 7.64205 11.3579H14.801L12.9711 9.52808C12.8427 9.39967 12.7785 9.24707 12.7785 9.07029C12.7785 8.89394 12.8427 8.74156 12.9711 8.61315C13.0995 8.48474 13.2521 8.42053 13.4289 8.42053C13.6052 8.42053 13.7576 8.48474 13.886 8.61315L16.8234 11.5505C16.8876 11.6148 16.9332 11.6843 16.9602 11.7592C16.9867 11.8341 17 11.9144 17 12C17 12.0856 16.9867 12.1659 16.9602 12.2408C16.9332 12.3157 16.8876 12.3852 16.8234 12.4494L13.87 15.4029C13.7523 15.5206 13.6052 15.5794 13.4289 15.5794C13.2521 15.5794 13.0995 15.5152 12.9711 15.3868Z"
        fill="currentColor"
      />
    </svg>
  );
};
