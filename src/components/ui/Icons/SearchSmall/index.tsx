import { tv, type VariantProps } from "tailwind-variants";
import React from "react";

const iconStyles = tv({
  base: "inline-block shrink-0 transition-all duration-300",
  variants: {
    color: {
      black: "text-black",
      gray: "text-dark-gray",
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

export type SearchSmallProps = React.SVGProps<SVGSVGElement> &
  VariantProps<typeof iconStyles>;

export const SearchSmall = ({
  color,
  size,
  className,
  ...props
}: SearchSmallProps) => {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={iconStyles({ color, size, className })}
      {...props}
    >
      <path
        d="M13.2204 11.934H12.5429L12.3027 11.7024C13.1432 10.7247 13.6492 9.4554 13.6492 8.07461C13.6492 4.99571 11.1535 2.5 8.07461 2.5C4.99571 2.5 2.5 4.99571 2.5 8.07461C2.5 11.1535 4.99571 13.6492 8.07461 13.6492C9.4554 13.6492 10.7247 13.1432 11.7024 12.3027L11.934 12.5429V13.2204L16.2221 17.5L17.5 16.2221L13.2204 11.934ZM8.07461 11.934C5.93911 11.934 4.21527 10.2101 4.21527 8.07461C4.21527 5.93911 5.93911 4.21527 8.07461 4.21527C10.2101 4.21527 11.934 5.93911 11.934 8.07461C11.934 10.2101 10.2101 11.934 8.07461 11.934Z"
        fill="currentColor"
      />
    </svg>
  );
};
