import { useState } from "react";

// ─── Constants ────────────────────────────────────────────────────────────────

const PROVIDER_TYPES = [
  {
    id: "hospital",
    label: "Hospital",
    sub: "Full-service inpatient & outpatient facility",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <rect x="3" y="6" width="18" height="15" rx="1.5" />
        <path d="M8 21V12h3.5v9M12.5 21V12H16v9" />
        <path d="M8 6V3h8v3" />
        <path d="M12 9v4M10 11h4" />
      </svg>
    ),
  },
  {
    id: "diagnostic",
    label: "Diagnostic center",
    sub: "Lab tests, imaging & pathology services",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M9 3v8L5 18h14l-4-7V3" />
        <path d="M9 3h6" />
        <path d="M9 13h6" />
      </svg>
    ),
  },
  {
    id: "clinic",
    label: "Clinic / chamber",
    sub: "Outpatient consultations & minor procedures",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <rect x="3" y="4" width="18" height="17" rx="1.5" />
        <path d="M12 9v6M9 12h6" />
        <path d="M8 4V2M16 4V2" />
      </svg>
    ),
  },
  {
    id: "pharmacy",
    label: "Pharmacy",
    sub: "Medicines, OTC products & dispensing",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <rect x="4" y="3" width="16" height="18" rx="1.5" />
        <path d="M9 8h6M9 12h6M9 16h4" />
      </svg>
    ),
  },
];

const SERVICE_OPTIONS = [
  "Blood test", "X-ray", "MRI / CT scan", "Ultrasound",
  "ECG", "Pathology", "Endoscopy", "Vaccination",
  "Surgery", "Physiotherapy", "Dental", "Eye care",
  "Cardiology", "Neurology", "Dermatology", "Pediatrics",
];

const DIVISIONS = [
  "Dhaka", "Chittagong", "Rajshahi", "Khulna",
  "Sylhet", "Barisal", "Rangpur", "Mymensingh",
];

const STEPS = [
  { id: 1, label: "Provider type" },
  { id: 2, label: "Basic info" },
  { id: 3, label: "Services" },
  { id: 4, label: "Documents" },
  { id: 5, label: "Account" },
];

// ─── Shared UI ────────────────────────────────────────────────────────────────

function Toggle({ checked, onChange }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative w-9 h-5 rounded-full transition-colors duration-200 flex-shrink-0 ${
        checked ? "bg-teal-500" : "bg-gray-200"
      }`}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${
          checked ? "translate-x-4" : "translate-x-0"
        }`}
      />
    </button>
  );
}

