// src/components/ui/features/ContactForm.tsx
"use client";

import React, { useTransition, useCallback } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Turnstile from "react-turnstile";

import { FormInput } from "@/components/ui/FormInput";
import { SubButton } from "@/components/ui/Buttons/SubButton";
import { Send, ArrowRight } from "@/components/ui/Icons";
import {
  contactSchema,
  type ContactFormValues,
  type ContactFormData,
} from "./schema";
import { sendContactAction } from "./actions";
import { useUIStore } from "@/store/useUIStore";
import { ContactRipple } from "./ContactRipple";

/**
 * CONTACTセクション：フォームコンポーネント
 * 型不整合（Error 2322, 2345）および描画エラーを解消した最終版
 */
export const ContactForm = () => {
  const [isPending, startTransition] = useTransition();
  const { contactStatus, setContactStatus } = useUIStore();

  // 1. React Hook Form の初期化
  // useForm の第1引数には「入力型 (Values)」を渡し、resolver との型整合性を確保 (Error 2322 対策)
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
      privacyPolicy: false,
      "cf-turnstile-response": "",
    },
  });

  // 2. 送信処理
  // handleSubmit から渡される data はバリデーション後の出力型 (ContactFormData) となる
  const onSubmit: SubmitHandler<ContactFormValues> = useCallback(
    async (data) => {
      const validatedData = data as ContactFormData;
      setContactStatus("submitting");

      startTransition(async () => {
        const formData = new FormData();
        (Object.keys(validatedData) as Array<keyof ContactFormData>).forEach(
          (key) => {
            formData.append(key, String(validatedData[key]));
          },
        );

        const result = await sendContactAction(
          { status: "idle", message: "" },
          formData,
        );

        if (result.status === "success") {
          setContactStatus("success");
          reset();
        } else {
          setContactStatus("error");
          alert(result.message);
        }
      });
    },
    [reset, setContactStatus],
  );

  const handleBackToForm = () => setContactStatus("idle");
  const isSubmitting = isPending || contactStatus === "submitting";

  return (
    <div className="relative">
      <ContactRipple />

      {contactStatus === "success" ? (
        /* 送信成功UI */
        <div className="flex flex-col items-center justify-center py-[calc(60/16*1rem)] space-y-[calc(32/16*1rem)] animate-fade-in">
          <div className="text-center space-y-[calc(16/16*1rem)]">
            <h3 className="text-[calc(24/16*1rem)] font-bold text-black">
              送信が完了しました
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed px-4">
              お問い合わせありがとうございます。内容を確認の上、
              <br className="hidden tablet:block" />
              順次メールにてご連絡差し上げます。
            </p>
          </div>
          <SubButton
            variant="white"
            onClick={handleBackToForm}
            leftIcon={ArrowRight}
            className="min-w-[calc(200/16*1rem)]"
          >
            フォームに戻る
          </SubButton>
        </div>
      ) : (
        /* 入力フォームUI */
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-2xl mx-auto space-y-[calc(32/16*1rem)]"
          noValidate
        >
          <div className="grid grid-cols-1 tablet:grid-cols-2 gap-icon-24">
            <FormInput
              label="お名前"
              placeholder="山田 太郎"
              {...register("name")}
              error={errors.name?.message}
              isInvalid={!!errors.name}
              disabled={isSubmitting}
            />
            <FormInput
              label="メールアドレス"
              type="email"
              placeholder="example@mail.com"
              {...register("email")}
              error={errors.email?.message}
              isInvalid={!!errors.email}
              disabled={isSubmitting}
            />
          </div>

          <FormInput
            label="件名"
            placeholder="制作のご依頼について"
            {...register("subject")}
            error={errors.subject?.message}
            isInvalid={!!errors.subject}
            disabled={isSubmitting}
          />
          <FormInput
            label="メッセージ"
            isTextArea
            placeholder="ご相談内容を自由に入力してください"
            {...register("message")}
            error={errors.message?.message}
            isInvalid={!!errors.message}
            disabled={isSubmitting}
          />

          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                className="w-5 h-5 border-2 border-dark-gray rounded-sm checked:bg-black transition-all"
                {...register("privacyPolicy")}
                disabled={isSubmitting}
              />
              <span className="text-sm text-slate-700">
                <a
                  href="/privacy-policy"
                  className="underline hover:no-underline"
                >
                  プライバシーポリシー
                </a>
                に同意する
              </span>
            </label>
            {/* エラーメッセージの文字列のみを描画 (Error 2322 対策) */}
            {errors.privacyPolicy?.message && (
              <p className="text-xs text-red-500">
                {String(errors.privacyPolicy.message)}
              </p>
            )}
          </div>

          <div className="flex flex-col items-center gap-2">
            <Turnstile
              sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ""}
              onVerify={(token) =>
                setValue("cf-turnstile-response", token, {
                  shouldValidate: true,
                })
              }
            />
            {errors["cf-turnstile-response"]?.message && (
              <p className="text-xs text-red-500">
                {String(errors["cf-turnstile-response"].message)}
              </p>
            )}
          </div>

          <div className="flex justify-center pt-4">
            <SubButton
              type="submit"
              variant="white"
              isSubmit
              disabled={isSubmitting}
              leftIcon={Send}
              className="w-full tablet:w-auto min-w-[calc(240/16*1rem)]"
            >
              {isSubmitting ? "送信中..." : "内容を確認して送信する"}
            </SubButton>
          </div>
        </form>
      )}
    </div>
  );
};