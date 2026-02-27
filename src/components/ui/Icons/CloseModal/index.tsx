import { tv, type VariantProps } from "tailwind-variants";
import React from "react";

const iconStyles = tv({
  base: "inline-block shrink-0 cursor-pointer transition-colors duration-300",
  variants: {
    color: {
      white: "text-white tablet:text-dark-gray hover:text-red hover:bg-light-gray",
    },
    size: {
      sm: "w-icon-20 h-icon-20",
      md: "w-icon-24 h-icon-24",
      lg: "w-icon-30 h-icon-30",
      xl: "w-icon-50 h-icon-50",
    },
  },
  defaultVariants: {
    color: "white",
    size: "xl",
  },
});

export type MobileMenuCloseModalProps = React.SVGProps<SVGSVGElement> &
  VariantProps<typeof iconStyles>;

export const CloseModal = ({
  color,
  size,
  className,
  ...props
}: MobileMenuCloseModalProps) => {
  return (
    <svg
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={iconStyles({ color, size, className })}
      {...props}
    >
      <path
        d="M33 18.6114L31.3886 17L25 23.3886L18.6114 17L17 18.6114L23.3886 25L17 31.3886L18.6114 33L25 26.6114L31.3886 33L33 31.3886L26.6114 25L33 18.6114Z"
        fill="currentColor"
      />
    </svg>
  );
};