function Field({ label, required, hint, error, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium text-gray-500">
        {label}
        {required && <span className="text-red-400 ml-0.5">*</span>}
        {hint && (
          <span className="ml-1.5 font-normal text-gray-300">{hint}</span>
        )}
      </label>
      {children}
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}

function TextInput({ ...props }) {
  return (
    <input
      {...props}
      className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm text-gray-800 placeholder-gray-300 outline-none transition focus:border-teal-400 focus:ring-2 focus:ring-teal-100 bg-white"
    />
  );
}

function SelectInput({ children, ...props }) {
  return (
    <select
      {...props}
      className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm text-gray-700 outline-none transition focus:border-teal-400 focus:ring-2 focus:ring-teal-100 bg-white"
    >
      {children}
    </select>
  );
}

function TextArea({ ...props }) {
  return (
    <textarea
      {...props}
      className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm text-gray-800 placeholder-gray-300 outline-none transition focus:border-teal-400 focus:ring-2 focus:ring-teal-100 bg-white resize-none"
    />
  );
}

function UploadBox({ label, hint, accepted }) {
  const [fileName, setFileName] = useState(null);
  return (
    <div
      className={`relative border-2 border-dashed rounded-xl p-5 text-center transition cursor-pointer group
        ${fileName ? "border-teal-300 bg-teal-50" : "border-gray-200 hover:border-teal-300 hover:bg-teal-50/40"}`}
    >
      <input
        type="file"
        accept={accepted}
        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
        onChange={(e) => setFileName(e.target.files?.[0]?.name || null)}
      />
      {fileName ? (
        <>
          <div className="w-8 h-8 rounded-lg bg-teal-100 flex items-center justify-center mx-auto mb-2">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#0F6E56" strokeWidth="1.5" strokeLinecap="round">
              <path d="M3 8l3.5 3.5L13 4" />
            </svg>
          </div>
          <p className="text-xs font-medium text-teal-700 truncate">{fileName}</p>
          <p className="text-xs text-teal-500 mt-0.5">Click to replace</p>
        </>
      ) : (
        <>
          <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center mx-auto mb-2 group-hover:bg-teal-100 transition">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round">
              <path d="M8 10V3M5 6l3-3 3 3" />
              <path d="M3 13h10" />
            </svg>
          </div>
          <p className="text-xs font-medium text-gray-500">{label}</p>
          <p className="text-xs text-gray-300 mt-0.5">{hint}</p>
        </>
      )}
    </div>
  );
}

function NavBtn({ onClick, children, variant = "primary" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all active:scale-95 ${
        variant === "primary"
          ? "bg-teal-600 text-white hover:bg-teal-700"
          : "border border-gray-200 text-gray-500 hover:bg-gray-50"
      }`}
    >
      {children}
    </button>
  );
}

// ─── Steps ────────────────────────────────────────────────────────────────────

function Step1({ data, setData, onNext }) {
  return (
    <div>
      <h2 className="text-base font-medium text-gray-900 mb-1">
        What type of provider are you?
      </h2>
      <p className="text-sm text-gray-400 mb-6">
        This determines which features and fields are available on your profile.
      </p>

      <div className="grid grid-cols-2 gap-3 mb-8">
        {PROVIDER_TYPES.map((type) => (
          <button
            key={type.id}
            type="button"
            onClick={() => setData((p) => ({ ...p, providerType: type.id }))}
            className={`flex items-start gap-3 p-4 rounded-2xl border-2 text-left transition-all ${
              data.providerType === type.id
                ? "border-teal-500 bg-teal-50"
                : "border-gray-100 hover:border-teal-200 hover:bg-gray-50"
            }`}
          >
            <span
              className={`flex-shrink-0 mt-0.5 ${
                data.providerType === type.id ? "text-teal-600" : "text-gray-400"
              }`}
            >
              {type.icon}
            </span>
            <div>
              <p
                className={`text-sm font-medium ${
                  data.providerType === type.id ? "text-teal-800" : "text-gray-700"
                }`}
              >
                {type.label}
              </p>
              <p className="text-xs text-gray-400 mt-0.5 leading-snug">{type.sub}</p>
            </div>
            {data.providerType === type.id && (
              <span className="ml-auto flex-shrink-0 w-5 h-5 rounded-full bg-teal-500 flex items-center justify-center">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                  <path d="M2 5l2 2.5L8 3" />
                </svg>
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="flex justify-end">
        <NavBtn onClick={onNext} disabled={!data.providerType}>
          Continue →
        </NavBtn>
      </div>
    </div>
  );
}

function Step2({ data, setData, onNext, onBack }) {
  const update = (key) => (e) =>
    setData((p) => ({ ...p, [key]: e.target.value }));

  return (
    <div>
      <h2 className="text-base font-medium text-gray-900 mb-1">Basic information</h2>
      <p className="text-sm text-gray-400 mb-6">
        This appears on your public MediNear profile.
      </p>

      <div className="flex flex-col gap-4">
        <Field label="Facility name" required>
          <TextInput
            placeholder="e.g. Popular Diagnostic Centre"
            value={data.name || ""}
            onChange={update("name")}
          />
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Registration / license no." required>
            <TextInput
              placeholder="e.g. DGDA-2021-XXXXX"
              value={data.regNo || ""}
              onChange={update("regNo")}
            />
          </Field>
          <Field label="Year established">
            <TextInput
              type="number"
              placeholder="e.g. 2010"
              value={data.yearEst || ""}
              onChange={update("yearEst")}
            />
          </Field>
        </div>

        <Field label="About / description" hint="(optional)">
          <TextArea
            rows={3}
            placeholder="Briefly describe your facility, specialties, and what makes you stand out…"
            value={data.about || ""}
            onChange={update("about")}
          />
        </Field>

        <div className="border-t border-gray-100 pt-4">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">
            Location
          </p>
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <Field label="Division" required>
                <SelectInput value={data.division || ""} onChange={update("division")}>
                  <option value="">Select division</option>
                  {DIVISIONS.map((d) => (
                    <option key={d}>{d}</option>
                  ))}
                </SelectInput>
              </Field>
              <Field label="City / upazila" required>
                <TextInput
                  placeholder="e.g. Rajshahi Sadar"
                  value={data.city || ""}
                  onChange={update("city")}
                />
              </Field>
            </div>
            <Field label="Full address" required>
              <TextInput
                placeholder="Street, area, landmark…"
                value={data.address || ""}
                onChange={update("address")}
              />
            </Field>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-4">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">
            Contact
          </p>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Phone number" required>
              <TextInput
                type="tel"
                placeholder="+880 1XXX-XXXXXX"
                value={data.phone || ""}
                onChange={update("phone")}
              />
            </Field>
            <Field label="Email address" required>
              <TextInput
                type="email"
                placeholder="info@yourhospital.com"
                value={data.email || ""}
                onChange={update("email")}
              />
            </Field>
            <Field label="Website" hint="(optional)">
              <TextInput
                type="url"
                placeholder="https://yourhospital.com"
                value={data.website || ""}
                onChange={update("website")}
              />
            </Field>
            <Field label="Google Maps link" hint="(optional)">
              <TextInput
                type="url"
                placeholder="https://maps.google.com/…"
                value={data.mapsLink || ""}
                onChange={update("mapsLink")}
              />
            </Field>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-4">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">
            Operating hours
          </p>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Opening time">
              <TextInput
                type="time"
                value={data.openTime || "08:00"}
                onChange={update("openTime")}
              />
            </Field>
            <Field label="Closing time">
              <TextInput
                type="time"
                value={data.closeTime || "20:00"}
                onChange={update("closeTime")}
              />
            </Field>
          </div>
          <div className="flex items-center justify-between mt-3">
            <span className="text-xs text-gray-500">Open on Fridays</span>
            <Toggle
              checked={data.openFriday ?? false}
              onChange={(v) => setData((p) => ({ ...p, openFriday: v }))}
            />
          </div>
          <div className="flex items-center justify-between mt-3">
            <span className="text-xs text-gray-500">Open 24 hours / emergency</span>
            <Toggle
              checked={data.open24h ?? false}
              onChange={(v) => setData((p) => ({ ...p, open24h: v }))}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <NavBtn variant="outline" onClick={onBack}>← Back</NavBtn>
        <NavBtn onClick={onNext}>Continue →</NavBtn>
      </div>
    </div>
  );
}

function Step3({ data, setData, onNext, onBack }) {
  const toggleService = (s) =>
    setData((p) => ({
      ...p,
      services: p.services?.includes(s)
        ? p.services.filter((x) => x !== s)
        : [...(p.services || []), s],
    }));

  const selected = data.services || [];

  return (
    <div>
      <h2 className="text-base font-medium text-gray-900 mb-1">
        Services offered
      </h2>
      <p className="text-sm text-gray-400 mb-6">
        Select all services your facility provides. You can add detailed pricing later from your admin panel.
      </p>

      <div className="grid grid-cols-2 gap-2 mb-6">
        {SERVICE_OPTIONS.map((s) => {
          const active = selected.includes(s);
          return (
            <button
              key={s}
              type="button"
              onClick={() => toggleService(s)}
              className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-sm text-left transition-all ${
                active
                  ? "border-teal-400 bg-teal-50 text-teal-800 font-medium"
                  : "border-gray-100 text-gray-500 hover:border-teal-200 hover:bg-gray-50"
              }`}
            >
              <span
                className={`w-4 h-4 rounded flex items-center justify-center flex-shrink-0 border transition-all ${
                  active
                    ? "bg-teal-500 border-teal-500"
                    : "border-gray-300"
                }`}
              >
                {active && (
                  <svg width="9" height="9" viewBox="0 0 10 10" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                    <path d="M2 5l2 2.5L8 3" />
                  </svg>
                )}
              </span>
              {s}
            </button>
          );
        })}
      </div>

      {selected.length > 0 && (
        <div className="bg-teal-50 border border-teal-100 rounded-xl p-3 mb-6">
          <p className="text-xs text-teal-600 font-medium mb-2">
            {selected.length} service{selected.length > 1 ? "s" : ""} selected
          </p>
          <div className="flex flex-wrap gap-1.5">
            {selected.map((s) => (
              <span
                key={s}
                className="text-xs bg-white border border-teal-200 text-teal-700 px-2 py-1 rounded-lg flex items-center gap-1"
              >
                {s}
                <button
                  type="button"
                  onClick={() => toggleService(s)}
                  className="text-teal-400 hover:text-teal-700 transition"
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      <Field label="Additional services" hint="(optional)">
        <TextInput placeholder="List any services not shown above, comma-separated" />
      </Field>

      <div className="flex justify-between mt-8">
        <NavBtn variant="outline" onClick={onBack}>← Back</NavBtn>
        <NavBtn onClick={onNext}>Continue →</NavBtn>
      </div>
    </div>
  );
}

function Step4({ onNext, onBack }) {
  return (
    <div>
      <h2 className="text-base font-medium text-gray-900 mb-1">
        Verification documents
      </h2>
      <p className="text-sm text-gray-400 mb-2">
        Upload official documents so our team can verify your facility. All files are encrypted and stored securely.
      </p>
      <div className="flex items-center gap-2 bg-amber-50 border border-amber-100 rounded-xl px-3 py-2.5 mb-6">
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="#B45309" strokeWidth="1.5" strokeLinecap="round" className="flex-shrink-0">
          <circle cx="8" cy="8" r="6" />
          <path d="M8 5v3.5M8 11v.5" />
        </svg>
        <p className="text-xs text-amber-700">
          Verification usually takes 1–2 business days. You'll be notified via email.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <Field label="Trade license / registration certificate" required>
          <UploadBox
            label="Upload trade license"
            hint="PDF or image · max 5 MB"
            accepted=".pdf,.jpg,.jpeg,.png"
          />
        </Field>

        <Field label="DGDA / health authority license" required>
          <UploadBox
            label="Upload DGDA license"
            hint="PDF or image · max 5 MB"
            accepted=".pdf,.jpg,.jpeg,.png"
          />
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Facility photo" hint="(optional)">
            <UploadBox
              label="Upload exterior photo"
              hint="JPG or PNG · max 5 MB"
              accepted=".jpg,.jpeg,.png"
            />
          </Field>
          <Field label="Signboard / logo" hint="(optional)">
            <UploadBox
              label="Upload logo or signboard"
              hint="JPG or PNG · max 2 MB"
              accepted=".jpg,.jpeg,.png"
            />
          </Field>
        </div>

        <Field label="NID of authorized representative" required>
          <UploadBox
            label="Upload NID (front)"
            hint="JPG or PNG · max 3 MB"
            accepted=".jpg,.jpeg,.png"
          />
        </Field>
      </div>

      <div className="flex justify-between mt-8">
        <NavBtn variant="outline" onClick={onBack}>← Back</NavBtn>
        <NavBtn onClick={onNext}>Continue →</NavBtn>
      </div>
    </div>
  );
}

function Step5({ data, setData, onSubmit, onBack }) {
  const update = (key) => (e) =>
    setData((p) => ({ ...p, [key]: e.target.value }));

  return (
    <div>
      <h2 className="text-base font-medium text-gray-900 mb-1">
        Create your admin account
      </h2>
      <p className="text-sm text-gray-400 mb-6">
        This account will be used to manage your MediNear provider profile.
      </p>

      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4">
          <Field label="Contact person name" required>
            <TextInput
              placeholder="Full name"
              value={data.contactName || ""}
              onChange={update("contactName")}
            />
          </Field>
          <Field label="Designation">
            <TextInput
              placeholder="e.g. Manager, Director"
              value={data.designation || ""}
              onChange={update("designation")}
            />
          </Field>
        </div>

        <Field label="Admin email" required>
          <TextInput
            type="email"
            placeholder="admin@yourhospital.com"
            value={data.adminEmail || ""}
            onChange={update("adminEmail")}
          />
        </Field>

        <Field label="Password" required>
          <TextInput
            type="password"
            placeholder="Minimum 8 characters"
            value={data.password || ""}
            onChange={update("password")}
          />
        </Field>

        <Field label="Confirm password" required>
          <TextInput
            type="password"
            placeholder="Re-enter your password"
            value={data.confirmPassword || ""}
            onChange={update("confirmPassword")}
          />
        </Field>

        <div className="border-t border-gray-100 pt-4 flex flex-col gap-3">
          <label className="flex items-start gap-3 cursor-pointer">
            <input type="checkbox" className="mt-0.5 accent-teal-500 w-4 h-4 flex-shrink-0" />
            <span className="text-xs text-gray-500 leading-relaxed">
              I confirm that all submitted information is accurate and that I am authorised to register this facility on MediNear.
            </span>
          </label>
          <label className="flex items-start gap-3 cursor-pointer">
            <input type="checkbox" className="mt-0.5 accent-teal-500 w-4 h-4 flex-shrink-0" defaultChecked />
            <span className="text-xs text-gray-500 leading-relaxed">
              I agree to MediNear's{" "}
              <a href="/terms" className="text-teal-600 underline decoration-teal-200">
                Provider Terms of Service
              </a>{" "}
              and{" "}
              <a href="/privacy" className="text-teal-600 underline decoration-teal-200">
                Privacy Policy
              </a>.
            </span>
          </label>
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <NavBtn variant="outline" onClick={onBack}>← Back</NavBtn>
        <button
          type="button"
          onClick={onSubmit}
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-teal-600 text-white text-sm font-medium hover:bg-teal-700 active:scale-95 transition-all"
        >
          Submit for review
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round">
            <path d="M3 8h10M9 4l4 4-4 4" />
          </svg>
        </button>
      </div>
    </div>
  );
}

function SuccessScreen() {
  return (
    <div className="text-center py-8">
      <div className="w-16 h-16 rounded-full bg-teal-50 border-2 border-teal-400 flex items-center justify-center mx-auto mb-5">
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="#1D9E75" strokeWidth="2" strokeLinecap="round">
          <path d="M5 14l6 6L23 7" />
        </svg>
      </div>
      <h2 className="text-xl font-medium text-gray-900 mb-2">
        Application submitted!
      </h2>
      <p className="text-sm text-gray-400 max-w-sm mx-auto mb-6 leading-relaxed">
        Our verification team will review your documents and get back to you within 1–2 business days.
      </p>

      <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 text-left max-w-sm mx-auto mb-6">
        <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">
          What happens next?
        </p>
        {[
          { step: "1", text: "Documents reviewed by our team" },
          { step: "2", text: "Verification email sent within 2 days" },
          { step: "3", text: "Profile goes live on MediNear" },
          { step: "4", text: "You can log in and manage your services" },
        ].map(({ step, text }) => (
          <div key={step} className="flex items-center gap-3 py-2 border-b border-gray-100 last:border-0">
            <span className="w-5 h-5 rounded-full bg-teal-100 text-teal-700 text-xs font-medium flex items-center justify-center flex-shrink-0">
              {step}
            </span>
            <span className="text-sm text-gray-500">{text}</span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-3">
        <a
          href="/"
          className="px-5 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-500 hover:bg-gray-50 transition"
        >
          Back to home
        </a>
        <a
          href="/admin"
          className="px-5 py-2.5 rounded-xl bg-teal-600 text-white text-sm font-medium hover:bg-teal-700 transition"
        >
          Go to admin panel →
        </a>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function JoinAsProviderPage() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [data, setData] = useState({});

  const next = () => setStep((s) => Math.min(s + 1, 5));
  const back = () => setStep((s) => Math.max(s - 1, 1));

  const providerLabel =
    PROVIDER_TYPES.find((t) => t.id === data.providerType)?.label || "Provider";

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── Top bar ── */}
      <div className="bg-white border-b border-gray-100 px-6 py-3 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-teal-500" />
          <span className="text-sm font-medium text-gray-900">MediNear</span>
        </a>
        <span className="text-xs text-gray-400">
          Already have an account?{" "}
          <a href="/login" className="text-teal-600 hover:underline">
            Log in
          </a>
        </span>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-10">

        {!submitted ? (
          <>
            {/* ── Page heading ── */}
            <div className="text-center mb-8">
              <span className="inline-flex items-center gap-1.5 text-xs text-teal-700 bg-teal-50 border border-teal-200 rounded-full px-3 py-1 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                Free to join · No commission
              </span>
              <h1 className="text-2xl font-medium text-gray-900 mb-2">
                Join MediNear as a provider
              </h1>
              <p className="text-sm text-gray-400">
                Reach thousands of patients in Rajshahi looking for{" "}
                {step > 1 ? providerLabel.toLowerCase() : "medical"} services near them.
              </p>
            </div>

            {/* ── Progress bar ── */}
            <div className="flex items-center gap-0 mb-8">
              {STEPS.map((s, i) => (
                <div key={s.id} className="flex items-center flex-1 last:flex-none">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all ${
                        step > s.id
                          ? "bg-teal-500 text-white"
                          : step === s.id
                          ? "bg-teal-600 text-white ring-4 ring-teal-100"
                          : "bg-white border border-gray-200 text-gray-400"
                      }`}
                    >
                      {step > s.id ? (
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                          <path d="M2 6l3 3L10 3" />
                        </svg>
                      ) : (
                        s.id
                      )}
                    </div>
                    <span
                      className={`text-xs mt-1 hidden sm:block ${
                        step === s.id
                          ? "text-teal-600 font-medium"
                          : step > s.id
                          ? "text-teal-400"
                          : "text-gray-300"
                      }`}
                    >
                      {s.label}
                    </span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div
                      className={`flex-1 h-0.5 mx-2 mb-4 transition-colors ${
                        step > s.id ? "bg-teal-400" : "bg-gray-100"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* ── Form card ── */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 sm:p-8">
              {step === 1 && (
                <Step1 data={data} setData={setData} onNext={next} />
              )}
              {step === 2 && (
                <Step2 data={data} setData={setData} onNext={next} onBack={back} />
              )}
              {step === 3 && (
                <Step3 data={data} setData={setData} onNext={next} onBack={back} />
              )}
              {step === 4 && <Step4 onNext={next} onBack={back} />}
              {step === 5 && (
                <Step5
                  data={data}
                  setData={setData}
                  onBack={back}
                  onSubmit={() => setSubmitted(true)}
                />
              )}
            </div>

            {/* ── Trust strip ── */}
            <div className="mt-8 grid grid-cols-3 gap-4">
              {[
                { icon: "🔒", label: "Secure & encrypted", sub: "All data is stored securely" },
                { icon: "✓", label: "Free to list", sub: "No setup fee or commission" },
                { icon: "★", label: "120+ providers", sub: "Already on MediNear" },
              ].map(({ icon, label, sub }) => (
                <div
                  key={label}
                  className="bg-white border border-gray-100 rounded-xl p-3 text-center"
                >
                  <p className="text-base mb-1">{icon}</p>
                  <p className="text-xs font-medium text-gray-700">{label}</p>
                  <p className="text-xs text-gray-400">{sub}</p>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="bg-white border border-gray-100 rounded-2xl p-8">
            <SuccessScreen />
          </div>
        )}
      </div>
    </div>
  );
}