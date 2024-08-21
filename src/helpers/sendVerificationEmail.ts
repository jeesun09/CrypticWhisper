import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";
import nodemailer from "nodemailer";
import { render } from "@react-email/components";

const transporter = nodemailer.createTransport({
  host: "smtp.office365.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    // await resend.emails.send({
    //   from: "onboarding@resend.dev",
    //   to: email,
    //   subject: "M4You | Verification Code",
    //   react: VerificationEmail({ username, otp: verifyCode }),
    // });
    const emailHtml = render(VerificationEmail({ username, otp: verifyCode }));
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "M4You | Verification Code",
      html: emailHtml,
    })

    return {
      success: true,
      message: "Verification email sent",
    };
  } catch (emailError) {
    console.error("Error sending verification email", emailError);
    return {
      success: false,
      message: "Error sending verification email",
    };
  }
}
