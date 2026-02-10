import { tv, type VariantProps } from "tailwind-variants";
import React from "react";

const iconStyles = tv({
  base: "inline-block shrink-0 transition-all duration-300",
  variants: {
    color: {
      black: "text-black",
    },
    size: {
      md: "w-icon-50 h-iconw-icon-50",
    },
  },
  defaultVariants: {
    color: "black",
    size: "md",
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
      width="50"
      height="50"
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
