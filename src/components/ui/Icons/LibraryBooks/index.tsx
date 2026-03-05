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
  },
  defaultVariants: {
    color: "black",
    size: "sm",
  },
});

export type LibraryBooksProps = React.SVGProps<SVGSVGElement> &
  VariantProps<typeof iconStyles>;

export const LibraryBooks = ({
  color,
  size,
  className,
  ...props
}: LibraryBooksProps) => {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={iconStyles({ color, size, className })}
      {...props}
    >
        <path
          d="M4.4 5.8H3V15.6C3 16.37 3.63 17 4.4 17H14.2V15.6H4.4V5.8ZM15.6 3H7.2C6.43 3 5.8 3.63 5.8 4.4V12.8C5.8 13.57 6.43 14.2 7.2 14.2H15.6C16.37 14.2 17 13.57 17 12.8V4.4C17 3.63 16.37 3 15.6 3ZM14.9 9.3H7.9V7.9H14.9V9.3ZM12.1 12.1H7.9V10.7H12.1V12.1ZM14.9 6.5H7.9V5.1H14.9V6.5Z"
          fill="currentColor"
        />
    </svg>
  );
};
