/* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState, useEffect } from "react";
import {
  Printer,
  //   School,
} from "lucide-react";
import { ReviewRow, Tokens } from "../components/AdmissionForm";
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
};
const UPLOAD_SPECS = [
  { key: "birthCertificate", label: "Birth Certificate", required: false },
  { key: "passport", label: "Passport", required: false },
  { key: "immunization", label: "Immunization Record", required: false },
  { key: "academicRecords", label: "Academic Records", required: false },
];

const GRADE_OPTIONS = [
  { value: "toddler", label: "Toddler" },
  { value: "nursery-one", label: "Nursery 1" },
  { value: "nursery-two", label: "Nursery 2" },
  { value: "Nursery-three", label: "Nursery 3" },
  { value: "primary-one", label: "Primary 1" },
];

function AdmissionAcceptancePage() {

      const g:any = {};
  const gradeLabel = GRADE_OPTIONS.find(
    (o) => o.value === g.program.grade,
  )?.label;
  const uploadedCount = UPLOAD_SPECS.filter(
    (s) => g.uploads[s.key] && !g.uploads[s.key].error,
  ).length;

  return (
   <>
     <div className="tpa-root min-h-screen">
         <Tokens />
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
            g.program.track === "montessori" ? "Montessori" : "Primary School"
          }
        />
        <ReviewRow label="Grade / Level" value={gradeLabel} />
      </ReviewSection>

      <ReviewSection title="Student">
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

      <ReviewSection
        title="Documents"
      >
        <ReviewRow
          label="Files uploaded"
          value={`${uploadedCount} of ${UPLOAD_SPECS.length}`}
        />
      </ReviewSection>

      <ReviewSection
        title="Consent & Signature"
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
                : ""
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
      </div>
   </>
  )
}

export default AdmissionAcceptancePage;