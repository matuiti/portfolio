import { tv } from "tailwind-variants";

export const sectionTitle = tv({
  base: "font-bold tracking-tight text-neutral-900",
  variants: {
    align: {
      left: "text-left",
      center: "text-center mx-auto", // CONTACTなどで使用
    },
    size: {
      default: "text-3xl md:text-5xl mb-4",
      underlined: "text-2xl border-b-2 border-primary pb-2 mb-6 inline-block", // ABOUTなどで使用
    },
  },
  defaultVariants: {
    align: "left",
    size: "default",
  },
});

export const SectionTitle = ({
  title,
  description,
  align,
  size,
}: {
  title: string;
  description?: string;
  align?: "left" | "center";
  size?: "default" | "underlined";
}) => (
  <div className={align === "center" ? "text-center" : ""}>
    <h2 className={sectionTitle({ align, size })}>{title}</h2>
    {description && (
      <p className="text-neutral-500 mb-10 max-w-2xl">{description}</p>
    )}
  </div>
);
