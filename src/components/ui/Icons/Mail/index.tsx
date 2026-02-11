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
  },
  defaultVariants: {
    color: "black",
    size: "sm",
  },
});

export type MailProps = React.SVGProps<SVGSVGElement> & VariantProps<typeof iconStyles>;

export const Mail = ({ color, size, className, ...props }: MailProps) => {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={iconStyles({ color, size, className })}
      {...props}
    >
        <path
          d="M16 4H4C3.175 4 2.5075 4.675 2.5075 5.5L2.5 14.5C2.5 15.325 3.175 16 4 16H16C16.825 16 17.5 15.325 17.5 14.5V5.5C17.5 4.675 16.825 4 16 4ZM16 14.5H4V7L10 10.75L16 7V14.5ZM10 9.25L4 5.5H16L10 9.25Z"
          fill="currentColor"
        />
    </svg>
  );
};
