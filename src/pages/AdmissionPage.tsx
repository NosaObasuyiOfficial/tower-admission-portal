import Logo from "../assets/images/towerlogo.png";
import AdmissionForm from "../components/AdmissionForm";
import { Phone, Mail, MapPin } from "lucide-react";

function AdmissionPage() {
  return (
    <>
      <div className="flex flex-col min-h-screen h-full w-full overflow-x-hidden">
        <section className="hero">
          <div className="overlay"></div>

          <div className="hero-content">
            <div className="flex flex-col items-start justify-start gap-1">
              <div className="flex flex-wrap items-end justify-end gap-2 w-auto pl-5 md:pl-10 lg:pl-20 pt-6">
                <img
                  className="w-8.75 h-8.75 bg-white rounded-full"
                  src={Logo}
                  alt="Tower Logo"
                />
                <p className="capitalize font-poppinsLight text-sm">
                  govt. approved
                </p>
              </div>
              <div className="w-auto pl-5 md:pl-10 lg:pl-20 pb-6 border-l-8 border-[#F2B5C0]">
                <div className="w-auto flex flex-col">
                  <p className="text-[#F2B5C0] leading-7 md:leading-9 uppercase font-PoppinsBold border-t border-[#ffffff] w-auto text-[1.4rem] tracking-widest">
                    tower preparatory academy admission portal
                  </p>

                  <div className="flex flex-wrap gap-0 md:gap-1 text-[13px] mb-auto pt-5">
                    <div className="flex flex-nowrap gap-1 items-center">
                      <MapPin size={20} />
                      <p className="leading-5 md:leading-6 border-r border-[#ffffff] pr-2">
                        2nd East Circular Road, Benin City, Nigeria
                      </p>
                    </div>
                    <div className="flex flex-nowrap gap-1 pl-2 items-center">
                      <Phone size={18} />
                      <p className="leading-5 md:leading-6 border-r border-[#ffffff] pr-2">
                        +234 806 313 4889
                      </p>
                    </div>
                    <div className="flex flex-nowrap gap-1 pl-2 items-center">
                      <Mail size={18} />
                      <p className="leading-5 md:leading-6">
                        towerpreparatoryacademy@gmail.com
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="h-full grow">
          <AdmissionForm />
        </div>
      </div>
    </>
  );
}

export default AdmissionPage;
