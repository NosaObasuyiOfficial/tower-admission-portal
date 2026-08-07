/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import {
  ChevronLeft,
  ChevronRight,
  Check,
  Upload,
  FileText,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Pencil,
  Type,
  RotateCcw,
  Trash2,
  ChevronDown,
  Phone,
  Mail,
  MapPin,
  GraduationCap,
  Users,
  HeartPulse,
  Sprout,
  FolderCheck,
  FileSignature,
  ClipboardCheck,
  ShieldCheck,
  Printer,
  CalendarDaysIcon,
  User2Icon,
  MoveRightIcon,
  //   School,
} from "lucide-react";
import { usePaystack } from "./usePayStack";
import { apiClient } from "../service/apiClient";
import {
  UPLOAD_SPECS,
  ACCEPTED_TYPES,
  MAX_FILE_MB,
  ACADEMIC_YEARS,
  GRADE_OPTIONS,
  CITIES,
  US_STATES,
  RELATION_OPTIONS,
  initialFormData,
} from "../utilities/constants";
import useAppNavigate from "./useAppNavigate";

/* =============================================================================
   DESIGN TOKENS
   Deep academic navy + burnished brass, on a warm parchment field.
   Display serif (Fraunces) for gravitas, Inter for the working UI.
   ============================================================================= */

