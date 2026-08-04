/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo } from "react";
import {
  User,
  MapPin,
  Phone,
  Mail,
  Briefcase,
  HeartPulse,
  FileText,
  Calendar,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Clock,
  FileSignature,
  CreditCard,
  Download,
  Sprout,
  GraduationCap,
  Users,
  Home,
  AlertCircle,
  Receipt,
  Inbox,
} from "lucide-react";
import Logo from "../assets/images/towerlogo.png";


const SCHOOL_TERM = import.meta.env.VITE_SCHOOL_TERM!.split("_").join(" ") ?? "";
const SCHOOL_YEAR = import.meta.env.VITE_SCHOOL_YEAR! ?? "";

/* =============================================================================
   DESIGN TOKENS (as provided)
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
      --border-soft: #F2B5C0;
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

    /* ---- additions for the student data page ---- */
    .tpa-pill {
      display: inline-flex; align-items: center; gap: 5px;
      padding: 5px 12px; border-radius: 999px;
      font-size: 12px; font-weight: 700;
    }
    .tpa-avatar {
      width: 64px; height: 64px; border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      font-family: 'Poppins', sans-serif; font-weight: 700; font-size: 22px;
      background: var(--navy); color: #fff; flex-shrink: 0;
    }
    .tpa-stat-label {
      font-size: 11px; letter-spacing: 0.04em; text-transform: uppercase;
      font-weight: 600; color: var(--slate-light);
    }
    .tpa-stat-value { font-size: 14px; font-weight: 600; color: var(--ink); margin-top: 3px; }
    .tpa-doc-row {
      display: flex; align-items: center; justify-content: space-between;
      padding: 12px 14px; border-radius: 12px; border: 1px solid var(--border-soft);
    }
  `}</style>
);

/* =============================================================================
   SAMPLE DATA (matches the raw Admission DB row shape)
   ============================================================================= */
const SAMPLE_STUDENT: any = {
  id: "635a75ed-75c4-45b8-8f74-7d8b826fa964",
  academicYear: "2026–2027",
  admissionType: "new",
  track: "primary",
  grade: "nursery-two",
  studentFirstName: "NOSA",
  studentMiddleName: "CLEMENT",
  studentLastName: "OBASUYI",
  studentDob: "2021-07-23",
  gender: "male",
  address: {
    city: "Benin City",
    state: "Edo State",
    street: "3, Abusomwan Avenue, Ekae II, Off Sapele Road, Benin City.",
    postalCode: "300002",
  },
  previousSchool: "Winrose",
  guardian1Relation: "Mother",
  guardian1Name: "NOSA CLEMENT OBASUYI",
  guardian1Phone: "081-0850-5829",
  guardian1Email: "nosaclementobasuyi@gmail.com",
  guardian1Occupation: "Hhh",
  guardian2Relation: null,
  guardian2Name: null,
  guardian2Phone: null,
  guardian2Email: null,
  guardian2Occupation: null,
  emergencyRelation: "Huhhhh",
  emergencyPhone: "668-8855-7775",
  allergies: null,
  medicalConditions: null,
  montessoriAttendedBefore: null,
  montessoriInterest: null,
  montessoriStrengths: null,
  uploads: {
    passport: null,
    immunization: null,
    academicRecords: null,
    birthCertificate: null,
  },
  tuitionAgreement: true,
  mediaRelease: "grant",
  signatureMode: "draw",
  signatureTypedName: null,
  signatureImageUr: null,
  signatureDate: "2026-07-30",
  status: "accepted",
  createdAt: "2026-07-30T09:25:11.859Z",
  updatedAt: "2026-07-30T09:25:11.859Z",
};


const payments = [
  { id: "1", paymentReference: "TPA-2026-000482", paymentType: "School Fees", paymentAmount: 185000, paymentStatus: "PAID", updatedAt: "2026-08-02T21:24:10.000Z", term: "2nd Term", academicYear: SCHOOL_YEAR  },
  { id: "2", paymentReference: "TPA-2026-000401", paymentType: "School Fees", paymentAmount: 185000, paymentStatus: "PAID", updatedAt: "2026-04-14T09:02:44.000Z", term: "2nd Term", academicYear: SCHOOL_YEAR  },
  { id: "3", paymentReference: "TPA-2026-000355", paymentType: "School Fees", paymentAmount: 185000, paymentStatus: "PENDING", updatedAt: "", term: "3rd Term", academicYear: SCHOOL_YEAR  },
  { id: "4", paymentReference: "TPA-2026-000355", paymentType: "School Fees", paymentAmount: 2000000, paymentStatus: "PAID", updatedAt: "2026-04-14T09:02:44.000Z", term: SCHOOL_TERM, academicYear: SCHOOL_YEAR },
];
 

/* =============================================================================
   HELPERS
   ============================================================================= */
const prettify = (v: any) =>
  v
    ? v
        .split(/[-_]/)
        .map((w: any) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ")
    : "\u2014";

const initials = (first: any, last: any) =>
  `${(first || "?")[0] ?? ""}${(last || "")[0] ?? ""}`.toUpperCase();

function formatDate(
  iso: any,
  opts: any = { month: "long", day: "numeric", year: "numeric" },
) {
  if (!iso) return "\u2014";
  return new Date(
    iso.length <= 10 ? `${iso}T00:00:00` : iso,
  ).toLocaleDateString("en-US", opts);
}

function calcAge(dobIso: any) {
  if (!dobIso) return null;
  const dob = new Date(dobIso);
  const now = new Date();
  let years = now.getFullYear() - dob.getFullYear();
  let months = now.getMonth() - dob.getMonth();
  if (now.getDate() < dob.getDate()) months -= 1;
  if (months < 0) {
    years -= 1;
    months += 12;
  }
  return { years, months };
}

const STATUS_CONFIG: any = {
  submitted: { label: "Submitted", bg: "#EFEFF2", fg: "#4C4D55" },
  under_review: { label: "Under Review", bg: "#FDF3E4", fg: "#93670F" },
  accepted: {
    label: "Accepted",
    bg: "var(--success-bg)",
    fg: "var(--success)",
  },
  waitlisted: { label: "Waitlisted", bg: "#FDF3E4", fg: "#93670F" },
  rejected: { label: "Rejected", bg: "var(--error-bg)", fg: "var(--error)" },
};

const PAYMENT_STATUS_CONFIG:any = {
  PAID: { label: "Paid", bg: "var(--success-bg)", fg: "var(--success)", icon: CheckCircle2 },
  PENDING: { label: "Pending", bg: "#FDF3E4", fg: "#93670F", icon: Clock },
  FAILED: { label: "Failed", bg: "var(--error-bg)", fg: "var(--error)", icon: XCircle },
};
 
function formatCurrency(amount:any) {
  if (amount === null || amount === undefined) return "\u2014";
  return new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 }).format(amount/100);
}
 
function formatDateTime(iso:any) {
  if (!iso) return "\u2014";
  return new Date(iso).toLocaleString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" });
}

const UPLOAD_LABELS = {
  birthCertificate: "Birth Certificate",
  passport: "Passport",
  immunization: "Immunization Record",
  academicRecords: "Academic Records",
};

/* =============================================================================
   SMALL PRIMITIVES
   ============================================================================= */
function Pill({ children, bg, fg }: any) {
  return (
    <span className="tpa-pill" style={{ background: bg, color: fg }}>
      {children}
    </span>
  );
}

function InfoRow({ icon: Icon, label, value }: any) {
  return (
    <div className="flex items-start gap-3 py-2.5">
      {Icon && (
        <div
          className="rounded-lg flex items-center justify-center mt-0.5"
          style={{
            width: 30,
            height: 30,
            minWidth: 30,
            background: "var(--brass-pale)",
            color: "var(--navy)",
          }}
        >
          <Icon size={14} />
        </div>
      )}
      <div className="min-w-0">
        <p className="tpa-stat-label">{label}</p>
        <p className="tpa-stat-value" style={{ wordBreak: "break-word" }}>
          {value || "\u2014"}
        </p>
      </div>
    </div>
  );
}

function SectionCard({ icon: Icon, title, action, children }: any) {
  return (
    <div className="tpa-card tpa-anim-enter p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          {Icon && (
            <div
              className="rounded-lg flex items-center justify-center"
              style={{
                width: 32,
                height: 32,
                background: "var(--border-soft)",
                color: "var(--navy)",
              }}
            >
              <Icon size={15} />
            </div>
          )}
          <h3
            className="text-sm font-semibold"
            style={{ color: "var(--navy)" }}
          >
            {title}
          </h3>
        </div>
        {action}
      </div>
      {children}
    </div>
  );
}

function DocRow({ label, file }: any) {
  const uploaded = !!file;
  return (
    <div className="tpa-doc-row">
      <div className="flex items-center gap-2.5">
        <FileText
          size={15}
          style={{ color: uploaded ? "var(--navy)" : "var(--slate-light)" }}
        />
        <span className="text-sm font-medium" style={{ color: "var(--ink)" }}>
          {label}
        </span>
      </div>
      {uploaded ? (
        <Pill bg="var(--success-bg)" fg="var(--success)">
          <CheckCircle2 size={12} /> On file
        </Pill>
      ) : (
        <Pill bg="var(--error-bg)" fg="var(--error)">
          <AlertCircle size={12} /> Missing
        </Pill>
      )}
    </div>
  );
}


function PaymentHistoryTable({ payments }:any) {
  // const totalPaid = payments
  //   .filter((p:any) => (p.paymentStatus || "").toUpperCase() === "PAID")
  //   .reduce((sum:any, p:any) => sum + (p.paymentAmount || 0), 0);
 
  if (!payments || payments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-10">
        <div className="rounded-full flex items-center justify-center mb-3" style={{ width: 44, height: 44, background: "var(--border-soft)", color: "var(--slate-light)" }}>
          <Inbox size={20} />
        </div>
        <p className="text-sm font-medium" style={{ color: "var(--ink)" }}>No payments recorded yet</p>
        <p className="text-xs mt-1" style={{ color: "var(--slate)" }}>School fee payments will appear here once made.</p>
      </div>
    );
  }
 
  return (
    <div>
      {/* <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-2">
          <Wallet size={15} style={{ color: "var(--navy)" }} />
          <span className="text-xs font-semibold" style={{ color: "var(--slate)" }}>Total Paid to Date</span>
          <span className="text-sm font-bold" style={{ color: "var(--navy)" }}>{formatCurrency(totalPaid)}</span>
        </div>
      </div> */}
 
      <div className="tpa-scroll" style={{ overflowX: "auto", borderRadius: 14, border: "1px solid var(--border-soft)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 620 }}>
          <thead>
            <tr style={{ background: "#FAFAFA", borderBottom: "1px solid var(--border-soft)" }}>
              {["Ref No.", "Payment Type", "Date", "Amount", "Status"].map((h, i) => (
                <th
                  key={h}
                  style={{
                    textAlign: i === 3 ? "right" : "left",
                    padding: "12px 16px",
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                    color: "var(--slate-light)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {payments.map((p:any, idx:any) => {
              const status = (p.paymentStatus || "PENDING").toUpperCase();
              const cfg = PAYMENT_STATUS_CONFIG[status] ?? PAYMENT_STATUS_CONFIG.PENDING;
              const StatusIcon = cfg.icon;
              return (
                <tr
                  key={p.id ?? idx}
                  className={`${SCHOOL_TERM=== p.term && p.academicYear === SCHOOL_YEAR ? "" : "tpa-no-print"}`}
                  style={{ borderBottom: idx < payments.length - 1 ? "1px solid var(--border-soft)" : "none" }}
                >
                  <td style={{ padding: "14px 16px", fontFamily: "monospace", fontSize: 13, color: "var(--ink)", whiteSpace: "nowrap" }}>
                    {p.paymentReference || "\u2014"}
                  </td>
                  <td style={{ padding: "14px 16px", fontSize: 13.5, color: "var(--ink)", fontWeight: 500, whiteSpace: "nowrap" }}>
                    {p.paymentType || "School Fees"}
                  </td>
                  <td style={{ padding: "14px 16px", fontSize: 13, color: "var(--slate)", whiteSpace: "nowrap" }}>
                    {formatDateTime(p.updatedAt)}
                  </td>
                  <td style={{ padding: "14px 16px", fontSize: 13.5, color: "var(--ink)", fontWeight: 600, textAlign: "right", whiteSpace: "nowrap" }}>
                    {formatCurrency(p.paymentAmount)}
                  </td>
                  <td style={{ padding: "14px 16px", whiteSpace: "nowrap" }}>
                    <Pill bg={cfg.bg} fg={cfg.fg}><StatusIcon size={12} /> {cfg.label}</Pill>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
 
      {/* <div className="flex justify-end mt-4 tpa-no-print">
        <button type="button" onClick={onPayFees} className="tpa-btn-ghost">
          <CreditCard size={14} /> Make a Payment
        </button>
      </div> */}
    </div>
  );
}
 

/* =============================================================================
   MAIN PAGE
   ============================================================================= */
export default function StudentDataPage({
  data = SAMPLE_STUDENT,
  onPayFees,
  onDownload,
}: any) {
  const fullName = [
    data.studentFirstName,
    data.studentMiddleName,
    data.studentLastName,
  ]
    .filter(Boolean)
    .join(" ");
  const age = useMemo(() => calcAge(data.studentDob), [data.studentDob]);
  const statusCfg = STATUS_CONFIG[data.status] ?? STATUS_CONFIG.submitted;
  const isMontessori = data.track === "montessori";
  const hasGuardian2 =
    data.guardian2Relation && data.guardian2Relation !== "None";

  const handlePayFees = () => {
    if (onPayFees) onPayFees(data);
    else console.log("Pay School Fees clicked for", data.id);
  };
  const handleDownload = () => {
    if (onDownload) onDownload(data);
    else window.print();
  };

  return (
    <div className="tpa-root min-h-screen overflow-x-hidden">
      <Tokens />
      <div className="max-w-5xl mx-auto px-4 sm:px-8 py-8 sm:py-12">
        {/* Top bar */}
        <div className="flex flex-wrap items-center justify-between mb-8">
          <div className="flex items-center gap-2.5">
            <div
              className="rounded-lg flex items-center justify-center"
              style={{ width: 64, height: 64 }}
            >
              {/* <GraduationCap size={16} color="var(--brass-pale)" /> */}
              <img
                className="w-12 h-12 bg-white rounded-full"
                src={Logo}
                alt="Tower Logo"
              />
            </div>
            <div>
              <p
                className="tpa-serif"
                style={{ fontSize: 17, color: "var(--navy)" }}
              >
                Tower Preparatory Academy
              </p>
              <p className="text-xs" style={{ color: "var(--slate)" }}>
                Student Data Page
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleDownload}
            className="tpa-btn-ghost tpa-no-print"
          >
            <Download size={14} /> Download
          </button>
        </div>

        {/* Hero */}
        <div className="tpa-card tpa-anim-enter p-6 sm:p-8 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-6">
            <div className="tpa-avatar">
              {initials(data.studentFirstName, data.studentLastName)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2.5 mb-2">
                <h1
                  className="tpa-serif"
                  style={{ fontSize: 22, color: "var(--navy)" }}
                >
                  {fullName}
                </h1>
                <Pill bg={statusCfg.bg} fg={statusCfg.fg}>
                  {data.status === "accepted" ? (
                    <CheckCircle2 size={12} />
                  ) : data.status === "rejected" ? (
                    <XCircle size={12} />
                  ) : (
                    <Clock size={12} />
                  )}
                  {statusCfg.label}
                </Pill>
              </div>
              <div className="flex flex-wrap gap-2">
                <Pill bg="var(--brass-pale)" fg="var(--navy)">
                  {isMontessori ? (
                    <Sprout size={12} />
                  ) : (
                    <GraduationCap size={12} />
                  )}{" "}
                  {isMontessori ? "Montessori" : "Primary School"}
                </Pill>
                <Pill bg="var(--border-soft)" fg="var(--ink)">
                  {prettify(data.grade)}
                </Pill>
                <Pill bg="var(--border-soft)" fg="var(--ink)">
                  {SCHOOL_YEAR}
                </Pill>
                <Pill bg="var(--border-soft)" fg="var(--ink)">
                  {SCHOOL_TERM}
                </Pill>
                {/* <div className="tpa-no-print">
                  <Pill bg="var(--border-soft)" fg="var(--ink)">
                    {data.admissionType === "new"
                      ? "New Student"
                      : "Returning Student"}
                  </Pill>
                </div> */}
              </div>
            </div>
            {data.status === "accepted" ? (
              <div className="tpa-no-print">
                <button
                  type="button"
                  onClick={handlePayFees}
                  disabled={data.status === "accepted" ? false : true}
                  className="tpa-btn-primary"
                  style={{ whiteSpace: "nowrap" }}
                >
                  <CreditCard size={15} /> Pay School Fees
                </button>
              </div>
            ) : null}
          </div>

          <div
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6"
            style={{ borderTop: "1px solid var(--border-soft)" }}
          >
            <div className="tpa-no-print">
              <p className="tpa-stat-label">Date of Birth</p>
              <p className="tpa-stat-value">{formatDate(data.studentDob)}</p>
            </div>
            <div className="tpa-no-print">
              <p className="tpa-stat-label">Age</p>
              <p className="tpa-stat-value">
                {age ? `${age.years}y ${age.months}m` : "\u2014"}
              </p>
            </div>
            <div>
              <p className="tpa-stat-label">Gender</p>
              <p className="tpa-stat-value">{prettify(data.gender)}</p>
            </div>
            <div>
              <p className="tpa-stat-label">Applied On</p>
              <p className="tpa-stat-value">{formatDate(data.createdAt)}</p>
            </div>
          </div>
        </div>

        {/* Two column layout */}
        <div className="grid lg:grid-cols-2 gap-6">
          <SectionCard icon={Home} title="Student & Address">
            <InfoRow
              icon={MapPin}
              label="Home Address"
              value={[
                data.address?.street,
                data.address?.city,
                data.address?.state,
                data.address?.postalCode,
              ]
                .filter(Boolean)
                .join(", ")}
            />
            <div className="tpa-no-print">
              <InfoRow
                icon={FileText}
                label="Previous School"
                value={data.previousSchool}
              />
            </div>
            <InfoRow icon={User} label="Reference ID" value={data.id} />
          </SectionCard>

          <SectionCard icon={Users} title="Parent / Guardian">
            <p
              className="text-xs font-semibold mb-1 tpa-no-print"
              style={{ color: "var(--slate)" }}
            >
              Guardian One
            </p>
            <div className="tpa-no-print">
              <InfoRow
                icon={User}
                label={`Name \u00b7 ${prettify(data.guardian1Relation)}`}
                value={data.guardian1Name}
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <InfoRow icon={Phone} label="Phone" value={data.guardian1Phone} />
              <InfoRow icon={Mail} label="Email" value={data.guardian1Email} />
            </div>
            <div className="tpa-no-print">
              <InfoRow
                icon={Briefcase}
                label="Occupation"
                value={data.guardian1Occupation}
              />
            </div>

            {hasGuardian2 && (
              <>
                <p
                  className="text-xs font-semibold mt-3 mb-1 tpa-no-print"
                  style={{ color: "var(--slate)" }}
                >
                  Guardian Two
                </p>
                <div className="tpa-no-print">
                  <InfoRow
                    icon={User}
                    label={`Name \u00b7 ${prettify(data.guardian2Relation)}`}
                    value={data.guardian2Name}
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <InfoRow
                    icon={Phone}
                    label="Phone"
                    value={data.guardian2Phone}
                  />
                  <InfoRow
                    icon={Mail}
                    label="Email"
                    value={data.guardian2Email}
                  />
                </div>
              </>
            )}
          </SectionCard>

          <div className="tpa-no-print">
            <SectionCard icon={HeartPulse} title="Medical & Emergency">
              <InfoRow
                icon={User}
                label={`Emergency Contact \u00b7 ${prettify(data.emergencyRelation)}`}
                value={data.emergencyPhone}
              />
              <InfoRow
                icon={AlertCircle}
                label="Allergies"
                value={data.allergies || "None reported"}
              />
              <InfoRow
                icon={HeartPulse}
                label="Medical Conditions"
                value={data.medicalConditions || "None reported"}
              />
            </SectionCard>
          </div>

          <div className="tpa-no-print">
            {isMontessori ? (
              <SectionCard icon={Sprout} title="Montessori Questions">
                <InfoRow
                  icon={CheckCircle2}
                  label="Attended Montessori Before"
                  value={data.montessoriAttendedBefore === "yes" ? "Yes" : "No"}
                />
                <InfoRow
                  icon={FileText}
                  label="Family's Interest"
                  value={data.montessoriInterest}
                />
                <InfoRow
                  icon={FileText}
                  label="Strengths & Independence"
                  value={data.montessoriStrengths}
                />
              </SectionCard>
            ) : (
              <SectionCard icon={FileSignature} title="Consent & Signature">
                <InfoRow
                  icon={data.tuitionAgreement ? CheckCircle2 : XCircle}
                  label="Tuition Agreement"
                  value={data.tuitionAgreement ? "Agreed" : "Not agreed"}
                />
                <InfoRow
                  icon={data.mediaRelease === "grant" ? CheckCircle2 : XCircle}
                  label="Media Release"
                  value={
                    data.mediaRelease === "grant" ? "Granted" : "Not granted"
                  }
                />
                <InfoRow
                  icon={ShieldCheck}
                  label="Signed"
                  value={
                    data.signatureMode === "type"
                      ? data.signatureTypedName
                      : data.signatureImageUrl
                        ? "Signature on file"
                        : "\u2014"
                  }
                />
                <InfoRow
                  icon={Calendar}
                  label="Signature Date"
                  value={formatDate(data.signatureDate)}
                />
              </SectionCard>
            )}
          </div>

          <div className="tpa-no-print">
            <SectionCard icon={FileText} title="Documents">
              <div className="grid gap-2.5">
                {Object.entries(UPLOAD_LABELS).map(([key, label]) => (
                  <DocRow key={key} label={label} file={data.uploads?.[key]} />
                ))}
              </div>
            </SectionCard>

            {isMontessori && (
              <SectionCard icon={FileSignature} title="Consent & Signature">
                <InfoRow
                  icon={data.tuitionAgreement ? CheckCircle2 : XCircle}
                  label="Tuition Agreement"
                  value={data.tuitionAgreement ? "Agreed" : "Not agreed"}
                />
                <InfoRow
                  icon={data.mediaRelease === "grant" ? CheckCircle2 : XCircle}
                  label="Media Release"
                  value={
                    data.mediaRelease === "grant" ? "Granted" : "Not granted"
                  }
                />
                <InfoRow
                  icon={ShieldCheck}
                  label="Signed"
                  value={
                    data.signatureMode === "type"
                      ? data.signatureTypedName
                      : data.signatureImageUrl
                        ? "Signature on file"
                        : "\u2014"
                  }
                />
                <InfoRow
                  icon={Calendar}
                  label="Signature Date"
                  value={formatDate(data.signatureDate)}
                />
              </SectionCard>
            )}
          </div>
        </div>


              <div className="mt-6">
          <SectionCard icon={Receipt} title="Payment History">
            <PaymentHistoryTable payments={payments} onPayFees={handlePayFees} />
          </SectionCard>
        </div>

        <p
          className="text-center text-xs mt-8 tpa-no-print pt-5"
          style={{ color: "var(--slate-light)" }}
        >
          Last updated{" "}
          {formatDate(data.updatedAt, {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </p>
      </div>
    </div>
  );
}
