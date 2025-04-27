import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";
import { render } from "@react-email/components";
import sgMail from "@sendgrid/mail";
import nodemailer from "nodemailer";

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.GAMIL_USER,
        pass: process.env.GMAIL_PASSWORD,
      },
    });
    const emailHtml = render(VerificationEmail({ username, otp: verifyCode }));
    const mailOptions = {
      from: process.env.GAMIL_USER!,
      to: email,
      subject: "Cryptic Whisper | Verification Code",
      html: emailHtml,
    };

    // Send email using nodemailer
    await transporter.sendMail(mailOptions);

    // await sgMail.send(msg);
    return {
      success: true,
      message: "Verification code sent successfully",
    };
  } catch (error) {
    console.error("Error sending verification email", error);

    return {
      success: false,
      message: "Error sending verification email",
    };
  }
}
