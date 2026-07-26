"use client";

import { Mail, MapPin, Phone } from "lucide-react";
import { FormEvent, useState } from "react";
import { contactInfo, socialLinks } from "@/data/site";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FacebookIcon, InstagramIcon } from "@/components/ui/SocialIcons";

type FormState = {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
};

const initialState: FormState = {
  name: "",
  email: "",
  phone: "",
  service: "Wedding Photography",
  message: "",
};

export function Contact() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const endpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;
  const isDemo = !endpoint;

  const validate = () => {
    const next: Partial<FormState> = {};
    if (!form.name.trim()) next.name = "Please enter your name.";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = "Please enter a valid email.";
    }
    if (!form.message.trim() || form.message.trim().length < 12) {
      next.message = "Please share a bit more about your session.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) return;

    setStatus("submitting");

    try {
      if (isDemo) {
        await new Promise((resolve) => setTimeout(resolve, 700));
        setStatus("success");
        setForm(initialState);
        return;
      }

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) throw new Error("Submission failed");
      setStatus("success");
      setForm(initialState);
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="section-padding bg-white">
      <div className="container-page grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <Reveal direction="left">
          <SectionHeading
            eyebrow="Contact"
            title="Let's begin your story."
            description="Share a few details and we'll respond with availability, creative direction notes, and next steps."
            className="mb-8"
          />

          <form className="space-y-5" onSubmit={onSubmit} noValidate>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                label="Name"
                id="name"
                error={errors.name}
                value={form.name}
                onChange={(value) =>
                  setForm((prev) => ({ ...prev, name: value }))
                }
              />
              <Field
                label="Email"
                id="email"
                type="email"
                error={errors.email}
                value={form.email}
                onChange={(value) =>
                  setForm((prev) => ({ ...prev, email: value }))
                }
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                label="Phone"
                id="phone"
                value={form.phone}
                onChange={(value) =>
                  setForm((prev) => ({ ...prev, phone: value }))
                }
              />
              <div>
                <label
                  htmlFor="service"
                  className="mb-2 block text-sm font-medium">
                  Service
                </label>
                <select
                  id="service"
                  className="w-full border border-dark/10 bg-off-white px-4 py-3 text-sm outline-none transition focus:border-accent"
                  value={form.service}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      service: event.target.value,
                    }))
                  }>
                  <option>Wedding Photography</option>
                  <option>Pre-wedding Photography</option>
                  <option>Portrait Photography</option>
                  <option>Family Photography</option>
                  <option>Corporate Photography</option>
                  <option>Events</option>
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="message"
                className="mb-2 block text-sm font-medium">
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                className="w-full resize-y border border-dark/10 bg-off-white px-4 py-3 text-sm outline-none transition focus:border-accent"
                value={form.message}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, message: event.target.value }))
                }
                aria-invalid={Boolean(errors.message)}
              />
              {errors.message ? (
                <p className="mt-2 text-sm text-accent">{errors.message}</p>
              ) : null}
            </div>

            <MagneticButton type="submit" className="min-w-44">
              {status === "submitting" ? "Sending..." : "Send Inquiry"}
            </MagneticButton>

            {status === "success" ? (
              <p className="text-sm text-primary" role="status">
                Thank you — your inquiry has been received.
              </p>
            ) : null}
            {status === "error" ? (
              <p className="text-sm text-accent" role="alert">
                Something went wrong. Please try again or email us directly.
              </p>
            ) : null}
          </form>
        </Reveal>

        <Reveal direction="right" delay={0.1}>
          <aside className="h-full bg-off-white p-8 sm:p-10">
            <h3 className="text-2xl font-semibold">Studio details</h3>
            <ul className="mt-8 space-y-5 text-sm text-muted sm:text-base">
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 text-accent" size={18} aria-hidden />
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="hover:text-primary">
                  {contactInfo.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 text-accent" size={18} aria-hidden />
                <a
                  href={`tel:${contactInfo.phone}`}
                  className="hover:text-primary">
                  {contactInfo.phone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 text-accent" size={18} aria-hidden />
                <span>{contactInfo.address}</span>
              </li>
            </ul>

            <div className="mt-8 flex gap-3">
              {socialLinks.map((link) => {
                const Icon =
                  link.icon === "facebook" ? FacebookIcon : InstagramIcon;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={link.label}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-dark/10 text-body transition hover:border-accent hover:text-accent">
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>

            <div className="mt-10 flex min-h-56 items-center justify-center border border-dashed border-dark/15 bg-white text-center text-sm text-muted">
              {contactInfo.mapEmbedLabel}
            </div>
          </aside>
        </Reveal>
      </div>
    </section>
  );
}

function Field({
  label,
  id,
  value,
  onChange,
  error,
  type = "text",
}: {
  label: string;
  id: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium">
        {label}
      </label>
      <input
        id={id}
        type={type}
        className="w-full border border-dark/10 bg-off-white px-4 py-3 text-sm outline-none transition focus:border-accent"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={Boolean(error)}
      />
      {error ? <p className="mt-2 text-sm text-accent">{error}</p> : null}
    </div>
  );
}
