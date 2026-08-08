/* eslint-disable @typescript-eslint/no-explicit-any */
export const transformData = (apiData: any) => {
  const transformedData = {
    studentDataId: apiData.id,
    
    program: {
      academicYear: apiData.academicYear,
      admissionType: apiData.admissionType,
      track: apiData.track,
      grade: apiData.grade,
    },

    student: {
      firstName: apiData.studentFirstName,
      middleName: apiData.studentMiddleName,
      lastName: apiData.studentLastName,
      dob: apiData.studentDob,
      gender: apiData.gender,
      primaryLanguage: apiData.primaryLanguage ?? "",
      address: {
        street: apiData.address?.street ?? "",
        city: apiData.address?.city ?? "",
        state: apiData.address?.state ?? "",
        postalCode: apiData.address?.postalCode ?? "",
      },
      previousSchool: apiData.previousSchool ?? "",
    },

    guardian1: {
      relation: apiData.guardian1Relation ?? "",
      name: apiData.guardian1Name ?? "",
      phone: apiData.guardian1Phone ?? "",
      email: apiData.guardian1Email ?? "",
      occupation: apiData.guardian1Occupation ?? "",
    },

    guardian2: {
      relation: apiData.guardian2Relation ?? "",
      name: apiData.guardian2Name ?? "",
      phone: apiData.guardian2Phone ?? "",
      email: apiData.guardian2Email ?? "",
      occupation: apiData.guardian2Occupation ?? "",
    },

    medical: {
      emergencyRelation: apiData.emergencyRelation ?? "",
      emergencyPhone: apiData.emergencyPhone ?? "",
      allergies: apiData.allergies ?? "",
      conditions: apiData.medicalConditions ?? "",
    },

    montessori: {
      attendedBefore: apiData.montessoriAttendedBefore ?? "",
      interest: apiData.montessoriInterest ?? "",
      strengths: apiData.montessoriStrengths ?? "",
    },

    uploads: {
      birthCertificate: apiData.uploads?.birthCertificate
        ? {
            name: apiData.uploads.birthCertificate.split("/").pop(),
            url: apiData.uploads.birthCertificate,
            previewUrl: apiData.uploads.birthCertificate,
            progress: 100,
            size: 0,
            type: "",
          }
        : null,

      passport: apiData.uploads?.passport
        ? {
            name: apiData.uploads.passport.split("/").pop(),
            url: apiData.uploads.passport,
            previewUrl: apiData.uploads.passport,
            progress: 100,
            size: 0,
            type: "",
          }
        : null,

      immunization: apiData.uploads?.immunization
        ? {
            name: apiData.uploads.immunization.split("/").pop(),
            url: apiData.uploads.immunization,
            previewUrl: apiData.uploads.immunization,
            progress: 100,
            size: 0,
            type: "",
          }
        : null,

      academicRecords: apiData.uploads?.academicRecords
        ? {
            name: apiData.uploads.academicRecords.split("/").pop(),
            url: apiData.uploads.academicRecords,
            previewUrl: apiData.uploads.academicRecords,
            progress: 100,
            size: 0,
            type: "",
          }
        : null,
    },

    consent: {
      tuitionAgreement: apiData.tuitionAgreement,
      mediaRelease: apiData.mediaRelease,
      signatureMode: apiData.signatureMode,
      signatureDataUrl: apiData.signatureImageUrl ?? "yes",
      signatureTypedName: apiData.signatureTypedName ?? "yes",
      signatureDate: apiData.signatureDate,
    },

    status: apiData.status,
  };

  return transformedData;
};
