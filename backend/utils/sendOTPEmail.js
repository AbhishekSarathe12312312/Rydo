import { Resend } from "resend";
import dotenv from "dotenv";
dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendOTPEmail = async (email, otp) => {
  try {
    const { error } = await resend.emails.send({
      from: "Rydo <onboarding@resend.dev>",
      to: [email],
      subject: "Rydo - Verify Your Email",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto;">
          <h2>Welcome to Rydo 🚗</h2>

          <p>Your verification OTP is:</p>

          <h1 style="letter-spacing: 8px;">${otp}</h1>

          <p>This OTP will expire in <strong>5 minutes</strong>.</p>

          <p>If you did not request this OTP, please ignore this email.</p>

          <p>Thank you,<br/>Rydo Team</p>
        </div>
      `,
    });

    if (error) {
      console.error("RESEND ERROR:", error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("SEND OTP EMAIL ERROR:", error);
    return false;
  }
};
