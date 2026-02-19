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
import styles from "./ContactSection.module.scss";

export const ContactForm = () => {
  const [isPending, startTransition] = useTransition();
  const { contactStatus, setContactStatus } = useUIStore();

  // 1. React Hook Form の初期化
  // useForm の第1引数には「入力型 (Values)」を渡し、resolver との型整合性を確保
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
    <div className={styles.formWrapper}>
      <ContactRipple />

      {contactStatus === "success" ? (
        /* 送信成功UI */
        <div className={styles.successContainer}>
          <div className={styles.successMessage}>
            <h3 className={styles.successTitle}>送信が完了しました</h3>
            <p className={styles.successText}>
              お問い合わせありがとうございます。内容を確認の上、
              <br className="hidden tablet:block" />
              順次メールにてご連絡差し上げます。
            </p>
          </div>
          <SubButton
            variant="white"
            onClick={handleBackToForm}
            leftIcon={ArrowRight}
          >
            フォームに戻る
          </SubButton>
        </div>
      ) : (
        /* 入力フォームUI */
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={styles.form}
          noValidate
        >
          <div className={styles.formGrid}>
            <FormInput
              label="お名前"
              placeholder="山田 太郎"
              required
              {...register("name")}
              error={errors.name?.message}
              isInvalid={!!errors.name}
              disabled={isSubmitting}
            />
            <FormInput
              label="メールアドレス"
              type="email"
              placeholder="yamada@gmail.com"
              required
              {...register("email")}
              error={errors.email?.message}
              isInvalid={!!errors.email}
              disabled={isSubmitting}
            />
            <FormInput
              label="件名"
              placeholder="〇〇について相談したい"
              required
              {...register("subject")}
              error={errors.subject?.message}
              isInvalid={!!errors.subject}
              disabled={isSubmitting}
            />
            <FormInput
              label="メッセージ"
              isTextArea
              placeholder="ご要件をお書きください。"
              required
              {...register("message")}
              error={errors.message?.message}
              isInvalid={!!errors.message}
              disabled={isSubmitting}
            />
          </div>

          <div className={styles.formFoot}>
            {/* プライバシーポリシー */}
            <div className={styles.privacyArea}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  className={styles.checkbox}
                  {...register("privacyPolicy")}
                  disabled={isSubmitting}
                />
                <span className={styles.agreementText}>
                  <a href="/privacy-policy" className={styles.policyLink}>
                    プライバシーポリシー
                  </a>
                  に同意する
                </span>
              </label>
              {errors.privacyPolicy?.message && (
                <p className={styles.errorText}>
                  {String(errors.privacyPolicy.message)}
                </p>
              )}
            </div>

            {/* セキュリティ検証（Turnstile） */}
            <div className={styles.securityArea}>
              <Turnstile
                sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ""}
                onVerify={(token) =>
                  setValue("cf-turnstile-response", token, {
                    shouldValidate: true,
                  })
                }
              />
              {errors["cf-turnstile-response"]?.message && (
                <p className={styles.errorText}>
                  {String(errors["cf-turnstile-response"].message)}
                </p>
              )}
            </div>

            {/* 送信ボタン */}
            <div className={styles.submitArea}>
              <SubButton
                type="submit"
                variant="white"
                isSubmit
                disabled={isSubmitting}
                leftIcon={Send}
                className={styles.submitButton}
              >
                {isSubmitting ? "送信中..." : "送信する"}
              </SubButton>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};
