import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";
import { render } from "@react-email/components";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    const emailHtml = render(VerificationEmail({ username, otp: verifyCode }));
    const msg = {
      to: email,
      from: process.env.OUTLOOK_EMAIL!,
      subject: "M4You | Verification Code",
      html: emailHtml,
    };
    await sgMail.send(msg);
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
