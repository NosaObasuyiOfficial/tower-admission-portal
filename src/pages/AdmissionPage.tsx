import AdmissionForm from "../components/AdmissionForm";
import HeroSection from "../components/HeroSection";

function AdmissionPage() {
  return (
    <>
      <div className="flex flex-col min-h-screen h-full w-full overflow-x-hidden">
        <HeroSection portalName={"admission"} />

        <div className="h-full grow">
          <AdmissionForm />
        </div>
      </div>
    </>
  );
}

export default AdmissionPage;
