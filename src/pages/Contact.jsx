import { Link } from "react-router-dom";
import { useMemo, useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    topic: "General",
    message: "",
  });

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    message: false,
  });

  const [status, setStatus] = useState("idle"); // idle | sending | sent

  const emailOk = useMemo(() => {
    if (!form.email) return false;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
  }, [form.email]);

  const nameOk = form.name.trim().length >= 2;
  const messageOk = form.message.trim().length >= 10;

  const canSubmit = nameOk && emailOk && messageOk && status !== "sending";

  const onChange = (key) => (e) =>
    setForm((p) => ({ ...p, [key]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true });
    if (!canSubmit) return;

    // Demo-only: fake send
    setStatus("sending");
    await new Promise((r) => setTimeout(r, 900));
    setStatus("sent");

    // reset
    setForm({ name: "", email: "", topic: "General", message: "" });
    setTouched({ name: false, email: false, message: false });
    setTimeout(() => setStatus("idle"), 1800);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <div className="bg-white/80 backdrop-blur border-b border-gray-100 px-4 py-3 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
          <Link
            to="/"
            className="flex items-center gap-2 text-xs text-gray-500 hover:text-gray-700 no-underline"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M8 2L4 6l4 4" />
            </svg>
            Home
          </Link>

          <span className="text-sm font-medium text-gray-900">Contact</span>

          <Link
            to="/about"
            className="text-xs text-teal-600 hover:text-teal-800 font-medium no-underline"
          >
            About
          </Link>
        </div>
      </div>

      {/* Header / hero */}
      <div className="px-4 pt-8 pb-6">
        <div className="max-w-6xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl border border-gray-100 bg-gradient-to-br from-teal-600 via-emerald-600 to-teal-700 text-white">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-white/20 blur-2xl" />
              <div className="absolute -bottom-28 -left-28 w-72 h-72 rounded-full bg-white/20 blur-2xl" />
            </div>

            <div className="relative p-7 sm:p-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs">
                <span className="w-2 h-2 rounded-full bg-white/80" />
                We’d love to hear from you
              </div>

              <h1 className="mt-4 text-2xl sm:text-3xl md:text-4xl font-semibold leading-tight">
                Contact MediNear
              </h1>

              <p className="mt-3 text-sm sm:text-base text-white/85 leading-relaxed max-w-2xl">
                Send feedback, report an issue, or request a feature. If you’re
                a provider and want to be listed, choose “Provider listing”.
              </p>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <a
                  href="mailto:contact@medinear.app"
                  className="text-sm px-4 py-2.5 rounded-xl bg-white text-teal-700 font-medium hover:bg-white/90 transition no-underline text-center"
                >
                  Email us
                </a>
                <Link
                  to="/doctor-search"
                  className="text-sm px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white font-medium hover:bg-white/15 transition no-underline text-center"
                >
                  Browse doctors
                </Link>
              </div>

              <p className="mt-5 text-xs text-white/70 leading-relaxed max-w-2xl">
                Note: This is a demo contact form. You can connect it to a real
                backend later (Node/Express + database).
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Left: info cards */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-white border border-gray-100 rounded-2xl p-5">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 border border-teal-100 flex items-center justify-center flex-shrink-0">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path
                      d="M3.5 6.5c0-2 1.6-3.5 3.5-3.5h2c1.9 0 3.5 1.5 3.5 3.5v3c0 2-1.6 3.5-3.5 3.5h-2c-1.9 0-3.5-1.5-3.5-3.5v-3z"
                      strokeLinecap="round"
                    />
                    <path d="M6 6h4M6 8h4M6 10h3" strokeLinecap="round" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-900">
                    Common topics
                  </p>
                  <p className="mt-1 text-sm text-gray-600 leading-relaxed">
                    Feature requests, bug reports, provider listing, or general
                    feedback.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-100 rounded-2xl p-5">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 border border-teal-100 flex items-center justify-center flex-shrink-0">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path
                      d="M3 4.5h10v7H3v-7z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M3.5 5l4.5 3.5L12.5 5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-900">
                    Email (demo)
                  </p>
                  <p className="mt-1 text-sm text-gray-600 leading-relaxed">
                    contact@medinear.app
                  </p>
                  <p className="mt-2 text-xs text-gray-400">
                    Replace with your real email later.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-100 rounded-2xl p-5">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 border border-teal-100 flex items-center justify-center flex-shrink-0">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path
                      d="M8 14s5-3.5 5-8A5 5 0 0 0 3 6c0 4.5 5 8 5 8z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle cx="8" cy="6" r="1.5" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-900">Location</p>
                  <p className="mt-1 text-sm text-gray-600 leading-relaxed">
                    Rajshahi • Dhaka (demo coverage)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-8">
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Send a message
                  </p>
                  <p className="mt-1 text-sm text-gray-600">
                    We’ll reply as soon as possible.
                  </p>
                </div>

                {status === "sent" && (
                  <div className="text-xs px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Message sent (demo)
                  </div>
                )}
                {status === "sending" && (
                  <div className="text-xs px-3 py-1.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200">
                    Sending…
                  </div>
                )}
              </div>

              <form onSubmit={onSubmit} className="mt-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="text-xs font-medium text-gray-600">
                      Your name
                    </label>
                    <input
                      value={form.name}
                      onChange={onChange("name")}
                      onBlur={() => setTouched((p) => ({ ...p, name: true }))}
                      placeholder="e.g. Sinan"
                      className="mt-2 w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 transition"
                    />
                    {touched.name && !nameOk && (
                      <p className="mt-1 text-xs text-rose-500">
                        Please enter at least 2 characters.
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="text-xs font-medium text-gray-600">
                      Email
                    </label>
                    <input
                      value={form.email}
                      onChange={onChange("email")}
                      onBlur={() => setTouched((p) => ({ ...p, email: true }))}
                      placeholder="you@example.com"
                      className="mt-2 w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 transition"
                    />
                    {touched.email && !emailOk && (
                      <p className="mt-1 text-xs text-rose-500">
                        Please enter a valid email.
                      </p>
                    )}
                  </div>
                </div>

                {/* Topic */}
                <div>
                  <label className="text-xs font-medium text-gray-600">
                    Topic
                  </label>
                  <select
                    value={form.topic}
                    onChange={onChange("topic")}
                    className="mt-2 w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 transition bg-white"
                  >
                    <option>General</option>
                    <option>Bug report</option>
                    <option>Feature request</option>
                    <option>Provider listing</option>
                    <option>Partnership</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="text-xs font-medium text-gray-600">
                    Message
                  </label>
                  <textarea
                    rows={6}
                    value={form.message}
                    onChange={onChange("message")}
                    onBlur={() => setTouched((p) => ({ ...p, message: true }))}
                    placeholder="Write your message…"
                    className="mt-2 w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 transition resize-y"
                  />
                  {touched.message && !messageOk && (
                    <p className="mt-1 text-xs text-rose-500">
                      Please write at least 10 characters.
                    </p>
                  )}
                </div>

                {/* Submit */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-2">
                  <p className="text-xs text-gray-400">
                    This form is demo-only right now (no backend connected).
                  </p>

                  <button
                    type="submit"
                    disabled={!canSubmit}
                    className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      canSubmit
                        ? "bg-teal-600 text-white hover:bg-teal-700 active:scale-95"
                        : "bg-gray-100 text-gray-300 cursor-not-allowed"
                    }`}
                  >
                    Send message
                  </button>
                </div>
              </form>
            </div>

            <div className="mt-6 text-center text-xs text-gray-400">
              © 2026 MediNear. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
