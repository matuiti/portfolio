// src / app / home / components / ContactSection / actions.ts;
"use server";

import { Resend } from "resend";
import { siteConfig } from "@/data/site-config";
import { contactSchema } from "./schema";
import { ContactEmail } from "./ContactEmail";

export type ActionState = {
  status: "idle" | "loading" | "success" | "error" | "validation-error";
  message: string;
  errors?: Record<string, string[]>;
};

const resend = new Resend(process.env.RESEND_API_KEY);
const TURNSTILE_SECRET_KEY = process.env.TURNSTILE_SECRET_KEY;

/**
 * お問い合わせフォーム Server Action
 * 多層防御と型安全を徹底した実装。
 */
export async function sendContactAction(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  // 1. データの抽出とZodバリデーション
  const rawData = Object.fromEntries(formData.entries());
  const validatedFields = contactSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      status: "validation-error",
      message: "入力内容に不備があります。",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const data = validatedFields.data;

  // 2. Cloudflare Turnstile トークンの検証
  const turnstileToken = data["cf-turnstile-response"];

  try {
    const verifyResponse = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `secret=${encodeURIComponent(TURNSTILE_SECRET_KEY!)}&response=${encodeURIComponent(
          turnstileToken,
        )}`,
      },
    );

    const verifyData = (await verifyResponse.json()) as { success: boolean };

    if (!verifyData.success) {
      return {
        status: "error",
        message: "スパムの疑いがあるため送信を中断しました。",
      };
    }
  } catch {
    return { status: "error", message: "検証サーバーとの通信に失敗しました。" };
  }

  // 3. レート制限ロジック (将来的な拡張用)

  // 4. Resendによるメール送信
  try {
    const { error: resendError } = await resend.emails.send({
      from: siteConfig.email.from,
      to: [process.env.CONTACT_EMAIL_FROM || siteConfig.email.admin],
      subject: `【お問い合わせ】${data.subject}`,
      replyTo: data.email,
      // 修正箇所：ContactEmailのPropsに合致するようにスプレッド演算子で展開
      react: ContactEmail({ ...data }),
    });

    if (resendError) {
      // ★ここを追加：Resendが返してきた「生の理由」を表示する
      console.log("Resend APIからのエラー詳細:", resendError);
      return {
        status: "error",
        message: "メール送信中にエラーが発生しました。",
      };
    }

    return {
      status: "success",
      message: "お問い合わせを受け付けました。ありがとうございます。",
    };
  } catch(error) {
    // ★ここを追加：エラーの正体をコンソールに出力する
    console.error("Resend送信エラーの詳細:", error);
    return { status: "error", message: "システムエラーが発生しました。" };
  }
}
