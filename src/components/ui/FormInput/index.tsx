// src/components/ui/FormInput.tsx
import React from "react";
import { tv, type VariantProps } from "tailwind-variants";

const formInput = tv({
  slots: {
    container: "flex flex-col gap-2 w-full",
    label: "text-black leading-normal flex items-center",
    input:
      "w-full px-5 py-2.5 bg-light-gray rounded-sm focus:ring-2 focus:ring-dark-gray focus:border-dark-gray outline-none transition-all placeholder:text-dark-gray placeholder:leading-normal",
    errorText: "text-[calc(14/16*1rem)] text-red",
  },
  variants: {
    // エラーがある時のスタイル変更を一括指定
    isInvalid: {
      true: {
        input: "border-red border-2 focus:border-none",
        false:"",
      },
    },
  },
});

// 型定義：inputとtextareaの両方の属性を許容するように定義
type FormInputProps = {
  label: string;
  error?: string;
  isTextArea?: boolean;
  required?: boolean;
} & VariantProps<typeof formInput> &
  React.InputHTMLAttributes<HTMLInputElement> &
  React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const FormInput = ({
  label,
  error,
  isInvalid,
  isTextArea,
  required,
  className,
  ...props
}: FormInputProps) => {
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
      <label className={labelStyle()}>
        {/* {label} */}
        {/* 必須タグの表示ロジック */}
        {required && (
          <span className="bg-red mr-1.5 text-white text-[calc(12/16*1rem)] px-1 py-0.5 rounded-sm">
            必須
          </span>
        )}
        {label}
      </label>

      {isTextArea ? (
        <textarea
          // 必要な属性だけを明示的に渡すか、適切にキャストして渡します
          className={input({ className: "min-h-30 resize-y" })}
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
