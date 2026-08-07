import { Routes, Route } from "react-router-dom";
import AdmissionPage from "../pages/AdmissionPage";
import AdmissionAcceptancePage from "../pages/AdmissionAcceptancePage";
import StudentDataPage from "../pages/StudentDataPage";
import StudentPortalPage from "../pages/StudentPortalPage";

function portalRoutes() {
  return (
    <Routes>
      <Route path="/admission-portal" element={<AdmissionPage />} />
      <Route path="/student/data-page/:studentDataId" element={<StudentDataPage />} />
      <Route path="/student/portal" element={<StudentPortalPage />} />
      <Route path="/admission-acceptance-portal/987623628237/toweradmissionscenter/:admissionNo" element={<AdmissionAcceptancePage />} />
    </Routes>
  );
}

export default portalRoutes;


//  "data": {
//         "id": "635a75ed-75c4-45b8-8f74-7d8b826fa964",
//         "academicYear": "2026–2027",
//         "admissionType": "new",
//         "track": "primary",
//         "grade": "nursery-two",
//         "studentFirstName": "NOSA",
//         "studentMiddleName": "CLEMENT",
//         "studentLastName": "OBASUYI",
//         "studentDob": "2021-07-23",
//         "gender": "male",
//         "address": {
//             "city": "Benin City",
//             "state": "Edo State",
//             "street": "3, Abusomwan Avenue, Ekae II, Off Sapele Road, Benin City.",
//             "postalCode": "300002"
//         },
//         "previousSchool": "Winrose",
//         "guardian1Relation": "Mother",
//         "guardian1Name": "NOSA CLEMENT OBASUYI",
//         "guardian1Phone": "081-0850-5829",
//         "guardian1Email": "nosaclementobasuyi@gmail.com",
//         "guardian1Occupation": "Hhh",
//         "guardian2Relation": null,
//         "guardian2Name": null,
//         "guardian2Phone": null,
//         "guardian2Email": null,
//         "guardian2Occupation": null,
//         "emergencyRelation": "Huhhhh",
//         "emergencyPhone": "668-8855-7775",
//         "allergies": null,
//         "medicalConditions": null,
//         "montessoriAttendedBefore": null,
//         "montessoriInterest": null,
//         "montessoriStrengths": null,
//         "uploads": {
//             "passport": null,
//             "immunization": null,
//             "academicRecords": null,
//             "birthCertificate": null
//         },
//         "tuitionAgreement": true,
//         "mediaRelease": "grant",
//         "signatureMode": "draw",
//         "signatureTypedName": null,
//         "signatureImageUrl": null,
//         "signatureDate": "2026-07-30",
//         "status": "submitted",
//         "createdAt": "2026-07-30T09:25:11.859Z",
//         "updatedAt": "2026-07-30T09:25:11.859Z"
//     }
// }