import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Hr,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";
import { type ContactFormData } from "./schema";

/**
 * お問い合わせ通知メールのテンプレート
 * React EmailとTailwind CSSを使用して構築。
 */
export const ContactEmail = ({
  name,
  email,
  subject,
  message,
}: ContactFormData) => {
  const previewText = `ポートフォリオからのお問い合わせ: ${name}様`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans">
          <Container className="border border-[#eaeaea] rounded my-10 mx-auto p-5 w-116.25">
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-7.5 mx-0">
              Portfolio Contact
            </Heading>
            <Text className="text-black text-[14px] leading-6">
              ポートフォリオサイトより、以下の内容でお問い合わせがありました。
            </Text>
            <Section className="bg-[#f9f9f9] p-4 rounded">
              <Text className="m-0 text-[14px]">
                <strong>お名前:</strong> {name}
              </Text>
              <Text className="m-0 text-[14px]">
                <strong>メールアドレス:</strong> {email}
              </Text>
              <Text className="m-0 text-[14px]">
                <strong>件名:</strong> {subject}
              </Text>
            </Section>
            <Hr className="border border-[#eaeaea] my-6.5 mx-0 w-full" />
            <Text className="text-black text-[14px] leading-6 whitespace-pre-wrap">
              {message}
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
