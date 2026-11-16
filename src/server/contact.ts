import { createServerFn } from "@tanstack/react-start";
import nodemailer from "nodemailer";

import { contactSchema, renderContactEmail } from "#/lib/contact";

/**
 * Sends the contact form to the site owner's inbox.
 * Needs EMAIL_HOST, EMAIL_PORT, EMAIL_USER and EMAIL_PASS — Worker secrets
 * in production (`wrangler secret put`), `.dev.vars` locally. Port 25 is
 * blocked on Workers; use 587 (STARTTLS) or 465 (TLS).
 */
export const sendContact = createServerFn({ method: "POST" })
  .validator(contactSchema)
  .handler(async ({ data }) => {
    const { EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS } = process.env;
    if (!EMAIL_HOST || !EMAIL_USER || !EMAIL_PASS) {
      throw new Error("The contact form isn't configured yet. Please email me directly.");
    }

    const port = Number(EMAIL_PORT ?? 587);
    const transporter = nodemailer.createTransport({
      host: EMAIL_HOST,
      port,
      secure: port === 465,
      auth: { user: EMAIL_USER, pass: EMAIL_PASS },
    });

    try {
      await transporter.sendMail({
        from: `Portfolio contact <${EMAIL_USER}>`,
        to: EMAIL_USER,
        replyTo: data.email,
        subject: `New enquiry from ${data.email}`,
        html: renderContactEmail(data),
      });
    } catch (error) {
      console.error("[contact] sendMail failed", error);
      throw new Error("Your message couldn't be sent. Please try again or email me directly.");
    }

    return { ok: true as const };
  });
