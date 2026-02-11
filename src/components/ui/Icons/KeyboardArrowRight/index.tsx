import { tv, type VariantProps } from "tailwind-variants";
import React from "react";

const iconStyles = tv({
  base: "inline-block shrink-0 transition-all duration-300",
  variants: {
    color: {
      black: "text-black",
      gray: "text-gray",
    },
    size: {
      sm: "w-icon-20 h-icon-20",
      md: "w-icon-24 h-icon-24",
      lg: "w-icon-30 h-icon-30",
      xl: "w-icon-50 h-icon-50",
    },
  },
  defaultVariants: {
    color: "gray",
    size: "sm",
  },
});

export type KeyboardArrowRightProps = React.SVGProps<SVGSVGElement> & VariantProps<typeof iconStyles>;

export const KeyboardArrowRight = ({ color, size, className, ...props }: KeyboardArrowRightProps) => {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={iconStyles({ color, size, className })}
      {...props}
    >
        <path
          d="M7 13.825L10.7085 10L7 6.175L8.1417 5L13 10L8.1417 15L7 13.825Z"
          fill="currentColor"
        />
    </svg>
  );
};
