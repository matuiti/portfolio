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

export type LaunchProps = React.SVGProps<SVGSVGElement> &
  VariantProps<typeof iconStyles>;

export const Launch = ({ color, size, className, ...props }: LaunchProps) => {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={iconStyles({ color, size, className })}
      {...props}
    >
      <path
        d="M15.4444 15.4444H4.55556V4.55556H10V3H4.55556C3.69222 3 3 3.7 3 4.55556V15.4444C3 16.3 3.69222 17 4.55556 17H15.4444C16.3 17 17 16.3 17 15.4444V10H15.4444V15.4444ZM11.5556 3V4.55556H14.3478L6.70222 12.2011L7.79889 13.2978L15.4444 5.65222V8.44444H17V3H11.5556Z"
        fill="currentColor"
      />
    </svg>
  );
};
