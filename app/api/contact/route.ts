import { NextResponse } from "next/server";
import { Resend } from "resend";
import nodemailer from "nodemailer";

export const dynamic = "force-dynamic";

interface ContactRequestBody {
  name?: string;
  email?: string;
  message?: string;
  website_url_hp?: string; // Honeypot field for bot protection
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function generateEmailHtml({
  name,
  email,
  message,
  date,
}: {
  name: string;
  email: string;
  message: string;
  date: string;
}): string {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br/>");

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Project Inquiry</title>
</head>
<body style="margin: 0; padding: 30px; background-color: #09090b; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #f4f4f5;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 0 auto; background-color: #121215; border: 1px solid #27272a; border-radius: 16px; overflow: hidden;">
    <!-- Header -->
    <tr>
      <td style="padding: 32px 32px 24px; border-bottom: 1px solid #27272a; background: linear-gradient(135deg, rgba(255,255,255,0.03) 0%, transparent 100%);">
        <span style="display: inline-block; font-size: 11px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #a1a1aa; margin-bottom: 8px;">
          PORTFOLIO INQUIRY
        </span>
        <h1 style="margin: 0; font-size: 22px; font-weight: 800; color: #ffffff; letter-spacing: -0.02em;">
          New message from ${safeName}
        </h1>
        <p style="margin: 6px 0 0; font-size: 13px; color: #71717a;">
          Received on ${date}
        </p>
      </td>
    </tr>

    <!-- Sender Details -->
    <tr>
      <td style="padding: 24px 32px 16px;">
        <table width="100%" cellspacing="0" cellpadding="0" style="background-color: #18181b; border: 1px solid #27272a; border-radius: 10px; padding: 16px;">
          <tr>
            <td style="padding-bottom: 10px;">
              <strong style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #a1a1aa;">Name:</strong>
              <div style="font-size: 15px; color: #ffffff; margin-top: 2px;">${safeName}</div>
            </td>
          </tr>
          <tr>
            <td>
              <strong style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #a1a1aa;">Email:</strong>
              <div style="font-size: 15px; margin-top: 2px;">
                <a href="mailto:${safeEmail}" style="color: #60a5fa; text-decoration: none;">${safeEmail}</a>
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- Message Content -->
    <tr>
      <td style="padding: 16px 32px 24px;">
        <strong style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #a1a1aa; display: block; margin-bottom: 8px;">
          Message:
        </strong>
        <div style="font-size: 14px; line-height: 1.6; color: #e4e4e7; background-color: #18181b; border: 1px solid #27272a; border-radius: 10px; padding: 20px; white-space: pre-wrap;">
${safeMessage}
        </div>
      </td>
    </tr>

    <!-- Action Button -->
    <tr>
      <td style="padding: 0 32px 32px; text-align: center;">
        <a href="mailto:${safeEmail}?subject=Re:%20Project%20Inquiry%20from%20${encodeURIComponent(name)}" style="display: inline-block; background-color: #ffffff; color: #09090b; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; padding: 14px 28px; border-radius: 9999px; text-decoration: none;">
          Reply Directly to ${safeName} &rarr;
        </a>
      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style="padding: 16px 32px; border-top: 1px solid #27272a; text-align: center; font-size: 11px; color: #71717a;">
        Sent automatically from Sanjib Santra's Portfolio Contact Form.
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

export async function POST(request: Request) {
  try {
    const body: ContactRequestBody = await request.json();
    const { name, email, message, website_url_hp } = body;

    // 1. Honeypot Bot Protection: If hidden field is filled, silently succeed
    if (website_url_hp && website_url_hp.trim().length > 0) {
      return NextResponse.json({ success: true, message: "Message dispatched." });
    }

    // 2. Input Validation
    if (!name || name.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid name (at least 2 characters)." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim())) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    if (!message || message.trim().length < 5) {
      return NextResponse.json(
        { success: false, error: "Please provide a message with at least 5 characters." },
        { status: 400 }
      );
    }

    const recipient = process.env.CONTACT_EMAIL || "santrasanjib199@gmail.com";
    const dateStr = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "short",
    });

    const emailHtml = generateEmailHtml({
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
      date: dateStr,
    });

    let delivered = false;
    let providerUsed = "none";

    // 3. Strategy A: Resend API (Preferred for Next.js)
    if (process.env.RESEND_API_KEY) {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        const { error } = await resend.emails.send({
          from: process.env.EMAIL_FROM || "Portfolio <onboarding@resend.dev>",
          to: [recipient],
          replyTo: email.trim(),
          subject: `🚀 New Project Inquiry from ${name.trim()}`,
          html: emailHtml,
        });

        if (error) {
          console.error("[Resend Error]:", error);
        } else {
          delivered = true;
          providerUsed = "resend";
        }
      } catch (err) {
        console.error("[Resend Exception]:", err);
      }
    }

    // 4. Strategy B: Nodemailer / Gmail SMTP
    if (!delivered && process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
      try {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_APP_PASSWORD,
          },
        });

        await transporter.sendMail({
          from: `"${name.trim()}" <${process.env.GMAIL_USER}>`,
          to: recipient,
          replyTo: email.trim(),
          subject: `🚀 New Project Inquiry from ${name.trim()}`,
          html: emailHtml,
        });

        delivered = true;
        providerUsed = "gmail_smtp";
      } catch (err) {
        console.error("[Gmail SMTP Error]:", err);
      }
    }

    // 5. Strategy C: Web3Forms fallback (if WEB3FORMS_ACCESS_KEY provided)
    if (!delivered && process.env.WEB3FORMS_ACCESS_KEY) {
      try {
        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            access_key: process.env.WEB3FORMS_ACCESS_KEY,
            name: name.trim(),
            email: email.trim(),
            message: message.trim(),
            subject: `🚀 New Project Inquiry from ${name.trim()}`,
          }),
        });
        const data = await res.json();
        if (data.success) {
          delivered = true;
          providerUsed = "web3forms";
        }
      } catch (err) {
        console.error("[Web3Forms Fallback Error]:", err);
      }
    }

    // 6. Development Simulation Logger (When keys are not yet configured in local environment)
    if (!delivered) {
      console.log("--------------------------------------------------");
      console.log("📩 [INCOMING CONTACT INQUIRY - LOCAL DEMO MODE]");
      console.log(`From:    ${name.trim()} <${email.trim()}>`);
      console.log(`To:      ${recipient}`);
      console.log(`Date:    ${dateStr}`);
      console.log(`Message: \n${message.trim()}`);
      console.log("--------------------------------------------------");
      console.log("💡 Tip: Add RESEND_API_KEY or GMAIL_APP_PASSWORD to .env.local to deliver to real inbox.");
      console.log("--------------------------------------------------");

      return NextResponse.json({
        success: true,
        delivered: false,
        mode: "local_logged",
        message: "Message received and logged in dev server. Configure RESEND_API_KEY or GMAIL_APP_PASSWORD in .env.local to receive live emails.",
      });
    }

    return NextResponse.json({
      success: true,
      delivered: true,
      provider: providerUsed,
      message: "Message successfully delivered to inbox.",
    });
  } catch (error) {
    console.error("[Contact API Exception]:", error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
