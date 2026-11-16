import { useState, type FormEvent } from "react";

import { hero, site } from "#/content/site";
import { validateContact, type ContactErrors, type ContactInput } from "#/lib/contact";
import { scrollToId } from "#/lib/scroll";
import { sendContact } from "#/server/contact";
import { SectionHead } from "./SectionHead";

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "sent" }
  | { kind: "error"; message: string };

const fields: {
  name: keyof ContactInput;
  label: string;
  type: string;
  placeholder: string;
  autoComplete: string;
}[] = [
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "you@company.com",
    autoComplete: "email",
  },
  {
    name: "mobile",
    label: "Mobile",
    type: "tel",
    placeholder: "+1 415 555 0123",
    autoComplete: "tel",
  },
];

const inputClass =
  "w-full border-0 border-b border-line bg-transparent px-0 pt-2 pb-3 text-[clamp(1.25rem,2vw,1.6rem)] tracking-tight placeholder:text-mute/50 focus:border-ink focus:ring-0 focus:outline-none transition-colors";

export function Contact() {
  const [values, setValues] = useState<ContactInput>({ email: "", mobile: "", message: "" });
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const update = (name: keyof ContactInput, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    const found = validateContact(values);
    if (found) {
      setErrors(found);
      return;
    }
    setStatus({ kind: "sending" });
    try {
      await sendContact({ data: values });
      setStatus({ kind: "sent" });
      setValues({ email: "", mobile: "", message: "" });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Something went wrong.";
      setStatus({ kind: "error", message });
    }
  }

  return (
    <section id="contact" className="gutter pt-[clamp(6rem,14vw,12rem)]">
      <SectionHead index="06" label="Get in touch" aside="Every message is read" />

      <div className="mt-10 grid gap-16 md:mt-16 md:grid-cols-12">
        <div className="md:col-span-6">
          <p className="display text-[clamp(3rem,7.4vw,8rem)] text-balance">
            Let's make the digital world{" "}
            <em className="font-serif font-normal tracking-[-0.02em] text-signal italic">
              more exciting.
            </em>
          </p>
          <p className="mt-8 max-w-[38ch] font-mono text-sm leading-relaxed text-mute">
            Feel free to reach out for any enquiries or assistance — a new product, an app that
            needs shipping, or a second pair of hands on an existing codebase.
          </p>
        </div>

        <form noValidate onSubmit={onSubmit} className="flex flex-col gap-10 md:col-span-6 md:pt-3">
          {fields.map((field, i) => (
            <label key={field.name} className="block">
              <span className="label flex justify-between text-mute">
                <span>
                  ({String.fromCharCode(97 + i)}) {field.label}
                </span>
                {errors[field.name] && <span className="text-signal">{errors[field.name]}</span>}
              </span>
              <input
                name={field.name}
                type={field.type}
                autoComplete={field.autoComplete}
                placeholder={field.placeholder}
                value={values[field.name]}
                onChange={(e) => update(field.name, e.target.value)}
                aria-invalid={Boolean(errors[field.name])}
                className={inputClass}
              />
            </label>
          ))}
          <label className="block">
            <span className="label flex justify-between text-mute">
              <span>(c) Message</span>
              {errors.message && <span className="text-signal">{errors.message}</span>}
            </span>
            <textarea
              name="message"
              rows={4}
              placeholder="Tell me about the project…"
              value={values.message}
              onChange={(e) => update("message", e.target.value)}
              aria-invalid={Boolean(errors.message)}
              className={`${inputClass} resize-none`}
            />
          </label>

          <div className="flex flex-wrap items-center justify-between gap-6">
            <p aria-live="polite" className="label min-h-[1.2em] max-w-[40ch]">
              {status.kind === "sent" && (
                <span>Message received — thank you. I'll be in touch.</span>
              )}
              {status.kind === "error" && <span className="text-signal">{status.message}</span>}
            </p>
            <button
              type="submit"
              disabled={status.kind === "sending"}
              className="group relative overflow-hidden bg-ink px-8 py-5 text-paper disabled:opacity-60"
            >
              <span
                aria-hidden
                className="absolute inset-0 origin-left scale-x-0 bg-signal transition-transform duration-500 ease-out-expo group-hover:scale-x-100"
              />
              <span className="label relative flex items-center gap-6 text-[0.75rem]">
                {status.kind === "sending" ? "Sending…" : "Send message"}
                <span className="transition-transform duration-500 ease-out-expo group-hover:translate-x-1">
                  →
                </span>
              </span>
            </button>
          </div>
        </form>
      </div>

      <Colophon />
    </section>
  );
}

function Colophon() {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${site.email}`;
    }
  }

  return (
    <footer className="mt-[clamp(6rem,12vw,10rem)]">
      <div className="grid gap-8 border-t border-line pt-6 sm:grid-cols-2 md:grid-cols-4">
        <div>
          <p className="label text-mute">Write</p>
          <button
            type="button"
            onClick={copyEmail}
            className="link-draw mt-2 text-left text-lg tracking-tight"
          >
            {copied ? "Copied to clipboard" : site.email}
          </button>
        </div>
        <div>
          <p className="label text-mute">Elsewhere</p>
          <ul className="mt-2 flex gap-5 text-lg tracking-tight">
            {site.links.map((link) => (
              <li key={link.label}>
                <a href={link.href} target="_blank" rel="noreferrer" className="link-draw">
                  {link.label} ↗
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="label text-mute">Colophon</p>
          <p className="mt-2 font-mono text-xs leading-relaxed text-mute">
            Set in Inter Tight, Instrument Serif &amp; JetBrains Mono. Built with TanStack Start,
            Tailwind CSS and Vite+.
          </p>
        </div>
        <div className="md:text-right">
          <p className="label text-mute">{hero.kicker}</p>
          <button type="button" onClick={() => scrollToId("top")} className="label link-draw mt-2">
            Back to top ↑
          </button>
        </div>
      </div>

      {/* The name, cropped by the bottom of the page. */}
      <div aria-hidden className="mt-16 h-[20vw] overflow-hidden md:mt-24">
        <p className="display text-center text-[29vw] leading-[0.8] whitespace-nowrap">
          {site.name.toUpperCase()}
        </p>
      </div>
      <div className="label flex justify-between border-t border-line py-4 pb-28 text-mute md:pb-20">
        <span>
          © {new Date().getFullYear()} {site.name}
        </span>
        <span>All rights reserved</span>
      </div>
    </footer>
  );
}
