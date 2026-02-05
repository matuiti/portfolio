import { tv } from "tailwind-variants";

export const button = tv({
  base: "inline-flex items-center justify-center font-bold transition-all active:scale-95 disabled:opacity-50",
  variants: {
    intent: {
      primary: "bg-primary text-white hover:bg-primary/90",
      outline:
        "border-2 border-neutral-900 text-neutral-900 hover:bg-neutral-900 hover:text-white",
      underline:
        "text-neutral-900 border-b-2 border-neutral-900 hover:text-primary hover:border-primary px-0 pb-1",
    },
    size: {
      short: "px-6 py-3 text-sm",
      long: "px-12 py-4 text-base w-full md:w-auto", // WORKS等で使用
    },
  },
  defaultVariants: {
    intent: "primary",
    size: "short",
  },
});
