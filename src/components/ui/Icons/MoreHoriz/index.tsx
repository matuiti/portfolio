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

export type MoreHorizProps = React.SVGProps<SVGSVGElement> & VariantProps<typeof iconStyles>;

export const MoreHoriz = ({ color, size, className, ...props }: MoreHorizProps) => {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={iconStyles({ color, size, className })}
      {...props}
    >
        <path
          d="M7 11C6.725 11 6.48967 10.902 6.294 10.706C6.098 10.5103 6 10.275 6 10C6 9.725 6.098 9.4895 6.294 9.2935C6.48967 9.09783 6.725 9 7 9C7.275 9 7.51033 9.09783 7.706 9.2935C7.902 9.4895 8 9.725 8 10C8 10.275 7.902 10.5103 7.706 10.706C7.51033 10.902 7.275 11 7 11ZM10 11C9.725 11 9.48967 10.902 9.294 10.706C9.098 10.5103 9 10.275 9 10C9 9.725 9.098 9.4895 9.294 9.2935C9.48967 9.09783 9.725 9 10 9C10.275 9 10.5105 9.09783 10.7065 9.2935C10.9022 9.4895 11 9.725 11 10C11 10.275 10.9022 10.5103 10.7065 10.706C10.5105 10.902 10.275 11 10 11ZM13 11C12.725 11 12.4895 10.902 12.2935 10.706C12.0978 10.5103 12 10.275 12 10C12 9.725 12.0978 9.4895 12.2935 9.2935C12.4895 9.09783 12.725 9 13 9C13.275 9 13.5105 9.09783 13.7065 9.2935C13.9022 9.4895 14 9.725 14 10C14 10.275 13.9022 10.5103 13.7065 10.706C13.5105 10.902 13.275 11 13 11Z"
          fill="currentColor"
        />
    </svg>
  );
};
