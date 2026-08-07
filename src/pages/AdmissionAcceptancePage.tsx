/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { Printer, ClipboardCheck, Check, Loader2 } from "lucide-react";
import { ReviewRow, SectionCard, Tokens } from "../components/AdmissionForm";
import { GRADE_OPTIONS, UPLOAD_SPECS } from "../utilities/constants";
import Logo from "../assets/images/towerlogo.png";
import { apiClient } from "../service/apiClient";
import { useParams } from "react-router-dom";
import { transformData } from "../utilities/helperFunction";
import FallBackLoad from "../components/FallBackLoad";

function ReviewSection({ title, children }: any) {
  return (
    <div className="tpa-card p-5 sm:p-6 mb-5">
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-semibold" style={{ color: "var(--navy)" }}>
          {title}
        </p>
      </div>
      {children}
    </div>
  );
}

function AdmissionAcceptancePage() {
  const [g, setG] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState("");
  const { admissionNo } = useParams();
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        setLoading(true);

        const res: any = await apiClient.get(
          `/portal/application/${admissionNo}`,
        );

        if (res.data.success) {
          setG(transformData(res.data.data));
          setLoading(false);
        } else {
          setLoading(false);
        }
      } catch (err: any) {
        setLoading(false);
        setError(err.response?.data?.message ?? "Unable to load application.");
      }
    };

    fetchApplication();
  }, []);

  const REVIEW = {
    id: "review",
    title: "Admissions Review",
    desc: "Please review this application for admission.",
    icon: ClipboardCheck,
  };

  if (loading) {
    return <FallBackLoad />;
  }

  if (error) {
    return <FallBackLoad />;
  }

  if (!g) {
    return <FallBackLoad />;
  }

  const gradeLabel = GRADE_OPTIONS.find(
    (o) => o.value === g.program.grade,
  )?.label;
  const uploadedCount = UPLOAD_SPECS.filter(
    (s) => g.uploads[s.key] && !g.uploads[s.key].error,
  ).length;

  return (
    <>
      <Tokens />
      <div className="tpa-root min-h-screen overflow-x-hidden">
        <div className="w-full flex items-center justify-center p-3">
          <img
            className="w-20 h-20 bg-white rounded-full"
            src={Logo}
            alt="Tower Logo"
          />
        </div>
        <SectionCard icon={REVIEW.icon} title={REVIEW.title} desc={REVIEW.desc}>
          <ReviewSection title="Program">
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
                g.program.track === "montessori"
                  ? "Montessori"
                  : "Primary School"
              }
            />
            <ReviewRow label="Grade / Level" value={gradeLabel} />
          </ReviewSection>

          <ReviewSection title="Student">
            <ReviewRow
              label="Name"
              value={[
                g.student.firstName,
                g.student.middleName,
                g.student.lastName,
              ]
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

          <ReviewSection title="Parent / Guardian">
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

          <ReviewSection title="Medical">
            <ReviewRow
              label="Emergency Contact"
              value={`${g.medical.emergencyRelation} ${g.medical.emergencyPhone}`}
            />
            <ReviewRow
              label="Allergies"
              value={g.medical.allergies || "None listed"}
            />
          </ReviewSection>

          {g.program.track === "montessori" && (
            <ReviewSection title="Montessori Questions">
              <ReviewRow
                label="Attended before"
                value={g.montessori.attendedBefore === "yes" ? "Yes" : "No"}
              />
            </ReviewSection>
          )}

          <ReviewSection title="Documents">
            <ReviewRow
              label="Files uploaded"
              value={`${uploadedCount} of ${UPLOAD_SPECS.length}`}
            />
          </ReviewSection>

          <ReviewSection title="Consent & Signature">
            <ReviewRow
              label="Tuition Agreement"
              value={g.consent.tuitionAgreement ? "Agreed" : "Not agreed"}
            />
            <ReviewRow
              label="Media Release"
              value={
                g.consent.mediaRelease === "grant" ? "Granted" : "Not granted"
              }
            />
            <ReviewRow
              label="Signed"
              value={
                g.consent.signatureMode === "type"
                  ? g.consent.signatureTypedName
                  : g.consent.signatureDataUrl
                    ? "Signature on file"
                    : ""
              }
            />
            <ReviewRow label="Date" value={g.consent.signatureDate} />
          </ReviewSection>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              // onClick={}
              onClick={() => setSubmitting(true)}
              className={`tpa-no-print ${g.status === "submitted" ? "tpa-btn-primary" : ""}`}
            >
              {submitting ? (
                <>
                  <Loader2 size={15} className="animate-spin" /> Accepting
                  Application
                </>
              ) : (
                <div className="flex flex-nowrap gap-1.5 items-center justify-center">
                  {g.status === "accepted" ? (
                    <>
                      Application Accepted <Check size={15} />
                    </>
                  ) : (
                    <>
                      Accept Application <Check size={15} />
                    </>
                  )}
                </div>
              )}
            </button>

            <button
              type="button"
              onClick={() => window.print()}
              className="tpa-btn-ghost tpa-no-print"
            >
              <Printer size={14} /> Print this review
            </button>
          </div>
        </SectionCard>
      </div>
    </>
  );
}

export default AdmissionAcceptancePage;

//   const g: any = {
//     program: {
//       academicYear: "2026–2027",
//       admissionType: "new",
//       track: "primary",
//       grade: "nursery-one",
//     },
//     student: {
//       firstName: "Nosa",
//       middleName: "Obasuyi",
//       lastName: "Obasuyi",
//       dob: "2021-07-12",
//       gender: "male",
//       primaryLanguage: "",
//       address: {
//         street: "Oka",
//         city: "Benin City",
//         state: "Edo State",
//         postalCode: "67678787",
//       },
//       previousSchool: "",
//     },
//     guardian1: {
//       relation: "Mother",
//       name: "Clement",
//       phone: "890-0900-0909",
//       email: "onaiwusstar@gmail.com",
//       occupation: "erer",
//     },
//     guardian2: { relation: "", name: "", phone: "", email: "", occupation: "" },
//     medical: {
//       emergencyRelation: "Mother",
//       emergencyPhone: "090-9090-9898",
//       allergies: "",
//       conditions: "",
//     },
//     montessori: { attendedBefore: "", interest: "", strengths: "" },
//     uploads: {
//       birthCertificate: {
//         name: "a_1.jpeg",
//         size: 601185,
//         type: "image/jpeg",
//         progress: 100,
//         previewUrl:
//           "blob:http://localhost:5173/c40de5c4-1270-4f1d-bfb9-4b79422b7f56",
//       },
//       passport: null,
//       immunization: null,
//       academicRecords: null,
//     },
//     consent: {
//       tuitionAgreement: true,
//       mediaRelease: "grant",
//       signatureMode: "draw",
//       signatureDataUrl:
//         "data:image/png;base64,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",
//       signatureTypedName: "",
//       signatureDate: "2026-07-28",
//     },
//   };
