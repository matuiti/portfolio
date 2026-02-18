// src / app / home / components / ContactSection / schema.ts;
import { z } from "zod";

/**
 * お問い合わせフォームのバリデーションスキーマ
 */
export const contactSchema = z.object({
  name: z
    .string()
    .min(1, "お名前を入力してください")
    .max(50, "お名前は50文字以内で入力してください"),
  email: z
    .string()
    .min(1, "メールアドレスを入力してください")
    .email("正しいメールアドレスの形式で入力してください"),
  subject: z.string().min(1, "件名を選択してください"),
  message: z
    .string()
    .min(1, "メッセージを入力してください")
    .max(2000, "メッセージは2000文字以内で入力してください"),

  // 入力時は string | boolean を許容し、検証後は true であることを保証
  privacyPolicy: z
    .union([z.boolean(), z.string()])
    .transform((val) => val === true || val === "true" || val === "on")
    .refine((val) => val === true, {
      message: "プライバシーポリシーへの同意が必要です",
    }),

  // Cloudflare Turnstile トークン
  "cf-turnstile-response": z
    .string()
    .min(1, "セキュリティ検証を完了させてください"),
});

/**
 * フォームの「入力値」の型 (React Hook Form の状態管理用)
 */
export type ContactFormValues = z.input<typeof contactSchema>;

/**
 * バリデーション通過後の「出力値」の型 (Server Action への送信用)
 */
export type ContactFormData = z.output<typeof contactSchema>;