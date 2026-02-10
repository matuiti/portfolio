import { tv, type VariantProps } from "tailwind-variants";
import React from "react";

const iconStyles = tv({
  base: "inline-block shrink-0 transition-all duration-300",
  variants: {
    color: {
      black: "text-balck",
    },
    size: {
      md: "w-icon-50 h-icon-50",
    },
  },
  defaultVariants: {
    color: "black",
    size: "md",
  },
});

export type HamburgerProps = React.SVGProps<SVGSVGElement> &
  VariantProps<typeof iconStyles>;

export const Hamburger = ({
  color,
  size,
  className,
  ...props
}: HamburgerProps) => {
  return (
    <svg
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={iconStyles({ color, size, className })}
      {...props}
    >
      <path
        d="M12.5 33.5H37.5V30.6667H12.5V33.5ZM12.5 26.4167H37.5V23.5833H12.5V26.4167ZM12.5 16.5V19.3333H37.5V16.5H12.5Z"
        fill="currentColor"
      />
    </svg>
  );
};
