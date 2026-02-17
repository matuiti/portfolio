import { tv, type VariantProps } from "tailwind-variants";
import React from "react";

const iconStyles = tv({
  base: "inline-block shrink-0 transition-all duration-300 cursor-pointer",
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
  },
  defaultVariants: {
    color: "black",
    size: "xl",
  },
});

export type MobileMenuCloseProps = React.SVGProps<SVGSVGElement> &
  VariantProps<typeof iconStyles>;

export const MobileMenuClose = ({
  color,
  size,
  className,
  ...props
}: MobileMenuCloseProps) => {
  return (
    <svg
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={iconStyles({ color, size, className })}
      {...props}
    >
      <path
        d="M35 17.0143L32.9857 15L25 22.9857L17.0143 15L15 17.0143L22.9857 25L15 32.9857L17.0143 35L25 27.0143L32.9857 35L35 32.9857L27.0143 25L35 17.0143Z"
        fill="currentColor"
      />
    </svg>
  );
};
