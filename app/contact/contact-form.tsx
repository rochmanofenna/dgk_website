"use client"

import { useState } from "react"

/**
 * ContactForm — no backend, no database. On submit we assemble a
 * well-formatted email body and launch the visitor's mail client via a
 * mailto: link. This is the right choice for a static MVP: zero moving
 * parts, zero data to protect, and responses arrive in the same inbox
 * the team already monitors.
 */

const RECIPIENT = "dinamikaglobalkorpora@gmail.com"

type Field = "name" | "company" | "email" | "origin" | "destination" | "message"

type FormState = Record<Field, string>

const EMPTY: FormState = {
  name: "",
  company: "",
  email: "",
  origin: "",
  destination: "",
  message: "",
}

export function ContactForm() {
  const [state, setState] = useState<FormState>(EMPTY)
  const [sent, setSent] = useState(false)

  const update =
    (key: Field) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setState((s) => ({ ...s, [key]: e.target.value }))

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const subject = `Quote request — ${state.origin || "origin"} → ${
      state.destination || "destination"
    }`
    const bodyLines = [
      `Name: ${state.name}`,
      state.company ? `Company: ${state.company}` : null,
      `Email: ${state.email}`,
      "",
      `Origin: ${state.origin || "(not specified)"}`,
      `Destination: ${state.destination || "(not specified)"}`,
      "",
      "Message:",
      state.message || "(no additional detail)",
      "",
      "—",
      "Sent from dinamikaglobalkorpora.com",
    ].filter(Boolean)

    const href = `mailto:${RECIPIENT}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(bodyLines.join("\n"))}`

    window.location.href = href
    setSent(true)
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="flex flex-col gap-6 border border-fog bg-paper p-6 sm:p-10"
    >
      <div className="flex items-center justify-between border-b border-fog pb-4">
        <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-ink-muted">
          Form 01 · Quote Request
        </p>
        <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-brand-red">
          Response &lt; 24h
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Name" required>
          <input
            required
            type="text"
            value={state.name}
            onChange={update("name")}
            autoComplete="name"
            className={inputClass}
          />
        </Field>
        <Field label="Company">
          <input
            type="text"
            value={state.company}
            onChange={update("company")}
            autoComplete="organization"
            className={inputClass}
          />
        </Field>
      </div>

      <Field label="Email" required>
        <input
          required
          type="email"
          value={state.email}
          onChange={update("email")}
          autoComplete="email"
          className={inputClass}
        />
      </Field>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Origin">
          <input
            type="text"
            value={state.origin}
            onChange={update("origin")}
            placeholder="e.g. Jakarta"
            className={inputClass}
          />
        </Field>
        <Field label="Destination">
          <input
            type="text"
            value={state.destination}
            onChange={update("destination")}
            placeholder="e.g. Surabaya"
            className={inputClass}
          />
        </Field>
      </div>

      <Field label="Message" required>
        <textarea
          required
          rows={5}
          value={state.message}
          onChange={update("message")}
          placeholder="Tell us about the consignment — weight band, window, cold chain, etc."
          className={`${inputClass} resize-y`}
        />
      </Field>

      <div className="flex flex-col gap-3 border-t border-fog pt-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-muted">
          {sent
            ? "Your mail client should open — if not, email us directly."
            : "Submitting opens your email client with the message pre-filled."}
        </p>
        <button
          type="submit"
          className="group inline-flex items-center gap-2.5 bg-brand-red px-6 py-3 font-mono text-[11px] uppercase tracking-[0.24em] text-white transition-colors hover:bg-brand-red-deep focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-red"
        >
          Send request
          <svg
            aria-hidden
            viewBox="0 0 24 24"
            className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1.5 group-hover:-translate-y-0.5"
          >
            <path
              d="M5 19 L19 5 M10 5 H19 V14"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="square"
            />
          </svg>
        </button>
      </div>
    </form>
  )
}

const inputClass =
  "block w-full border border-fog bg-paper px-4 py-3 text-[15px] text-ink outline-none transition-colors placeholder:text-ink-faint focus:border-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red"

function Field({
  label,
  required,
  children,
}: {
  label: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.24em] text-ink-muted">
        {label}
        {required && <span className="text-brand-red">*</span>}
      </span>
      {children}
    </label>
  )
}
