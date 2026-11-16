import { parsePhoneNumberFromString } from "libphonenumber-js";
import { z } from "zod";

export const contactSchema = z.object({
  email: z.string().trim().email("Please enter a valid email."),
  mobile: z
    .string()
    .trim()
    .refine((value) => parsePhoneNumberFromString(value, "US")?.isValid() ?? false, {
      message: "Please enter a valid mobile number, with country code.",
    }),
  message: z
    .string()
    .trim()
    .min(1, "Message cannot be empty.")
    .max(5000, "Please keep it under 5,000 characters."),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type ContactErrors = Partial<Record<keyof ContactInput, string>>;

/** Field-level errors for the form, or null when the input is valid. */
export function validateContact(input: unknown): ContactErrors | null {
  const result = contactSchema.safeParse(input);
  if (result.success) return null;
  const errors: ContactErrors = {};
  for (const issue of result.error.issues) {
    const field = issue.path[0] as keyof ContactInput;
    errors[field] ??= issue.message;
  }
  return errors;
}

const entities: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

export function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (char) => entities[char]);
}

export function formatPhone(value: string) {
  return parsePhoneNumberFromString(value, "US")?.formatInternational() ?? value;
}

/** The notification email sent to the site owner. User input is escaped. */
export function renderContactEmail({ email, mobile, message }: ContactInput) {
  return `
    <h1>New contact form submission</h1>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Mobile:</strong> ${escapeHtml(formatPhone(mobile))}</p>
    <p><strong>Message:</strong></p>
    <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
  `;
}
