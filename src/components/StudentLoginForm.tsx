/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef, useCallback } from "react";
import {
  Eye,
  EyeOff,
  Loader2,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  IdCard,
} from "lucide-react";
import Logo from "../assets/images/towerlogo.png";

/* =============================================================================
   DESIGN TOKENS (shared with the rest of the Tower Prep portal)
   ============================================================================= */
const Tokens = () => (
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

    .tpa-card {
      background: var(--paper);
      border: 1px solid var(--border-soft);
      border-radius: 20px;
      box-shadow: 0 1px 2px rgba(22,33,62,0.04), 0 12px 32px -16px rgba(22,33,62,0.12);
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
      padding: 13px 22px;
      transition: background 160ms ease, transform 120ms ease;
      display: inline-flex; align-items: center; justify-content: center; gap: 8px;
      border: none; cursor: pointer;
      width: 100%;
    }
    .tpa-btn-primary:hover:not(:disabled) { background: var(--navy-soft); }
    .tpa-btn-primary:active:not(:disabled) { transform: scale(0.98); }
    .tpa-btn-primary:disabled { opacity: 0.55; cursor: not-allowed; }

    .tpa-checkbox {
      width: 17px; height: 17px; border-radius: 5px;
      border: 1.5px solid var(--navy);
      display: inline-flex; align-items: center; justify-content: center;
      cursor: pointer; flex-shrink: 0; transition: all 140ms ease;
    }
    .tpa-checkbox.tpa-checked { background: var(--navy); border-color: var(--navy); }

    .tpa-anim-enter { animation: tpaFade 340ms cubic-bezier(.22,.68,0,1); }
    @keyframes tpaFade {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .tpa-anim-shake { animation: tpaShake 420ms cubic-bezier(.36,.07,.19,.97); }
    @keyframes tpaShake {
      10%, 90% { transform: translateX(-1px); }
      20%, 80% { transform: translateX(2px); }
      30%, 50%, 70% { transform: translateX(-4px); }
      40%, 60% { transform: translateX(4px); }
    }

    @media (prefers-reduced-motion: reduce) {
      .tpa-anim-enter, .tpa-anim-shake { animation: none !important; }
    }
  `}</style>
);

/* =============================================================================
   MINIMAL react-hook-form-COMPATIBLE HOOK
   Same call surface as real RHF (register / handleSubmit / formState) so this
   is a drop-in swap once you're in an environment where the actual package
   is installed: `import { useForm } from "react-hook-form"`.
   ============================================================================= */
function useForm({ defaultValues = {}, mode = "onBlur" } = {}) {
  const [values, setValues] = useState<any>(defaultValues);
  const [errors, setErrors] = useState<any>({});
  const [touched, setTouched] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const rulesRef: any = useRef({});

  const validateField = useCallback((name: any, value: any, rules: any) => {
    let message = null;
    const strVal = value === undefined || value === null ? "" : String(value);
    if (rules.required && !strVal.trim()) {
      message =
        typeof rules.required === "string"
          ? rules.required
          : "This field is required.";
    } else if (rules.minLength && strVal.length < rules.minLength.value) {
      message = rules.minLength.message;
    } else if (rules.pattern && !rules.pattern.value.test(strVal)) {
      message = rules.pattern.message;
    }
    setErrors((prev: any) => {
      const next: any = { ...prev };
      if (message) next[name] = { message };
      else delete next[name];
      return next;
    });
    return message;
  }, []);

  const register = useCallback(
    (name: any, rules = {}) => {
      rulesRef.current[name] = rules;
      return {
        name,
        value: values[name] ?? "",
        onChange: (e: any) => {
          const v = e.target.value;
          setValues((prev: any) => ({ ...prev, [name]: v }));
          if (touched[name] || mode === "onChange")
            validateField(name, v, rules);
        },
        onBlur: (e: any) => {
          setTouched((prev: any) => ({ ...prev, [name]: true }));
          validateField(name, e.target.value, rules);
        },
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [values, touched],
  );

  const handleSubmit = useCallback(
    (onValid: any) => async (e: any) => {
      e && e.preventDefault && e.preventDefault();
      const entries = Object.entries(rulesRef.current);
      const allErrors: any = {};
      entries.forEach(([name, rules]) => {
        const msg = validateField(name, values[name], rules);
        if (msg) allErrors[name] = msg;
      });
      setTouched(
        entries.reduce((acc, [name]) => ({ ...acc, [name]: true }), {}),
      );
      if (Object.keys(allErrors).length > 0) return;

      setIsSubmitting(true);
      try {
        await onValid(values);
      } finally {
        setIsSubmitting(false);
      }
    },
    [values, validateField],
  );

  const setError = useCallback((name: any, err: any) => {
    setErrors((prev: any) => ({ ...prev, [name]: err }));
  }, []);

  return {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  };
}

/* =============================================================================
   LOGIN FORM
   ============================================================================= */
export default function StudentLoginForm({ onLogin }: any) {
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState(null);
  const [rememberMe, setRememberMe] = useState(false);
  const [shake, setShake] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({
    defaultValues: { studentId: "", password: "" },
    mode: "onBlur",
  });

  const studentIdField = register("studentId", {
    required: "Student ID is required.",
    minLength: {
      value: 4,
      message: "Student ID must be at least 4 characters.",
    },
  });
  const passwordField = register("password", {
    required: "Password is required.",
    minLength: { value: 6, message: "Password must be at least 6 characters." },
  });

  const onSubmit = async (values: any) => {
    setAuthError(null);
    try {
      if (onLogin) {
        await onLogin({ ...values, rememberMe });
      } else {
        // Demo fallback — replace with a real auth call via the onLogin prop.
        await new Promise((resolve) => setTimeout(resolve, 1200));
        console.log("Login submitted:", { ...values, rememberMe });
      }
    } catch (err: any) {
      const message =
        err?.message || "Invalid Student ID or password. Please try again.";
      setAuthError(message);
      setError("password", { message: " " }); // marks the field as errored without duplicating the banner text
      setShake(true);
      setTimeout(() => setShake(false), 450);
    }
  };

  return (
    <div className="tpa-root min-h-screen flex items-center justify-center p-4">
      <Tokens />
      <div className="w-full" style={{ maxWidth: 420 }}>
        {/* Branding */}
        <div className="flex flex-col items-center text-center mb-7 tpa-anim-enter">
          <div
            className="rounded-2xl flex items-center justify-center mb-4"
            style={{ width: 100, height: 80 }}
          >
            <img
              className="w-19 h-19 bg-white rounded-full"
              src={Logo}
              alt="Tower Logo"
            />{" "}
          </div>
          <p
            className="tpa-serif"
            style={{ fontSize: 20, color: "var(--navy)" }}
          >
            Tower Preparatory Academy
          </p>
          <p className="text-sm mt-1" style={{ color: "var(--slate)" }}>
            Sign in to the Student Portal
          </p>
        </div>

        {/* Card */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className={`tpa-card tpa-anim-enter p-7 mb-8 sm:p-8 ${shake ? "tpa-anim-shake" : ""}`}
        >
          {authError && (
            <div
              className="flex items-start gap-2.5 mb-5 tpa-anim-enter"
              style={{
                background: "var(--error-bg)",
                border: "1px solid rgba(180,68,60,0.25)",
                borderRadius: 12,
                padding: "12px 14px",
              }}
              role="alert"
            >
              <AlertCircle
                size={16}
                style={{ color: "var(--error)", marginTop: 1, flexShrink: 0 }}
              />
              <p className="text-sm" style={{ color: "var(--error)" }}>
                {authError}
              </p>
            </div>
          )}

          {/* Student ID */}
          <div
            className={`tpa-field mb-5 ${studentIdField.value ? "tpa-filled" : ""} ${errors.studentId ? "tpa-error" : ""}`}
          >
            <label className="tpa-label-float" htmlFor="studentId">
              Student ID
            </label>
            <div className="relative">
              <IdCard
                size={15}
                style={{
                  position: "absolute",
                  left: 14,
                  top: 17,
                  color: "var(--slate-light)",
                }}
              />
              <input
                id="studentId"
                type="text"
                autoComplete="username"
                inputMode="text"
                spellCheck={false}
                {...studentIdField}
                className={`tpa-input ${errors.studentId ? "tpa-input-error" : ""}`}
                style={{ paddingLeft: 36 }}
                aria-invalid={!!errors.studentId}
                aria-describedby={
                  errors.studentId ? "studentId-err" : undefined
                }
              />
            </div>
            {errors.studentId && (
              <p
                id="studentId-err"
                className="flex items-center gap-1 mt-1.5 text-xs"
                style={{ color: "var(--error)" }}
              >
                <AlertCircle size={12} /> {errors.studentId.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div
            className={`tpa-field mb-4 ${passwordField.value ? "tpa-filled" : ""} ${errors.password ? "tpa-error" : ""}`}
          >
            <label className="tpa-label-float" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <ShieldCheck
                size={15}
                style={{
                  position: "absolute",
                  left: 14,
                  top: 17,
                  color: "var(--slate-light)",
                }}
              />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                {...passwordField}
                className={`tpa-input ${errors.password ? "tpa-input-error" : ""}`}
                style={{ paddingLeft: 36, paddingRight: 42 }}
                aria-invalid={!!errors.password}
                aria-describedby={
                  errors.password && errors.password.message.trim()
                    ? "password-err"
                    : undefined
                }
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                style={{
                  position: "absolute",
                  right: 12,
                  top: 13,
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "var(--slate-light)",
                  padding: 4,
                }}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.password && errors.password.message.trim() && (
              <p
                id="password-err"
                className="flex items-center gap-1 mt-1.5 text-xs"
                style={{ color: "var(--error)" }}
              >
                <AlertCircle size={12} /> {errors.password.message}
              </p>
            )}
          </div>

          {/* Remember me / forgot password */}
          <div className="flex items-center justify-between mb-6">
            <div
              className="flex items-center gap-2 select-none"
              style={{ cursor: "pointer" }}
              onClick={() => setRememberMe((v) => !v)}
              role="checkbox"
              aria-checked={rememberMe}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setRememberMe((v) => !v);
                }
              }}
            >
              <span
                className={`tpa-checkbox ${rememberMe ? "tpa-checked" : ""}`}
              >
                {rememberMe && (
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path
                      d="M1 4L3.5 6.5L9 1"
                      stroke="white"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </span>
              <span
                className="text-xs font-medium"
                style={{ color: "var(--ink)" }}
              >
                Remember me
              </span>
            </div>
            {/* <a href="#forgot-password" className="text-xs font-semibold" style={{ color: "var(--navy)" }}>
              Forgot password?
            </a> */}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="tpa-btn-primary"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={16} className="animate-spin" /> Signing in
              </>
            ) : (
              <>
                Sign In <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        <p
          className="text-center text-xs tpa-anim-enter"
          style={{ color: "var(--navy-soft)" }}
        >
          Having trouble signing in? Contact the admissions office at{" "}
          <a
            href="mailto:toweradmissionscentre@gmail.com"
            style={{ color: "var(--slate)", fontWeight: 600 }}
          >
            toweradmissionscentre@gmail.com
          </a>
        </p>
      </div>
    </div>
  );
}
