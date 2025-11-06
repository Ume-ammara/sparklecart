import Mailgen, { Content } from "mailgen";

import { mailtrapTransporter } from "../config/mailtrap.config.js";
import { resendTransporter } from "../config/resend.config.js";
import { ApiError } from "./ApiError.js";
import { env } from "../config/env.config.js";

interface ISendEmailInput {
  email: string;
  subject: string;
  mailGenContent: Content;
}

export const sendEmail = async ({ email, subject, mailGenContent }: ISendEmailInput) => {
  const mailGenerator = new Mailgen({
    theme: "salted",
    product: {
      name: "SparkleCart",
      link: "https://sparklecart.com",
      copyright: `Copyright © ${new Date().getFullYear()} SparkleCart. All rights reserved.`,
    },
  });

  const emailHTML = mailGenerator.generate(mailGenContent);
  const emailText = mailGenerator.generatePlaintext(mailGenContent);

  const nodeEnv = env.NODE_ENV?.trim().toLowerCase();

  try {
    if (nodeEnv === "development") {
      const info = await mailtrapTransporter.sendMail({
        from: env.SENDER_EMAIL,
        to: email,
        subject,
        text: emailText,
        html: emailHTML,
      });

      if (!info?.messageId) {
        console.error("Mailtrap failed:", info);
        throw new ApiError(400, "Failed to send email via Mailtrap", info);
      }
    } else {
      const response = await resendTransporter.emails.send({
        from: env.SENDER_EMAIL,
        to: email,
        subject,
        text: emailText,
        html: emailHTML,
      });

      if (!response || response.error) {
        console.error("Resend failed:", response?.error);
        throw new ApiError(400, "Failed to send email via Resend", response);
      }
    }

    console.log(`Email sent successfully  to ${email}`);
  } catch (error) {
    console.error("Error in sending email:", error);
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(500, "Unable to send email", error);
  }
};
