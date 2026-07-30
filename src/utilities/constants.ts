export const ACADEMIC_YEARS = ["2026\u20132027", "2027\u20132028"];

export const GRADE_OPTIONS = [
  { value: "toddler", label: "Toddler" },
  { value: "nursery-one", label: "Nursery 1" },
  { value: "nursery-two", label: "Nursery 2" },
  { value: "Nursery-three", label: "Nursery 3" },
  { value: "primary-one", label: "Primary 1" },
];

export const RELATION_OPTIONS = ["Mother", "Father", "Legal Guardian"];

export const US_STATES = ["", "Edo State"];
export const CITIES = ["", "Benin City"];

export const UPLOAD_SPECS = [
  { key: "birthCertificate", label: "Birth Certificate", required: false },
  { key: "passport", label: "Passport", required: false },
  { key: "immunization", label: "Immunization Record", required: false },
  { key: "academicRecords", label: "Academic Records", required: false },
];

export const MAX_FILE_MB = 10;
export const ACCEPTED_TYPES = ["application/pdf", "image/png", "image/jpeg"];





export const todayISO = () => new Date().toISOString().slice(0, 10);

export const initialFormData = {
  program: { academicYear: "", admissionType: "", track: "", grade: null },
  student: {
    firstName: "",
    middleName: "",
    lastName: "",
    dob: "",
    gender: "",
    primaryLanguage: "",
    address: { street: "", city: "", state: "", postalCode: "" },
    previousSchool: "",
  },
  guardian1: { relation: "", name: "", phone: "", email: "", occupation: "" },
  guardian2: { relation: "", name: "", phone: "", email: "", occupation: "" },
  medical: {
    emergencyRelation: "",
    emergencyPhone: "",
    allergies: "",
    conditions: "",
  },
  montessori: { attendedBefore: "", interest: "", strengths: "" },
  uploads: {
    birthCertificate: null,
    passport: null,
    immunization: null,
    academicRecords: null,
  },
  consent: {
    tuitionAgreement: false,
    mediaRelease: "",
    signatureMode: "draw",
    signatureDataUrl: null,
    signatureTypedName: "",
    signatureDate: todayISO(),
  },
};
