'use server';

import { Resend } from 'resend';
import { SITE_CONFIG } from '@/data/site';
import { contactSchema } from './schema';
import { ContactEmail } from './ContactEmail';
import { z } from 'zod';

export type ActionState = {
  status: 'idle' | 'loading' | 'success' | 'error' | 'validation-error';
  message: string;
  errors?: Record<string, string[]>;
};

const resend = new Resend(process.env.RESEND_API_KEY);
const TURNSTILE_SECRET_KEY = process.env.TURNSTILE_SECRET_KEY;

/**
 * お問い合わせフォーム Server Action
 * 多層防御と型安全の徹底。
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
      status: 'validation-error',
      message: '入力内容に不備があります。',
      errors: z.flattenError(validatedFields.error).fieldErrors,
    };
  }

  const data = validatedFields.data;

  // 宛先の確認（未設定なら Turnstile の検証や送信を行わずに中断する）
  const to = process.env.CONTACT_EMAIL_TO;
  if (!to) {
    console.error('[contact] CONTACT_EMAIL_TO が未設定です');
    return {
      status: 'error',
      message: '現在フォームを利用できません。お手数ですが直接メールでご連絡ください。',
    };
  }

  // 2. Cloudflare Turnstile トークンの検証
  const turnstileToken = data['cf-turnstile-response'];

  try {
    const verifyResponse = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `secret=${encodeURIComponent(TURNSTILE_SECRET_KEY!)}&response=${encodeURIComponent(
          turnstileToken,
        )}`,
      },
    );

    const verifyData = (await verifyResponse.json()) as { success: boolean };

    if (!verifyData.success) {
      return {
        status: 'error',
        message: 'スパムの疑いがあるため送信を中断しました。',
      };
    }
  } catch {
    return { status: 'error', message: '検証サーバーとの通信に失敗しました。' };
  }

  // 3. レート制限ロジック (将来的な拡張用)

  // 4. Resendによるメール送信
  try {
    const { error: resendError } = await resend.emails.send({
      from: SITE_CONFIG.email.from,
      to: [to],
      subject: `【お問い合わせ】${data.subject}`,
      replyTo: data.email,
      react: ContactEmail({ ...data }),
    });

    if (resendError) {
      // 宛先アドレスがログに残らないよう、メッセージ中のアドレスは伏せる
      console.error('[contact] Resend がエラーを返しました', {
        name: resendError.name,
        message: resendError.message.replace(
          /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g,
          '[redacted]',
        ),
      });
      return {
        status: 'error',
        message: 'メール送信中にエラーが発生しました。',
      };
    }

    return {
      status: 'success',
      message: 'お問い合わせ頂き、ありがとうございます。',
    };
  } catch (error) {
    return {
      status: 'error',
      message: `システムエラーが発生しました。 error: ${error}`,
    };
  }
}
