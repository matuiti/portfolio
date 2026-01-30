// src/components/ui/FormInput.tsx
import React from "react";
import { tv, type VariantProps } from "tailwind-variants";

// 1. スロットの定義（Figmaのデザイン構造を再現）
const formInput = tv({
  slots: {
    container: "flex flex-col gap-1.5 w-full",
    label: "text-sm font-semibold text-slate-700",
    input:
      "w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400",
    errorText: "text-xs text-red-500 mt-1",
  },
  variants: {
    // エラーがある時のスタイル変更を一括指定
    isInvalid: {
      true: {
        input: "border-red-500 focus:ring-red-200",
        label: "text-red-600",
      },
    },
  },
});

// 2. 型定義：inputとtextareaの両方の属性を許容するように定義
type FormInputProps = {
  label: string;
  error?: string;
  isTextArea?: boolean;
} & VariantProps<typeof formInput> &
  React.InputHTMLAttributes<HTMLInputElement> &
  React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const FormInput = ({
  label,
  error,
  isInvalid,
  isTextArea,
  className,
  ...props
}: FormInputProps) => {
  // スロットからクラス名を取り出す
  const {
    container,
    label: labelStyle,
    input,
    errorText,
  } = formInput({
    isInvalid: !!error || isInvalid,
  });

  return (
    <div className={container({ className })}>
      <label className={labelStyle()}>{label}</label>

      {isTextArea ? (
        <textarea
          // 必要な属性だけを明示的に渡すか、適切にキャストして渡します
          className={input({ className: "min-h-[120px] resize-y" })}
          {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input
          className={input()}
          {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
        />
      )}

      {error && <span className={errorText()}>{error}</span>}
    </div>
  );
};
