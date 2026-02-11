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
    size: "xl",
  },
});

export type SearchLargeProps = React.SVGProps<SVGSVGElement> &
  VariantProps<typeof iconStyles>;

export const SearchLarge = ({
  color,
  size,
  className,
  ...props
}: SearchLargeProps) => {
  return (
    <svg
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={iconStyles({ color, size, className })}
      {...props}
    >
      <path
        d="M29.7233 28.8365H28.7296L28.3774 28.4969C29.6101 27.0629 30.3522 25.2013 30.3522 23.1761C30.3522 18.6604 26.6918 15 22.1761 15C17.6604 15 14 18.6604 14 23.1761C14 27.6918 17.6604 31.3522 22.1761 31.3522C24.2013 31.3522 26.0629 30.6101 27.4969 29.3774L27.8365 29.7296V30.7233L34.1258 37L36 35.1258L29.7233 28.8365ZM22.1761 28.8365C19.044 28.8365 16.5157 26.3082 16.5157 23.1761C16.5157 20.044 19.044 17.5157 22.1761 17.5157C25.3082 17.5157 27.8365 20.044 27.8365 23.1761C27.8365 26.3082 25.3082 28.8365 22.1761 28.8365Z"
        fill="currentColor"
      />
    </svg>
  );
};