export const Tokens = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
 
    .tpa-root {
      --navy: #363737;
      --navy-deep: #0E1730;
      --navy-soft: #82868a;
      --brass: #3E424D;
      --brass-light: #3E424D;
      --brass-pale: #B6B9C0;
      --parchment: #FAF8F3;
      --paper: #FFFFFF;
      --ink: #24262B;
      --slate: #6B7280;
      --slate-light: #9CA3AF;
      --border: #E6E1D6;
      --border-soft: #F0ECE2;
      --success: #2F6F4E;
      --success-bg: #EAF3EC;
      --error: #B4443C;
      --error-bg: #FBEEEC;
      font-family: 'Poppins', sans-serif;
      color: var(--ink);
      background: var(--parchment);
    }
    .tpa-root * { box-sizing: border-box; }
    .tpa-serif { font-family: 'Poppins', sans-serif; font-weight: 600; letter-spacing: -0.01em; font-size: 18px; }
    .tpa-scroll::-webkit-scrollbar { width: 6px; }
    .tpa-scroll::-webkit-scrollbar-thumb { background: var(--border); border-radius: 10px; }
 
    .tpa-card {
      background: var(--paper);
      border: 1px solid var(--border-soft);
      border-radius: 20px;
      box-shadow: 0 1px 2px rgba(22,33,62,0.04), 0 12px 32px -16px rgba(22,33,62,0.12);
    }

    @media (max-width: 425px) {
      .tpa-serif {
       font-size: 25px;
      }
    }

    .tpa-input {
      width: 100%;
      background: var(--paper);
      border: 1.5px solid var(--border);
      border-radius: 12px;
      padding: 15px 14px 9px 14px;
      font-size: 14.5px;
      color: var(--ink);
      transition: border-color 160ms ease, box-shadow 160ms ease;
      outline: none;
    }
    .tpa-input:focus { border-color: var(--brass); box-shadow: 0 0 0 4px var(--slate-light); }
    .tpa-input.tpa-input-error { border-color: var(--error); }
    .tpa-input.tpa-input-error:focus { box-shadow: 0 0 0 4px rgba(180,68,60,0.12); }
    .tpa-input:disabled { background: #F5F4F0; color: var(--slate-light); cursor: not-allowed; }
 
    .tpa-field { position: relative; }
    .tpa-label-float {
      position: absolute;
      left: 14px;
      top: 12px;
      font-size: 14.5px;
      color: var(--slate);
      pointer-events: none;
      transition: all 140ms ease;
      background: transparent;
    }
    .tpa-field.tpa-filled .tpa-label-float,
    .tpa-field.tpa-focused .tpa-label-float {
      top: 6px;
      font-size: 10.5px;
      font-weight: 600;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      color: var(--brass);
    }
    .tpa-field.tpa-filled.tpa-error .tpa-label-float,
    .tpa-field.tpa-focused.tpa-error .tpa-label-float { color: var(--error); }
 
.tpa-btn-portal {
  position: relative;
  color: var(--navy);
  border-radius: 0px;
  font-weight: 600;
  font-size: 14.5px;
  padding: 12px 22px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: none;
  background: transparent;
  cursor: pointer;
  overflow: hidden;
  isolation: isolate; /* keeps the sweep contained to this button's stacking context */
  transition: color 240ms cubic-bezier(.22,.68,0,1), box-shadow 240ms ease;
}

/* the sweeping fill */
.tpa-btn-portal::before {
  content: "";
  position: absolute;
  inset: 0;
  background: var(--navy);
  border-radius: inherit;
  transform: scaleX(0);
  transform-origin: left;
  z-index: -1;
  transition: transform 340ms cubic-bezier(.22,.68,0,1);
}

.tpa-btn-portal:hover:not(:disabled)::before {
  transform: scaleX(1);
}

.tpa-btn-portal:hover:not(:disabled) {
  color: #fff;
  box-shadow: 0 8px 20px -8px rgba(22,33,62,0.35);
}

/* icon nudges forward on hover, independent of the text */
.tpa-btn-portal svg {
  transition: transform 300ms cubic-bezier(.34,1.3,.64,1);
}
.tpa-btn-portal:hover:not(:disabled) svg {
  transform: translateX(4px);
}

.tpa-btn-portal:active:not(:disabled) {
  transform: scale(0.98);
}

    .tpa-btn-primary {
      background: var(--navy);
      color: #fff;
      border-radius: 12px;
      font-weight: 600;
      font-size: 14.5px;
      padding: 12px 22px;
      transition: background 160ms ease, transform 120ms ease;
      display: inline-flex; align-items: center; gap: 8px;
      border: none; cursor: pointer;
    }
    .tpa-btn-primary:hover:not(:disabled) { background: var(--navy-soft); }
    .tpa-btn-primary:active:not(:disabled) { transform: scale(0.98); }
    .tpa-btn-primary:disabled { opacity: 0.45; cursor: not-allowed; }
 
    .tpa-btn-ghost {
      background: transparent;
      color: var(--navy);
      border-radius: 12px;
      font-weight: 600;
      font-size: 14.5px;
      padding: 12px 18px;
      border: 1.5px solid var(--border);
      display: inline-flex; align-items: center; gap: 8px;
      cursor: pointer;
      transition: border-color 140ms ease, background 140ms ease;
    }
    .tpa-btn-ghost:hover:not(:disabled) { border-color: var(--brass); background: var(--brass-pale); }
    .tpa-btn-ghost:disabled { opacity: 0.4; cursor: not-allowed; }
 
    .tpa-chip {
      border: 1.5px solid var(--border);
      border-radius: 14px;
      padding: 14px 16px;
      cursor: pointer;
      transition: border-color 140ms ease, background 140ms ease, transform 100ms ease;
      background: var(--paper);
    }
    .tpa-chip:hover { border-color: var(--brass-light); transform: translateY(-1px); }
    .tpa-chip.tpa-chip-active {
      border-color: var(--brass);
      background: var(--brass-pale);
    }
 
    .tpa-step-line {
      stroke: var(--border);
      stroke-width: 2;
    }
    .tpa-step-line-done { stroke: var(--brass); }
 
    .tpa-anim-enter { animation: tpaFade 340ms cubic-bezier(.22,.68,0,1); }
    @keyframes tpaFade {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .tpa-anim-pop { animation: tpaPop 260ms cubic-bezier(.34,1.56,.64,1); }
    @keyframes tpaPop {
      from { opacity: 0; transform: scale(0.85); }
      to { opacity: 1; transform: scale(1); }
    }
    .tpa-toast-enter { animation: tpaToast 320ms cubic-bezier(.22,.68,0,1); }
    @keyframes tpaToast {
      from { opacity: 0; transform: translateY(12px) scale(0.96); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }
    .tpa-shimmer {
      background: linear-gradient(90deg, var(--border-soft) 25%, var(--brass-pale) 50%, var(--border-soft) 75%);
      background-size: 200% 100%;
      animation: tpaShimmer 1.4s infinite;
    }
    @keyframes tpaShimmer { from { background-position: 200% 0; } to { background-position: -200% 0; } }
 
    .tpa-seal {
      width: 34px; height: 34px; border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      font-size: 13px; font-weight: 700;
      border: 2px solid var(--border);
      background: var(--paper);
      color: var(--slate);
      transition: all 220ms ease;
      flex-shrink: 0;
    }
    .tpa-seal-active { border-color: var(--brass); color: var(--brass); box-shadow: 0 0 0 5px var(--slate-light); }
    .tpa-seal-done { border-color: var(--brass); background: var(--brass); color: #fff; }
 
    .tpa-upload-zone {
      border: 1.5px dashed var(--border);
      border-radius: 16px;
      transition: border-color 160ms ease, background 160ms ease;
      background: var(--slate-light);
    }
    .tpa-upload-zone.tpa-dragging { border-color: var(--brass); background: var(--brass-pale); }
    .tpa-upload-zone.tpa-upload-error { border-color: var(--error); background: var(--error-bg); }
 
    .tpa-progress-fill { transition: width 220ms ease; }
 
    .tpa-select-panel {
      animation: tpaSelectOpen 140ms ease;
      transform-origin: top;
    }
    @keyframes tpaSelectOpen {
      from { opacity: 0; transform: scaleY(0.92); }
      to { opacity: 1; transform: scaleY(1); }
    }
 
    @media (prefers-reduced-motion: reduce) {
      .tpa-anim-enter, .tpa-anim-pop, .tpa-toast-enter, .tpa-shimmer, .tpa-select-panel { animation: none !important; }
    }
 
    @media print {
      .tpa-no-print { display: none !important; }
      .tpa-root { background: #fff !important; }
    }
  `}</style>
);

/* =============================================================================
   CONSTANTS
   ============================================================================= */
const STEP_DEFS = [
  {
    id: "program",
    title: "Program",
    desc: "Choose the program you're applying for.",
    icon: GraduationCap,
  },
  {
    id: "student",
    title: "Student Information",
    desc: "Tell us about the student.",
    icon: User2Icon,
  },
  {
    id: "guardian",
    title: "Parent / Guardian",
    desc: "Primary contacts for the application.",
    icon: Users,
  },
  {
    id: "medical",
    title: "Medical",
    desc: "Emergency contact and health information.",
    icon: HeartPulse,
  },
  {
    id: "montessori",
    title: "Montessori Questions",
    desc: "A little more about your family's interest.",
    icon: Sprout,
  },
  {
    id: "uploads",
    title: "Documents",
    desc: "Upload the required paperwork.",
    icon: FolderCheck,
  },
  {
    id: "consent",
    title: "Consent & Signature",
    desc: "Review the agreements and sign.",
    icon: FileSignature,
  },
  {
    id: "review",
    title: "Review & Submit",
    desc: "Confirm everything looks right.",
    icon: ClipboardCheck,
  },
];
/* =============================================================================
   VALIDATION ENGINE (Zod-style rules, hand-rolled for this sandbox)
   ============================================================================= */
const isEmail = (v: any) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v || "");
const isPhone = (v: any) => /^\+?[0-9\s()-]{7,20}$/.test(v || "");
const digits = (v: any) => (v || "").replace(/\D/g, "");

function validateProgram(d: any) {
  const e: any = {};
  if (!d.academicYear) e.academicYear = "Select an academic year.";
  if (!d.admissionType) e.admissionType = "Select an admission type.";
  if (!d.track) e.track = "Select a program track.";
  if (!d.grade) e.grade = "Select a target grade or level.";
  return e;
}

function validateStudent(d: any) {
  const e: any = {};
  if (!d.firstName.trim()) e.firstName = "First name is required.";
  if (!d.lastName.trim()) e.lastName = "Last name is required.";
  if (!d.dob) e.dob = "Date of birth is required.";
  else if (new Date(d.dob) > new Date())
    e.dob = "Date of birth can't be in the future.";
  if (!d.gender) e.gender = "Select a gender.";
  //   if (!d.primaryLanguage.trim())
  //     e.primaryLanguage = "Primary language is required.";
  if (!d.address.street.trim())
    e["address.street"] = "Street address is required.";
  if (!d.address.city.trim()) e["address.city"] = "City is required.";
  if (!d.address.state) e["address.state"] = "State is required.";
  if (!d.address.postalCode.trim())
    e["address.postalCode"] = "Postal code is required.";
  else if (!/^\d{4,10}$/.test(d.address.postalCode.trim()))
    e["address.postalCode"] = "Enter a valid postal code.";
  return e;
}

function validateGuardian(d: any) {
  const e: any = {};
  if (!d.guardian1.relation) e["guardian1.relation"] = "Select a relation.";
  if (!d.guardian1.name.trim()) e["guardian1.name"] = "Name is required.";
  if (!isPhone(d.guardian1.phone))
    e["guardian1.phone"] = "Enter a valid phone number.";
  if (!isEmail(d.guardian1.email))
    e["guardian1.email"] = "Enter a valid email address.";
  if (!d.guardian1.occupation.trim())
    e["guardian1.occupation"] = "Occupation is required.";

  const g2NotNone = d.guardian2.relation && d.guardian2.relation !== "None";
  if (g2NotNone) {
    if (!d.guardian2.name.trim()) e["guardian2.name"] = "Name is required.";
    if (d.guardian2.phone && !isPhone(d.guardian2.phone))
      e["guardian2.phone"] = "Enter a valid phone number.";
    if (d.guardian2.email && !isEmail(d.guardian2.email))
      e["guardian2.email"] = "Enter a valid email address.";
  }
  return e;
}

function validateMedical(d: any) {
  const e: any = {};
  if (!d.emergencyRelation.trim())
    e.emergencyRelation = "Relationship is required.";
  if (!isPhone(d.emergencyPhone))
    e.emergencyPhone = "Enter a valid phone number.";
  return e;
}

function validateMontessori(d: any, track: any) {
  if (track !== "montessori") return {};
  const e: any = {};
  if (!d.attendedBefore) e.attendedBefore = "Please answer this question.";
  //   if (!d.interest.trim() || d.interest.trim().length < 10)
  //     e.interest = "Please share a bit more (10+ characters).";
  //   if (!d.strengths.trim() || d.strengths.trim().length < 10)
  //     e.strengths = "Please share a bit more (10+ characters).";
  return e;
}

function validateUploads(d: any, grade: any) {
  const e: any = {};
  UPLOAD_SPECS.forEach((spec) => {
    const requiredNow =
      spec.required ||
      (spec.key === "academicRecords" && grade === "upper-elementary");
    if (requiredNow && !d[spec.key]) e[spec.key] = `${spec.label} is required.`;
  });
  return e;
}

function validateConsent(d: any) {
  const e: any = {};
  if (!d.tuitionAgreement)
    e.tuitionAgreement = "You must agree to the tuition agreement to continue.";
  if (!d.mediaRelease) e.mediaRelease = "Please choose a media release option.";
  const hasSignature =
    d.signatureMode === "draw"
      ? !!d.signatureDataUrl
      : d.signatureTypedName.trim().length > 1;
  if (!hasSignature)
    e.signature =
      d.signatureMode === "draw"
        ? "Please draw your signature."
        : "Please type your full name.";
  return e;
}

const VALIDATORS: any = {
  program: (fd: any) => validateProgram(fd.program),
  student: (fd: any) => validateStudent(fd.student),
  guardian: (fd: any) => validateGuardian(fd),
  medical: (fd: any) => validateMedical(fd.medical),
  montessori: (fd: any) => validateMontessori(fd.montessori, fd.program.track),
  uploads: (fd: any) => validateUploads(fd.uploads, fd.program.grade),
  consent: (fd: any) => validateConsent(fd.consent),
  review: () => ({}),
};

/* =============================================================================
   SMALL UTILITIES
   ============================================================================= */
function setPath(obj: any, path: any, value: any) {
  const keys = path.split(".");
  const clone = Array.isArray(obj) ? [...obj] : { ...obj };
  let cur = clone;
  for (let i = 0; i < keys.length - 1; i++) {
    cur[keys[i]] = Array.isArray(cur[keys[i]])
      ? [...cur[keys[i]]]
      : { ...cur[keys[i]] };
    cur = cur[keys[i]];
  }
  cur[keys[keys.length - 1]] = value;
  return clone;
}

// function getPath(obj:any, path:any) {
//   return path.split(".").reduce((acc:any, k:any) => (acc == null ? acc : acc[k]), obj);
// }

function formatPhoneDisplay(v: any) {
  const d = digits(v).slice(0, 11);
  if (d.length <= 3) return d;
  if (d.length <= 7) return `${d.slice(0, 3)}-${d.slice(3)}`;
  return `${d.slice(0, 3)}-${d.slice(3, 7)}-${d.slice(7)}`;
}

function formatBytes(bytes: any) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/* =============================================================================
   FORM FIELD PRIMITIVES
   ============================================================================= */
function FloatField({
  label,
  value,
  onChange,
  onBlur,
  error,
  type = "text",
  placeholder,
  autoComplete,
  id,
  maxLength,
}: any) {
  const [focused, setFocused] = useState(false);
  const filled =
    value !== undefined && value !== null && String(value).length > 0;
  return (
    <div
      className={`tpa-field ${filled ? "tpa-filled" : ""} ${focused ? "tpa-focused" : ""} ${error ? "tpa-error" : ""}`}
    >
      <label className="tpa-label-float" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value ?? ""}
        placeholder={focused ? placeholder : ""}
        maxLength={maxLength}
        autoComplete={autoComplete}
        onFocus={() => setFocused(true)}
        onBlur={(e) => {
          setFocused(false);
          onBlur && onBlur(e);
        }}
        onChange={(e) => onChange(e.target.value)}
        className={`tpa-input ${error ? "tpa-input-error" : ""}`}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-err` : undefined}
      />
      {error && (
        <p
          id={`${id}-err`}
          className="flex items-center gap-1 mt-1.5 text-xs"
          style={{ color: "var(--error)" }}
        >
          <AlertCircle size={13} /> {error}
        </p>
      )}
    </div>
  );
}

function TextAreaField({
  label,
  value,
  onChange,
  onBlur,
  error,
  id,
  rows = 4,
  maxLength = 600,
  hint,
}: any) {
  const [focused, setFocused] = useState(false);
  const filled = (value || "").length > 0;
  return (
    <div
      className={`tpa-field ${filled ? "tpa-filled" : ""} ${focused ? "tpa-focused" : ""} ${error ? "tpa-error" : ""}`}
    >
      <label className="tpa-label-float" htmlFor={id}>
        {label}
      </label>
      <textarea
        id={id}
        rows={rows}
        value={value ?? ""}
        maxLength={maxLength}
        onFocus={() => setFocused(true)}
        onBlur={(e) => {
          setFocused(false);
          onBlur && onBlur(e);
        }}
        onChange={(e) => onChange(e.target.value)}
        className={`tpa-input ${error ? "tpa-input-error" : ""}`}
        style={{ resize: "vertical", paddingTop: 20 }}
        aria-invalid={!!error}
      />
      <div className="flex items-center justify-between mt-1.5">
        <div>
          {error && (
            <p
              className="flex items-center gap-1 text-xs"
              style={{ color: "var(--error)" }}
            >
              <AlertCircle size={13} /> {error}
            </p>
          )}
          {!error && hint && (
            <p className="text-xs" style={{ color: "var(--slate)" }}>
              {hint}
            </p>
          )}
        </div>
        <span className="text-xs" style={{ color: "var(--slate-light)" }}>
          {(value || "").length}/{maxLength}
        </span>
      </div>
    </div>
  );
}

// function SelectField({ label, value, onChange, onBlur, error, options, id, placeholder = "Select\u2026" }:any) {
function SelectField({
  label,
  value,
  onChange,
  onBlur,
  error,
  options,
  id,
}: any) {
  const [open, setOpen] = useState(false);
  const ref: any = useRef(null);
  const selected = options.find((o: any) => o.value === value);

  useEffect(() => {
    function onDoc(e: any) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  return (
    <div
      className={`tpa-field ${selected ? "tpa-filled" : ""} ${open ? "tpa-focused" : ""} ${error ? "tpa-error" : ""}`}
      ref={ref}
    >
      <label className="tpa-label-float">{label}</label>
      <button
        type="button"
        id={id}
        onClick={() => setOpen((o) => !o)}
        onBlur={onBlur}
        className={`tpa-input ${error ? "tpa-input-error" : ""} flex items-center justify-between text-left`}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span style={{ color: selected ? "var(--ink)" : "transparent" }}>
          {selected ? selected.label : "."}
        </span>
        <ChevronDown
          size={16}
          style={{
            color: "var(--slate)",
            transform: open ? "rotate(180deg)" : "none",
            transition: "transform 160ms ease",
          }}
        />
      </button>
      {open && (
        <div
          role="listbox"
          className="tpa-select-panel tpa-card tpa-scroll"
          style={{
            position: "absolute",
            top: "calc(100% + 6px)",
            left: 0,
            right: 0,
            zIndex: 30,
            maxHeight: 260,
            overflowY: "auto",
            padding: 6,
          }}
        >
          {options.map((o: any) => (
            <div
              key={o.value}
              role="option"
              aria-selected={o.value === value}
              onClick={() => {
                onChange(o.value);
                setOpen(false);
              }}
              className="flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer"
              style={{
                background:
                  o.value === value ? "var(--brass-pale)" : "transparent",
              }}
              onMouseDown={(e) => e.preventDefault()}
            >
              <span className="text-sm">{o.label}</span>
              {o.value === value && (
                <Check size={15} style={{ color: "var(--brass)" }} />
              )}
            </div>
          ))}
        </div>
      )}
      {error && (
        <p
          className="flex items-center gap-1 mt-1.5 text-xs"
          style={{ color: "var(--error)" }}
        >
          <AlertCircle size={13} /> {error}
        </p>
      )}
    </div>
  );
}

function PhoneField({ label, value, onChange, onBlur, error, id }: any) {
  const [focused, setFocused] = useState(false);
  const filled = (value || "").length > 0;
  return (
    <div
      className={`tpa-field ${filled ? "tpa-filled" : ""} ${focused ? "tpa-focused" : ""} ${error ? "tpa-error" : ""}`}
    >
      <label className="tpa-label-float" htmlFor={id}>
        {label}
      </label>
      <div className="relative">
        <Phone
          size={15}
          style={{
            position: "absolute",
            left: 14,
            top: 17,
            color: "var(--slate-light)",
          }}
        />
        <input
          id={id}
          type="tel"
          value={value ?? ""}
          onFocus={() => setFocused(true)}
          onBlur={(e) => {
            setFocused(false);
            onBlur && onBlur(e);
          }}
          onChange={(e) => onChange(formatPhoneDisplay(e.target.value))}
          className={`tpa-input ${error ? "tpa-input-error" : ""}`}
          style={{ paddingLeft: 36 }}
          placeholder={focused ? "080-1234-5678" : ""}
          aria-invalid={!!error}
        />
      </div>
      {error && (
        <p
          className="flex items-center gap-1 mt-1.5 text-xs"
          style={{ color: "var(--error)" }}
        >
          <AlertCircle size={13} /> {error}
        </p>
      )}
    </div>
  );
}

function EmailField(props: any) {
  return (
    <div className="relative">
      <FloatField {...props} type="email" />
      <Mail
        size={15}
        style={{
          position: "absolute",
          right: 14,
          top: 17,
          color: "var(--slate-light)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}

/* Custom date picker: text input (typed or via calendar) + small calendar dropdown */
function DateField({
  label,
  value,
  onChange,
  onBlur,
  error,
  id,
  maxDate = new Date(),
}: any) {
  const [open, setOpen] = useState(false);
  const [viewDate, setViewDate] = useState(() =>
    value
      ? new Date(value)
      : new Date(maxDate.getFullYear() - 5, maxDate.getMonth(), 1),
  );
  const ref: any = useRef(null);

  useEffect(() => {
    function onDoc(e: any) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const monthLabel = viewDate.toLocaleDateString("en-NG", {
    month: "long",
    year: "numeric",
  });
  const firstOfMonth = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1);
  const startOffset = firstOfMonth.getDay();
  const daysInMonth = new Date(
    viewDate.getFullYear(),
    viewDate.getMonth() + 1,
    0,
  ).getDate();
  const cells = [
    ...Array(startOffset).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  //   const selectDay = (day: any) => {
  //     const d = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
  //     onChange(d.toISOString().slice(0, 10));
  //     setOpen(false);
  //   };

  const selectDay = (day: number) => {
    const d = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);

    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const date = String(d.getDate()).padStart(2, "0");

    onChange(`${year}-${month}-${date}`);
    setOpen(false);
  };

  const display = value
    ? new Date(value + "T00:00:00").toLocaleDateString("en-NG", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "";

  return (
    <div
      className={`tpa-field ${value ? "tpa-filled" : ""} ${open ? "tpa-focused" : ""} ${error ? "tpa-error" : ""}`}
      ref={ref}
    >
      <label className="tpa-label-float">{label}</label>
      <button
        type="button"
        id={id}
        onClick={() => setOpen((o) => !o)}
        onBlur={onBlur}
        className={`tpa-input ${error ? "tpa-input-error" : ""} flex items-center justify-between text-left`}
      >
        <span style={{ color: value ? "var(--ink)" : "transparent" }}>
          {value ? display : "."}
        </span>
        {/* <span style={{ fontSize: 15 }}>\ud83d\udcc5</span> */}
        <CalendarDaysIcon style={{ color: "var(--slate-light)" }} size={20} />
      </button>
      {open && (
        <div
          className="tpa-select-panel tpa-card"
          style={{
            position: "absolute",
            top: "calc(100% + 6px)",
            left: 0,
            zIndex: 30,
            padding: 14,
            width: 280,
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <button
              type="button"
              className="tpa-btn-ghost"
              style={{ padding: "6px 10px" }}
              onClick={() =>
                setViewDate(
                  new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1),
                )
              }
            >
              <ChevronLeft size={14} />
            </button>
            <span className="text-sm font-semibold">{monthLabel}</span>
            <button
              type="button"
              className="tpa-btn-ghost"
              style={{ padding: "6px 10px" }}
              onClick={() =>
                setViewDate(
                  new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1),
                )
              }
            >
              <ChevronRight size={14} />
            </button>
          </div>
          <div className="grid grid-cols-7 gap-1 mb-1">
            {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
              <div
                key={i}
                className="text-center text-xs font-semibold"
                style={{ color: "var(--slate-light)" }}
              >
                {d}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {cells.map((day, i) => {
              if (!day) return <div key={i} />;
              const cellDate = new Date(
                viewDate.getFullYear(),
                viewDate.getMonth(),
                day,
              );
              const isSelected = value === cellDate.toISOString().slice(0, 10);
              const isFuture = cellDate > maxDate;
              return (
                <button
                  type="button"
                  key={i}
                  disabled={isFuture}
                  onClick={() => selectDay(day)}
                  className="text-xs rounded-md py-1.5"
                  style={{
                    background: isSelected ? "var(--brass)" : "transparent",
                    color: isSelected
                      ? "#fff"
                      : isFuture
                        ? "var(--slate-light)"
                        : "var(--ink)",
                    cursor: isFuture ? "not-allowed" : "pointer",
                  }}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>
      )}
      {error && (
        <p
          className="flex items-center gap-1 mt-1.5 text-xs"
          style={{ color: "var(--error)" }}
        >
          <AlertCircle size={13} /> {error}
        </p>
      )}
    </div>
  );
}

function RadioCardGroup({
  label,
  value,
  onChange,
  options,
  error,
  columns = 2,
}: any) {
  return (
    <div>
      {label && (
        <p
          className="text-sm font-medium mb-2.5"
          style={{ color: "var(--navy)" }}
        >
          {label}
        </p>
      )}
      <div
        className="grid gap-3"
        style={{ gridTemplateColumns: `repeat(${columns}, minmax(0,1fr))` }}
      >
        {options.map((opt: any) => {
          const active = value === opt.value;
          return (
            <div
              key={opt.value}
              role="radio"
              aria-checked={active}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") onChange(opt.value);
              }}
              onClick={() => onChange(opt.value)}
              className={`tpa-chip ${active ? "tpa-chip-active" : ""}`}
            >
              <div className="flex items-start gap-2.5">
                <div
                  className="rounded-full flex items-center justify-center mt-0.5"
                  style={{
                    width: 18,
                    height: 18,
                    minWidth: 18,
                    border: `2px solid ${active ? "var(--brass)" : "var(--border)"}`,
                  }}
                >
                  {active && (
                    <div
                      className="rounded-full"
                      style={{
                        width: 9,
                        height: 9,
                        background: "var(--brass)",
                      }}
                    />
                  )}
                </div>
                <div>
                  <p
                    className="text-sm font-normal"
                    style={{ color: "var(--ink)" }}
                  >
                    {opt.label}
                  </p>
                  {opt.sub && (
                    <p
                      className="text-xs mt-0.5"
                      style={{ color: "var(--slate)" }}
                    >
                      {opt.sub}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {error && (
        <p
          className="flex items-center gap-1 mt-2 text-xs"
          style={{ color: "var(--error)" }}
        >
          <AlertCircle size={13} /> {error}
        </p>
      )}
    </div>
  );
}

function Checkbox({ checked, onChange, label, error, id }: any) {
  return (
    <div>
      <div
        className="flex items-start gap-3 tpa-chip"
        style={{
          cursor: "pointer",
          borderColor: error
            ? "var(--error)"
            : checked
              ? "var(--brass)"
              : "var(--border)",
          background: checked ? "var(--brass-pale)" : "var(--paper)",
        }}
        onClick={() => onChange(!checked)}
        role="checkbox"
        aria-checked={checked}
        id={id}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onChange(!checked);
          }
        }}
      >
        <div
          className="flex items-center justify-center rounded"
          style={{
            width: 20,
            height: 20,
            minWidth: 20,
            border: `2px solid ${checked ? "var(--brass)" : "var(--border)"}`,
            background: checked ? "var(--brass)" : "#fff",
            marginTop: 1,
          }}
        >
          {checked && <Check size={13} color="#fff" strokeWidth={3} />}
        </div>
        <p className="text-sm" style={{ color: "var(--ink)", lineHeight: 1.5 }}>
          {label}
        </p>
      </div>
      {error && (
        <p
          className="flex items-center gap-1 mt-1.5 text-xs"
          style={{ color: "var(--error)" }}
        >
          <AlertCircle size={13} /> {error}
        </p>
      )}
    </div>
  );
}

/* =============================================================================
   SECTION CARD WRAPPER
   ============================================================================= */
export function SectionCard({ icon: Icon, title, desc, children }: any) {
  return (
    <div className="tpa-card tpa-anim-enter p-6 sm:p-8">
      <div className="flex items-center gap-3 mb-1">
        {Icon && (
          <div
            className="rounded-xl flex items-center justify-center"
            style={{
              width: 38,
              height: 38,
              background: "var(--brass-pale)",
              color: "var(--brass)",
            }}
          >
            <Icon size={19} />
          </div>
        )}
        <h2
          className="tpa-serif text-xl sm:text-2xl font-semibold"
          style={{ color: "var(--navy)" }}
        >
          {title}
        </h2>
      </div>
      {desc && (
        <p
          className="text-sm mb-6 ml-0"
          style={{ color: "var(--slate)", marginLeft: Icon ? 50 : 0 }}
        >
          {desc}
        </p>
      )}
      <div className="mt-6">{children}</div>
    </div>
  );
}

/* =============================================================================
   UPLOAD FIELD
   ============================================================================= */
function UploadField({ label, required, file, onFile, onRemove, error }: any) {
  const [dragging, setDragging] = useState(false);
  const [progress, setProgress] = useState(file?.progress ?? (file ? 100 : 0));
  const inputRef: any = useRef(null);

  useEffect(() => {
    if (file && file.progress < 100) {
      const t = setInterval(() => {
        setProgress((p: any) => {
          const next = Math.min(100, p + Math.random() * 22 + 8);
          if (next >= 100) {
            clearInterval(t);
            onFile({ ...file, progress: 100 }, true);
          }
          return next;
        });
      }, 180);
      return () => clearInterval(t);
    }
  }, [file?.name]);

  const validate = (f: any) => {
    if (!ACCEPTED_TYPES.includes(f.type))
      return "Only PDF, JPG, or PNG files are accepted.";
    if (f.size > MAX_FILE_MB * 1024 * 1024)
      return `File must be under ${MAX_FILE_MB}MB.`;
    return null;
  };

  const handleFiles = (fileList: any) => {
    const f = fileList[0];
    if (!f) return;
    const err = validate(f);
    if (err) {
      onFile({ name: f.name, size: f.size, error: err, progress: 0 });
      return;
    }
    setProgress(0);
    onFile({
      name: f.name,
      size: f.size,
      type: f.type,
      progress: 0,
      previewUrl: f.type.startsWith("image/") ? URL.createObjectURL(f) : null,
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm font-medium" style={{ color: "var(--navy)" }}>
          {label} {required && <span style={{ color: "var(--error)" }}>*</span>}
        </p>
        {file && !file.error && (
          <button
            type="button"
            onClick={onRemove}
            className="text-xs font-semibold flex items-center gap-1"
            style={{ color: "var(--error)" }}
          >
            <Trash2 size={12} /> Remove
          </button>
        )}
      </div>

      {!file && (
        <div
          className={`tpa-upload-zone ${dragging ? "tpa-dragging" : ""} ${error ? "tpa-upload-error" : ""}`}
          style={{
            padding: "26px 16px",
            textAlign: "center",
            cursor: "pointer",
          }}
          onClick={() => inputRef.current.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            handleFiles(e.dataTransfer.files);
          }}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter") inputRef.current.click();
          }}
        >
          <input
            ref={inputRef}
            type="file"
            className="hidden"
            accept=".pdf,.png,.jpg,.jpeg"
            onChange={(e) => handleFiles(e.target.files)}
          />
          <Upload
            size={22}
            className="mx-auto mb-2"
            style={{ color: "var(--brass)" }}
          />
          <p className="text-sm font-medium" style={{ color: "var(--ink)" }}>
            Drag & drop, or click to browse
          </p>
          <p className="text-xs mt-1" style={{ color: "var(--brass)" }}>
            PDF, JPG, or PNG up to {MAX_FILE_MB}MB
          </p>
        </div>
      )}

      {file && (
        <div
          className="tpa-card p-3.5 tpa-anim-pop"
          style={{
            borderColor: file.error ? "var(--error)" : "var(--border-soft)",
          }}
        >
          <div className="flex items-center gap-3">
            {file.previewUrl ? (
              <img
                src={file.previewUrl}
                alt=""
                className="rounded-lg object-cover"
                style={{ width: 44, height: 44 }}
              />
            ) : (
              <div
                className="rounded-lg flex items-center justify-center"
                style={{
                  width: 44,
                  height: 44,
                  background: "var(--brass-pale)",
                  color: "var(--brass)",
                }}
              >
                <FileText size={19} />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p
                className="text-sm font-medium truncate"
                style={{ color: "var(--ink)" }}
              >
                {file.name}
              </p>
              {file.error ? (
                <p
                  className="text-xs flex items-center gap-1 mt-0.5"
                  style={{ color: "var(--error)" }}
                >
                  <AlertCircle size={11} /> {file.error}
                </p>
              ) : (
                <>
                  <p className="text-xs" style={{ color: "var(--slate)" }}>
                    {formatBytes(file.size)}
                  </p>
                  {progress < 100 ? (
                    <div
                      className="rounded-full mt-1.5"
                      style={{
                        height: 5,
                        background: "var(--border-soft)",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        className="tpa-progress-fill rounded-full h-full"
                        style={{
                          width: `${progress}%`,
                          background: "var(--brass)",
                        }}
                      />
                    </div>
                  ) : (
                    <p
                      className="text-xs flex items-center gap-1 mt-0.5"
                      style={{ color: "var(--success)" }}
                    >
                      <CheckCircle2 size={11} /> Uploaded
                    </p>
                  )}
                </>
              )}
            </div>
            {file.error && (
              <button
                type="button"
                onClick={onRemove}
                className="text-xs font-semibold"
                style={{ color: "var(--navy)" }}
              >
                Replace
              </button>
            )}
          </div>
        </div>
      )}
      {error && !file && (
        <p
          className="flex items-center gap-1 mt-1.5 text-xs"
          style={{ color: "var(--error)" }}
        >
          <AlertCircle size={13} /> {error}
        </p>
      )}
    </div>
  );
}

/* =============================================================================
   SIGNATURE FIELD (native canvas, no external library)
   ============================================================================= */
function SignatureField({
  mode,
  onModeChange,
  dataUrl,
  onDataUrlChange,
  typedName,
  onTypedNameChange,
  date,
  error,
}: any) {
  const canvasRef: any = useRef(null);
  const drawing = useRef(false);
  const hasDrawn = useRef(false);

  useEffect(() => {
    const canvas: any = canvasRef.current;
    if (!canvas) return;
    const ratio = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * ratio;
    canvas.height = rect.height * ratio;
    const ctx = canvas.getContext("2d");
    ctx.scale(ratio, ratio);
    ctx.lineWidth = 2.2;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#16213E";
  }, [mode]);

  const getPos = (e: any) => {
    const canvas: any = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const point = e.touches ? e.touches[0] : e;
    return { x: point.clientX - rect.left, y: point.clientY - rect.top };
  };

  const start = (e: any) => {
    e.preventDefault();
    drawing.current = true;
    hasDrawn.current = true;
    const ctx = canvasRef.current.getContext("2d");
    const { x, y } = getPos(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
  };
  const move = (e: any) => {
    if (!drawing.current) return;
    e.preventDefault();
    const ctx = canvasRef.current.getContext("2d");
    const { x, y } = getPos(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  };
  const end = () => {
    if (!drawing.current) return;
    drawing.current = false;
    onDataUrlChange(canvasRef.current.toDataURL("image/png"));
  };
  const clear = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    hasDrawn.current = false;
    onDataUrlChange(null);
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <button
          type="button"
          onClick={() => onModeChange("draw")}
          className="tpa-btn-ghost"
          style={{
            padding: "8px 14px",
            borderColor: mode === "draw" ? "var(--brass)" : "var(--border)",
            background: mode === "draw" ? "var(--brass-pale)" : "transparent",
          }}
        >
          <Pencil size={14} /> Draw
        </button>
        <button
          type="button"
          onClick={() => onModeChange("type")}
          className="tpa-btn-ghost"
          style={{
            padding: "8px 14px",
            borderColor: mode === "type" ? "var(--brass)" : "var(--border)",
            background: mode === "type" ? "var(--brass-pale)" : "transparent",
          }}
        >
          <Type size={14} /> Type instead
        </button>
      </div>

      {mode === "draw" ? (
        <div>
          <div
            className="rounded-2xl relative"
            style={{
              border: `1.5px solid ${error ? "var(--error)" : "var(--border)"}`,
              background: "#fff",
              height: 160,
            }}
          >
            <canvas
              ref={canvasRef}
              style={{
                width: "100%",
                height: "100%",
                touchAction: "none",
                cursor: "crosshair",
              }}
              onMouseDown={start}
              onMouseMove={move}
              onMouseUp={end}
              onMouseLeave={end}
              onTouchStart={start}
              onTouchMove={move}
              onTouchEnd={end}
            />
            {!dataUrl && (
              <p
                className="absolute inset-0 flex items-center justify-center text-sm pointer-events-none"
                style={{ color: "var(--slate-light)" }}
              >
                Sign here
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={clear}
            className="tpa-btn-ghost mt-2.5"
            style={{ padding: "7px 12px" }}
          >
            <RotateCcw size={13} /> Clear
          </button>
        </div>
      ) : (
        <FloatField
          id="signature-typed"
          label="Type your full legal name"
          value={typedName}
          onChange={onTypedNameChange}
          placeholder="e.g. Jordan A. Rivera"
        />
      )}

      <div
        className="flex items-center gap-2 mt-3 text-xs"
        style={{ color: "var(--slate)" }}
      >
        <ShieldCheck size={13} /> Signed on{" "}
        {new Date(date + "T00:00:00").toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })}
      </div>

      {error && (
        <p
          className="flex items-center gap-1 mt-2 text-xs"
          style={{ color: "var(--error)" }}
        >
          <AlertCircle size={13} /> {error}
        </p>
      )}
    </div>
  );
}

/* =============================================================================
   STEPPER (desktop vertical ledger + mobile progress bar)
   ============================================================================= */
function VerticalStepper({ steps, activeIndex, completedSteps, onJump }: any) {
  return (
    <nav
      aria-label="Application progress"
      className="hidden lg:block"
      style={{ width: 250 }}
    >
      <div className="sticky" style={{ top: 32 }}>
        <div className="flex items-center gap-2 mb-8">
          {/* <div className="rounded-lg flex items-center justify-center" style={{ width: 34, height: 34, background: "var(--navy)" }}>
            <School size={17} color="var(--brass-light)" />
          </div> */}
          <div>
            {/* <p className="tpa-serif text-sm font-semibold leading-tight" style={{ color: "var(--navy)" }}>Tower Preparatory</p>
            <p className="text-xs" style={{ color: "var(--slate)" }}>Academy</p> */}
            <p className="tpa-serif font-light leading-tight">
              Student Registration Form
            </p>
            <p
              className="text-[12px] font-light leading-tight"
              style={{ color: "var(--navy)" }}
            >
              Please fill out the form carefully and accurately.
            </p>
          </div>
        </div>
        <ol>
          {steps.map((s: any, i: any) => {
            const isDone = completedSteps.has(s.id);
            const isActive = i === activeIndex;
            const reachable = isDone || i <= activeIndex;
            return (
              <li key={s.id} className="flex gap-3" style={{ minHeight: 66 }}>
                <div className="flex flex-col items-center">
                  <button
                    type="button"
                    disabled={!reachable}
                    onClick={() => reachable && onJump(i)}
                    className={`tpa-seal ${isActive ? "tpa-seal-active" : ""} ${isDone ? "tpa-seal-done" : ""}`}
                    style={{ cursor: reachable ? "pointer" : "default" }}
                    aria-current={isActive ? "step" : undefined}
                  >
                    {isDone ? <Check size={15} /> : i + 1}
                  </button>
                  {i < steps.length - 1 && (
                    <svg width="2" height="34" className="my-0.5">
                      <line
                        x1="1"
                        y1="0"
                        x2="1"
                        y2="34"
                        className={`tpa-step-line ${isDone ? "tpa-step-line-done" : ""}`}
                      />
                    </svg>
                  )}
                </div>
                <div className="pt-1.5 pb-2">
                  <p
                    className="text-sm font-semibold"
                    style={{
                      color: isActive
                        ? "var(--navy)"
                        : isDone
                          ? "var(--ink)"
                          : "var(--slate-light)",
                    }}
                  >
                    {s.title}
                  </p>
                  {isActive && (
                    <p
                      className="text-xs mt-0.5"
                      style={{ color: "var(--slate)" }}
                    >
                      {s.desc}
                    </p>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}

function MobileProgress({ steps, activeIndex }: any) {
  const pct = ((activeIndex + 1) / steps.length) * 100;
  return (
    <div className="lg:hidden mb-6">
      <div className="flex items-center justify-between mb-2">
        <p
          className="text-xs font-semibold tracking-wide"
          style={{ color: "var(--brass)" }}
        >
          Step {activeIndex + 1} of {steps.length}
        </p>
        <p className="text-xs" style={{ color: "var(--slate)" }}>
          {steps[activeIndex].title}
        </p>
      </div>
      <div
        className="rounded-full"
        style={{
          height: 6,
          background: "var(--border-soft)",
          overflow: "hidden",
        }}
      >
        <div
          className="tpa-progress-fill rounded-full h-full"
          style={{ width: `${pct}%`, background: "var(--brass)" }}
        />
      </div>
    </div>
  );
}

/* =============================================================================
   TOAST
   ============================================================================= */
function Toast({ toast }: any) {
  if (!toast) return null;
  const isError = toast.type === "error";
  return (
    <div
      className="tpa-toast-enter fixed z-50 flex items-center gap-2.5 tpa-card"
      style={{
        bottom: 24,
        left: "50%",
        transform: "translateX(-50%)",
        padding: "13px 20px",
        borderColor: isError ? "var(--error)" : "var(--success)",
      }}
    >
      {isError ? (
        <AlertCircle size={17} style={{ color: "var(--error)" }} />
      ) : (
        <CheckCircle2 size={17} style={{ color: "var(--success)" }} />
      )}
      <span className="text-sm font-medium">{toast.message}</span>
    </div>
  );
}

/* =============================================================================
   STEP: PROGRAM
   ============================================================================= */
function StepProgram({ data, setField, errors }: any) {
  return (
    <SectionCard
      icon={STEP_DEFS[0].icon}
      title={STEP_DEFS[0].title}
      desc={STEP_DEFS[0].desc}
    >
      <div className="grid sm:grid-cols-2 gap-5 mb-6">
        <SelectField
          id="academicYear"
          label="Academic Year"
          value={data.academicYear}
          onChange={(v: any) => setField("program.academicYear", v)}
          options={ACADEMIC_YEARS.map((y) => ({ value: y, label: y }))}
          error={errors.academicYear}
        />
        <SelectField
          id="grade"
          label="Target Grade / Level"
          value={data.grade}
          onChange={(v: any) => setField("program.grade", v)}
          options={GRADE_OPTIONS}
          error={errors.grade}
        />
      </div>

      <div className="mb-6">
        <RadioCardGroup
          label="Admission Type"
          columns={2}
          value={data.admissionType}
          onChange={(v: any) => setField("program.admissionType", v)}
          options={[
            { value: "new", label: "New Student" },
            { value: "returning", label: "Returning Student" },
          ]}
          error={errors.admissionType}
        />
      </div>

      <RadioCardGroup
        label="Program Track"
        columns={2}
        value={data.track}
        onChange={(v: any) => setField("program.track", v)}
        options={[
          {
            value: "montessori",
            label: "Montessori",
            sub: "Child-led, mixed-age classrooms",
          },
          {
            value: "primary",
            label: "Primary School",
            sub: "Traditional grade-level curriculum",
          },
        ]}
        error={errors.track}
      />
    </SectionCard>
  );
}

/* =============================================================================
   STEP: STUDENT
   ============================================================================= */
function StepStudent({ data, setField, errors }: any) {
  return (
    <SectionCard
      icon={STEP_DEFS[1].icon}
      title={STEP_DEFS[1].title}
      desc={STEP_DEFS[1].desc}
    >
      <div className="grid sm:grid-cols-3 gap-5 mb-6">
        <FloatField
          id="firstName"
          label="First Name"
          value={data.firstName}
          onChange={(v: any) => setField("student.firstName", v)}
          error={errors.firstName}
        />
        <FloatField
          id="middleName"
          label="Middle Name"
          value={data.middleName}
          onChange={(v: any) => setField("student.middleName", v)}
        />
        <FloatField
          id="lastName"
          label="Last Name"
          value={data.lastName}
          onChange={(v: any) => setField("student.lastName", v)}
          error={errors.lastName}
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-5 mb-6">
        <DateField
          id="dob"
          label="Date of Birth"
          value={data.dob}
          onChange={(v: any) => setField("student.dob", v)}
          error={errors.dob}
        />
        {/* <FloatField
          id="primaryLanguage"
          label="Primary Language"
          value={data.primaryLanguage}
          onChange={(v: any) => setField("student.primaryLanguage", v)}
          error={errors.primaryLanguage}
        /> */}
      </div>

      <div className="mb-6">
        <RadioCardGroup
          label="Gender"
          columns={3}
          value={data.gender}
          onChange={(v: any) => setField("student.gender", v)}
          options={[
            { value: "male", label: "Male" },
            { value: "female", label: "Female" },
          ]}
          error={errors.gender}
        />
      </div>

      <p
        className="text-sm font-medium mb-3 flex items-center gap-1.5"
        style={{ color: "var(--navy)" }}
      >
        <MapPin size={14} /> Home Address
      </p>
      <div className="grid sm:grid-cols-2 gap-5 mb-4">
        <FloatField
          id="street"
          label="Street"
          value={data.address.street}
          onChange={(v: any) => setField("student.address.street", v)}
          error={errors["address.street"]}
        />
        {/* <FloatField
          id="city"
          label="City"
          value={data.address.city}
          onChange={(v: any) => setField("student.address.city", v)}
          error={errors["address.city"]}
        /> */}
        <SelectField
          id="city"
          label="City"
          value={data.address.city}
          onChange={(v: any) => setField("student.address.city", v)}
          options={CITIES.filter(Boolean).map((s) => ({
            value: s,
            label: s,
          }))}
          error={errors["address.city"]}
        />
      </div>
      <div className="grid sm:grid-cols-2 gap-5 mb-6">
        <SelectField
          id="state"
          label="State"
          value={data.address.state}
          onChange={(v: any) => setField("student.address.state", v)}
          options={US_STATES.filter(Boolean).map((s) => ({
            value: s,
            label: s,
          }))}
          error={errors["address.state"]}
        />

        <FloatField
          id="postalCode"
          label="Postal Code"
          value={data.address.postalCode}
          onChange={(v: any) => setField("student.address.postalCode", v)}
          error={errors["address.postalCode"]}
        />
      </div>

      <FloatField
        id="previousSchool"
        label="Previous School (optional)"
        value={data.previousSchool}
        onChange={(v: any) => setField("student.previousSchool", v)}
      />
    </SectionCard>
  );
}

/* =============================================================================
   STEP: GUARDIAN
   ============================================================================= */
function GuardianCard({
  title,
  data,
  prefix,
  setField,
  errors,
  allowNone,
}: any) {
  const relationOptions = allowNone
    ? [...RELATION_OPTIONS, "None"]
    : RELATION_OPTIONS;
  const isNone = data.relation === "None";
  return (
    <div
      className="tpa-card p-5 sm:p-6 mb-5"
      style={{ background: "var(--slate-light)" }}
    >
      <p
        className="text-sm font-semibold mb-4"
        style={{ color: "var(--navy)" }}
      >
        {title}
      </p>
      <div className="mb-5">
        <SelectField
          id={`${prefix}-relation`}
          label="Relation"
          value={data.relation}
          onChange={(v: any) => setField(`${prefix}.relation`, v)}
          options={relationOptions.map((r) => ({ value: r, label: r }))}
          error={errors[`${prefix}.relation`]}
        />
      </div>
      {!isNone && (
        <div className="grid sm:grid-cols-2 gap-5 tpa-anim-enter">
          <FloatField
            id={`${prefix}-name`}
            label="Name"
            value={data.name}
            onChange={(v: any) => setField(`${prefix}.name`, v)}
            error={errors[`${prefix}.name`]}
          />
          <PhoneField
            id={`${prefix}-phone`}
            label="Phone"
            value={data.phone}
            onChange={(v: any) => setField(`${prefix}.phone`, v)}
            error={errors[`${prefix}.phone`]}
          />
          <EmailField
            id={`${prefix}-email`}
            label="Email"
            value={data.email}
            onChange={(v: any) => setField(`${prefix}.email`, v)}
            error={errors[`${prefix}.email`]}
          />
          <FloatField
            id={`${prefix}-occupation`}
            label="Occupation"
            value={data.occupation}
            onChange={(v: any) => setField(`${prefix}.occupation`, v)}
            error={errors[`${prefix}.occupation`]}
          />
        </div>
      )}
    </div>
  );
}

function StepGuardian({ formData, setField, errors }: any) {
  return (
    <SectionCard
      icon={STEP_DEFS[2].icon}
      title={STEP_DEFS[2].title}
      desc={STEP_DEFS[2].desc}
    >
      <GuardianCard
        title="Contact One"
        data={formData.guardian1}
        prefix="guardian1"
        setField={setField}
        errors={errors}
        allowNone={false}
      />
      <GuardianCard
        title="Contact Two (optional)"
        data={formData.guardian2}
        prefix="guardian2"
        setField={setField}
        errors={errors}
        allowNone={true}
      />
    </SectionCard>
  );
}

/* =============================================================================
   STEP: MEDICAL
   ============================================================================= */
function StepMedical({ data, setField, errors }: any) {
  return (
    <SectionCard
      icon={STEP_DEFS[3].icon}
      title={STEP_DEFS[3].title}
      desc={STEP_DEFS[3].desc}
    >
      <p
        className="text-sm font-semibold mb-4"
        style={{ color: "var(--navy)" }}
      >
        Emergency Contact
      </p>
      <div className="grid sm:grid-cols-2 gap-5 mb-6">
        <FloatField
          id="emergencyRelation"
          label="Relationship"
          value={data.emergencyRelation}
          onChange={(v: any) => setField("medical.emergencyRelation", v)}
          error={errors.emergencyRelation}
        />
        <PhoneField
          id="emergencyPhone"
          label="Phone"
          value={data.emergencyPhone}
          onChange={(v: any) => setField("medical.emergencyPhone", v)}
          error={errors.emergencyPhone}
        />
      </div>
      <div className="grid gap-5">
        <TextAreaField
          id="allergies"
          label="Allergies"
          value={data.allergies}
          onChange={(v: any) => setField("medical.allergies", v)}
          hint={`{List any known allergies, or ignore if no allergy}`}
        />
        <TextAreaField
          id="conditions"
          label="Medical Conditions"
          value={data.conditions}
          onChange={(v: any) => setField("medical.conditions", v)}
          hint="Include anything the school nurse should know."
        />
      </div>
    </SectionCard>
  );
}

/* =============================================================================
   STEP: MONTESSORI
   ============================================================================= */
function StepMontessori({ data, setField, errors }: any) {
  return (
    <SectionCard
      icon={STEP_DEFS[4].icon}
      title={STEP_DEFS[4].title}
      desc={STEP_DEFS[4].desc}
    >
      <div className="mb-6">
        <RadioCardGroup
          label="Has your child attended Montessori before?"
          columns={2}
          value={data.attendedBefore}
          onChange={(v: any) => setField("montessori.attendedBefore", v)}
          options={[
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" },
          ]}
          error={errors.attendedBefore}
        />
      </div>
      <div className="grid gap-5">
        <TextAreaField
          id="interest"
          label="Why is your family interested in Montessori?"
          rows={5}
          value={data.interest}
          onChange={(v: any) => setField("montessori.interest", v)}
          error={errors.interest}
        />
        <TextAreaField
          id="strengths"
          label="Describe your child's strengths, interests, and independence."
          rows={5}
          value={data.strengths}
          onChange={(v: any) => setField("montessori.strengths", v)}
          error={errors.strengths}
        />
      </div>
    </SectionCard>
  );
}

/* =============================================================================
   STEP: UPLOADS
   ============================================================================= */
function StepUploads({ data, setField, errors, grade }: any) {
  return (
    <SectionCard
      icon={STEP_DEFS[5].icon}
      title={STEP_DEFS[5].title}
      desc={STEP_DEFS[5].desc}
    >
      <div className="grid sm:grid-cols-2 gap-6">
        {UPLOAD_SPECS.map((spec) => {
          const requiredNow =
            spec.required ||
            (spec.key === "academicRecords" && grade === "upper-elementary");
          return (
            <UploadField
              key={spec.key}
              label={spec.label}
              required={requiredNow}
              file={data[spec.key]}
              onFile={(f: any) => setField(`uploads.${spec.key}`, f)}
              onRemove={() => setField(`uploads.${spec.key}`, null)}
              error={errors[spec.key]}
            />
          );
        })}
      </div>
      {grade === "upper-elementary" && (
        <p
          className="text-xs mt-5 flex items-center gap-1.5"
          style={{ color: "var(--brass)" }}
        >
          <AlertCircle size={13} /> Academic Records are required for Upper
          Elementary applicants.
        </p>
      )}
    </SectionCard>
  );
}

/* =============================================================================
   STEP: CONSENT
   ============================================================================= */
function StepConsent({ data, setField, errors }: any) {
  return (
    <SectionCard
      icon={STEP_DEFS[6].icon}
      title={STEP_DEFS[6].title}
      desc={STEP_DEFS[6].desc}
    >
      <div className="grid gap-4 mb-6">
        <Checkbox
          id="tuitionAgreement"
          checked={data.tuitionAgreement}
          onChange={(v: any) => setField("consent.tuitionAgreement", v)}
          label="I agree to the terms and policies of Tower Preparatory Academy standards, including tuition agreement, payment schedule and school policy."
          error={errors.tuitionAgreement}
        />
      </div>
      <div className="mb-6">
        <RadioCardGroup
          label="Media Release"
          columns={2}
          value={data.mediaRelease}
          onChange={(v: any) => setField("consent.mediaRelease", v)}
          options={[
            {
              value: "grant",
              label: "Grant permission",
              sub: "Photos/video may be used in school materials",
            },
            {
              value: "deny",
              label: "Do not grant",
              sub: "No photos or video of my child",
            },
          ]}
          error={errors.mediaRelease}
        />
      </div>
      <p
        className="text-sm font-semibold mb-3"
        style={{ color: "var(--navy)" }}
      >
        Digital Signature
      </p>
      <SignatureField
        mode={data.signatureMode}
        onModeChange={(m: any) => setField("consent.signatureMode", m)}
        dataUrl={data.signatureDataUrl}
        onDataUrlChange={(d: any) => setField("consent.signatureDataUrl", d)}
        typedName={data.signatureTypedName}
        onTypedNameChange={(v: any) =>
          setField("consent.signatureTypedName", v)
        }
        date={data.signatureDate}
        error={errors.signature}
      />
    </SectionCard>
  );
}

/* =============================================================================
   REVIEW STEP
   ============================================================================= */
export function ReviewRow({ label, value }: any) {
  return (
    <div className="flex justify-between gap-4 py-1.5 text-sm">
      <p style={{ color: "var(--slate)" }} className="font-poppinsRegular!">
        {label}
      </p>
      <span className="text-right font-medium" style={{ color: "var(--ink)" }}>
        {value || ""}
      </span>
    </div>
  );
}

function ReviewSection({ title, onEdit, children }: any) {
  return (
    <div className="tpa-card p-5 sm:p-6 mb-5">
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-semibold" style={{ color: "var(--navy)" }}>
          {title}
        </p>
        <button
          type="button"
          onClick={onEdit}
          className="text-xs font-semibold"
          style={{ color: "var(--brass)" }}
        >
          Edit
        </button>
      </div>
      {children}
    </div>
  );
}

function StepReview({ formData, goToStep }: any) {
  const g = formData;
  const gradeLabel = GRADE_OPTIONS.find(
    (o) => o.value === g.program.grade,
  )?.label;
  const uploadedCount = UPLOAD_SPECS.filter(
    (s) => g.uploads[s.key] && !g.uploads[s.key].error,
  ).length;

  return (
    <SectionCard
      icon={STEP_DEFS[7].icon}
      title={STEP_DEFS[7].title}
      desc={STEP_DEFS[7].desc}
    >
      <ReviewSection title="Program" onEdit={() => goToStep(0)}>
        <ReviewRow label="Academic Year" value={g.program.academicYear} />
        <ReviewRow
          label="Admission Type"
          value={
            g.program.admissionType === "new"
              ? "New Student"
              : "Returning Student"
          }
        />
        <ReviewRow
          label="Track"
          value={
            g.program.track === "montessori" ? "Montessori" : "Primary School"
          }
        />
        <ReviewRow label="Grade / Level" value={gradeLabel} />
      </ReviewSection>

      <ReviewSection title="Student" onEdit={() => goToStep(1)}>
        <ReviewRow
          label="Name"
          value={[g.student.firstName, g.student.middleName, g.student.lastName]
            .filter(Boolean)
            .join(" ")}
        />
        <ReviewRow label="Date of Birth" value={g.student.dob} />
        <ReviewRow label="Gender" value={g.student.gender} />
        <ReviewRow
          label="Address"
          value={[
            g.student.address.street,
            g.student.address.city,
            g.student.address.state,
            g.student.address.postalCode,
          ]
            .filter(Boolean)
            .join(", ")}
        />
      </ReviewSection>

      <ReviewSection title="Parent / Guardian" onEdit={() => goToStep(2)}>
        <ReviewRow
          label="Guardian One"
          value={`${g.guardian1.name} (${g.guardian1.relation})`}
        />
        <ReviewRow label="Phone" value={g.guardian1.phone} />
        <ReviewRow label="Email" value={g.guardian1.email} />
        {g.guardian2.relation && g.guardian2.relation !== "None" && (
          <ReviewRow
            label="Guardian Two"
            value={`${g.guardian2.name} (${g.guardian2.relation})`}
          />
        )}
      </ReviewSection>

      <ReviewSection title="Medical" onEdit={() => goToStep(3)}>
        <ReviewRow
          label="Emergency Contact"
          value={`${g.medical.emergencyRelation} \u2013 ${g.medical.emergencyPhone}`}
        />
        <ReviewRow
          label="Allergies"
          value={g.medical.allergies || "None listed"}
        />
      </ReviewSection>

      {g.program.track === "montessori" && (
        <ReviewSection title="Montessori Questions" onEdit={() => goToStep(4)}>
          <ReviewRow
            label="Attended before"
            value={g.montessori.attendedBefore === "yes" ? "Yes" : "No"}
          />
        </ReviewSection>
      )}

      <ReviewSection
        title="Documents"
        onEdit={() => goToStep(g.program.track === "montessori" ? 5 : 4)}
      >
        <ReviewRow
          label="Files uploaded"
          value={`${uploadedCount} of ${UPLOAD_SPECS.length}`}
        />
      </ReviewSection>

      <ReviewSection
        title="Consent & Signature"
        onEdit={() => goToStep(g.program.track === "montessori" ? 6 : 5)}
      >
        <ReviewRow
          label="Tuition Agreement"
          value={g.consent.tuitionAgreement ? "Agreed" : "Not agreed"}
        />
        <ReviewRow
          label="Media Release"
          value={g.consent.mediaRelease === "grant" ? "Granted" : "Not granted"}
        />
        <ReviewRow
          label="Signed"
          value={
            g.consent.signatureMode === "type"
              ? g.consent.signatureTypedName
              : g.consent.signatureDataUrl
                ? "Signature on file"
                : "\u2014"
          }
        />
        <ReviewRow label="Date" value={g.consent.signatureDate} />
      </ReviewSection>

      <button
        type="button"
        onClick={() => window.print()}
        className="tpa-btn-ghost tpa-no-print"
      >
        <Printer size={14} /> Print this review
      </button>
    </SectionCard>
  );
}

/* =============================================================================
   MAIN APP
   ============================================================================= */
export default function AdmissionForm() {
  const [formData, setFormData] = useState(initialFormData);
  const [activeIndex, setActiveIndex] = useState(0);
  const [errorsByStep, setErrorsByStep] = useState<any | null>({});
  const [completedSteps, setCompletedSteps] = useState(new Set());
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [toast, setToast] = useState<any | null>(null);
  const [saveStatus, setSaveStatus] = useState("saved");
  const [dirty, setDirty] = useState(false);
  const saveTimer = useRef<any | null>(null);
  const topRef = useRef<any | null>(null);
  const { goTo } = useAppNavigate();

  const activeSteps = useMemo(
    () =>
      STEP_DEFS.filter(
        (s) => s.id !== "montessori" || formData.program.track === "montessori",
      ),
    [formData.program.track],
  );
  const step = activeSteps[Math.min(activeIndex, activeSteps.length - 1)];
  //   const step = activeSteps[5];

  // In-memory "autosave" (browser storage APIs are unavailable in this sandbox;
  // in a real deployment this effect would persist to localStorage or a backend).
  // The "saving" transition is set synchronously in setField (the actual event
  // handler), not here — this effect only subscribes to the debounce timer and
  // calls setState from its async callback, which is what effects are for.
  useEffect(() => {
    if (!dirty) return;
    clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => setSaveStatus("saved"), 500);
    return () => clearTimeout(saveTimer.current);
  }, [formData, dirty]);

  // Warn on unsaved changes (only matters once real persistence exists, kept for parity)
  useEffect(() => {
    const handler = (e: any) => {
      if (dirty && !submitted) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [dirty, submitted]);

  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(null), 3200);
      return () => clearTimeout(t);
    }
  }, [toast]);

  const setField = useCallback(
    (path: any, value: any) => {
      setDirty(true);
      setSaveStatus("saving");
      setFormData((prev) => setPath(prev, path, value));
      setErrorsByStep((prev: any) => {
        if (!prev[step.id]) return prev;
        const key = path.replace(
          /^(program|student|medical|montessori|consent)\./,
          "",
        );
        const clone = { ...prev[step.id] };
        delete clone[key];
        return { ...prev, [step.id]: clone };
      });
    },
    [step.id],
  );

  const runValidation = (stepId: any) =>
    VALIDATORS[stepId] ? VALIDATORS[stepId](formData) : {};

  const goNext = () => {
    const errs = runValidation(step.id);
    if (Object.keys(errs).length > 0) {
      setErrorsByStep((prev: any) => ({ ...prev, [step.id]: errs }));
      setToast({
        type: "error",
        message: "Please fix the highlighted fields before continuing.",
      });
      return;
    }
    setCompletedSteps((prev) => new Set(prev).add(step.id));
    setActiveIndex((i) => Math.min(i + 1, activeSteps.length - 1));
    topRef.current &&
      topRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const goBack = () => {
    setActiveIndex((i) => Math.max(i - 1, 0));
    topRef.current &&
      topRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const jumpTo = (idx: any) => {
    setActiveIndex(idx);
    topRef.current &&
      topRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const { initializePayment } = usePaystack({
    email: formData.guardian1.email,
    fullName: `${formData.student.firstName} ${formData.student.lastName}`,
    onSuccess: async (reference) => {
      const registrationPayload = {
        reference,
        payload: formData,
      };
      await apiClient.post("/portal/admission", registrationPayload);

      setSubmitting(false);
      setSubmitted(true);
      setDirty(false);
      setToast({
        type: "success",
        message: "Application submitted successfully.",
      });
    },
    onClose: () => {
      setSubmitting(false);
    },
  });

  const handleSubmit = async () => {
    const errs = runValidation("consent");
    if (Object.keys(errs).length > 0) {
      setErrorsByStep((prev: any) => ({ ...prev, consent: errs }));
      setToast({
        type: "error",
        message: "Please complete consent and signature first.",
      });
      return;
    }
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1400));
    initializePayment();
  };

  if (submitted) {
    return (
      <div className="tpa-root min-h-screen flex items-center justify-center p">
        <Tokens />
        <div
          className="tpa-card tpa-anim-pop p-10 text-center"
          style={{ maxWidth: 460 }}
        >
          <div
            className="mx-auto rounded-full flex items-center justify-center mb-5"
            style={{ width: 64, height: 64, background: "var(--success-bg)" }}
          >
            <CheckCircle2 size={30} style={{ color: "var(--success)" }} />
          </div>
          <h1
            className="tpa-serif text-2xl font-semibold mb-2"
            style={{ color: "var(--navy)" }}
          >
            Application Received
          </h1>
          <p className="text-sm mb-1" style={{ color: "var(--slate)" }}>
            Thank you for applying to Tower Preparatory Academy on behalf of{" "}
            <span className="font-semibold" style={{ color: "var(--ink)" }}>
              {formData.student.firstName} {formData.student.lastName}
            </span>
            .
          </p>
          <p className="text-sm" style={{ color: "var(--slate)" }}>
            Our admissions team will reach out within 2 business days.
          </p>
          <p className="text-sm mt-2 pb-7" style={{ color: "var(--brass)" }}>
            {`Check your email - ${formData.guardian1.email} for admission update.`}
          </p>
          <button className="tpa-btn-primary" onClick={() => window.print()}>
            <Printer size={15} /> Print confirmation
          </button>
        </div>
        <Toast toast={toast} />
      </div>
    );
  }

  const errors = errorsByStep[step.id] || {};
  //   const stepIndexInFull = STEP_DEFS.findIndex((s) => s.id === step.id);

  return (
    <div className="tpa-root min-h-screen">
      <Tokens />
      <div ref={topRef} />

      <div className="w-full flex justify-end">
        <button
          type="button"
          onClick={() => goTo("/student/portal")}
          className="tpa-btn-portal"
        >
         Log in Student Portal <MoveRightIcon size={15} />
        </button>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-8 sm:py-12 flex gap-12">
        <VerticalStepper
          steps={activeSteps}
          activeIndex={activeIndex}
          completedSteps={completedSteps}
          onJump={jumpTo}
        />

        <div className="flex-1 min-w-0" style={{ maxWidth: 720 }}>
          <div className="flex items-center justify-between mb-5 lg:hidden">
            <div className="flex items-center gap-2">
     

              <div>
                {/* <p className="tpa-serif text-sm font-semibold leading-tight" style={{ color: "var(--navy)" }}>Tower Preparatory</p>
            <p className="text-xs" style={{ color: "var(--slate)" }}>Academy</p> */}
                <p className="tpa-serif font-light leading-tight">
                  Student Registration Form
                </p>
                <p
                  className="text-[12px] font-light leading-tight"
                  style={{ color: "var(--navy)" }}
                >
                  Please fill out the form carefully and accurately.
                </p>
              </div>
            </div>
          </div>

          <MobileProgress steps={activeSteps} activeIndex={activeIndex} />

          <div className="flex items-center justify-between mb-4">
            <p
              className="text-xs font-semibold tracking-wide hidden lg:block"
              //   style={{ color: "var(--brass)" }}
            >
              Step {activeIndex + 1} of {activeSteps.length}
            </p>
            <div
              className="flex items-center gap-1.5 text-xs ml-auto"
              style={{ color: "var(--slate-light)" }}
            >
              {saveStatus === "saving" ? (
                <>
                  <Loader2 size={12} className="animate-spin" /> Saving progress
                </>
              ) : (
                <>
                  <CheckCircle2 size={12} /> Saved
                </>
              )}
            </div>
          </div>

          <div key={step.id} className="tpa-anim-enter font-poppinsRegular!">
            {step.id === "program" && (
              <StepProgram
                data={formData.program}
                setField={setField}
                errors={errors}
              />
            )}
            {step.id === "student" && (
              <StepStudent
                data={formData.student}
                setField={setField}
                errors={errors}
              />
            )}
            {step.id === "guardian" && (
              <StepGuardian
                formData={formData}
                setField={setField}
                errors={errors}
              />
            )}
            {step.id === "medical" && (
              <StepMedical
                data={formData.medical}
                setField={setField}
                errors={errors}
              />
            )}
            {step.id === "montessori" && (
              <StepMontessori
                data={formData.montessori}
                setField={setField}
                errors={errors}
              />
            )}
            {step.id === "uploads" && (
              <StepUploads
                data={formData.uploads}
                setField={setField}
                errors={errors}
                grade={formData.program.grade}
              />
            )}
            {step.id === "consent" && (
              <StepConsent
                data={formData.consent}
                setField={setField}
                errors={errors}
              />
            )}
            {step.id === "review" && (
              <StepReview formData={formData} goToStep={jumpTo} />
            )}
          </div>

          <div className="flex items-center justify-between mt-6 pb-4">
            <button
              type="button"
              onClick={goBack}
              disabled={activeIndex === 0}
              className="tpa-btn-ghost"
            >
              <ChevronLeft size={15} /> Back
            </button>

            {step.id === "review" ? (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={submitting}
                className="tpa-btn-primary"
              >
                {submitting ? (
                  <>
                    <Loader2 size={15} className="animate-spin" /> Submitting
                  </>
                ) : (
                  <>
                    Submit Application <Check size={15} />
                  </>
                )}
              </button>
            ) : (
              <button
                type="button"
                onClick={goNext}
                className="tpa-btn-primary"
              >
                Continue <ChevronRight size={15} />
              </button>
            )}
          </div>
        </div>
      </div>
      <Toast toast={toast} />
    </div>
  );
}
