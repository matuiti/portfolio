// src/components/ui/features/ContactForm.tsx
"use client";

import React from "react";
import { FormInput } from "@/components/ui/FormInput";
// import { Button } from "@/components/ui/Button";

export const ContactForm = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("送信されました！");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto p-6 bg-slate-50 rounded-2xl border border-slate-200 shadow-sm space-y-6"
    >
      <div className="space-y-1">
        <h2 className="text-xl font-bold text-slate-900">Contact Us</h2>
        <p className="text-sm text-slate-500">お気軽にお問い合わせください。</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <FormInput
          label="お名前"
          name="name"
          placeholder="山田 太郎"
          required
          // error="名前を入力してください"
        />
        <FormInput
          label="メールアドレス"
          type="email"
          name="email"
          placeholder="example@mail.com"
          required
        />
        <FormInput
          label="件名"
          name="subject"
          placeholder="お仕事のご依頼について"
          required
        />
        <FormInput
          label="メッセージ"
          name="message"
          isTextArea
          placeholder="こちらにご記入ください"
          required
        />
      </div>

      {/* <Button type="submit" intent="primary" fullWidth size="lg">
        メッセージを送信する
      </Button> */}
    </form>
  );
};
