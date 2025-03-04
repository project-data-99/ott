import Image from "next/image";

import {
  Feature01,
  Feature02,
  Feature03,
  Feature04,
} from "@/static/images/icons";

const FeaturesSection = () => {
  return (
    <section className="section">
      <div className="container">
        <div className="grid grid-cols-4 gap-5">
          <div className="flex items-center justify-start gap-5">
            <Image
              src={Feature01}
              width="50"
              height="50"
              alt="Exclusive Spectra Originals"
            />
            <h6 className="text-light text-[16px] font-medium">
              Exclusive Spectra <br /> Originals
            </h6>
          </div>
          <div className="flex items-center justify-start gap-5">
            <Image
              src={Feature02}
              width="50"
              height="50"
              alt="Global & Regional Content"
            />
            <h6 className="text-light text-[16px] font-medium">
              Global & Regional <br /> Content
            </h6>
          </div>
          <div className="flex items-center justify-start gap-5">
            <Image
              src={Feature03}
              width="50"
              height="50"
              alt="High-Quality Streaming"
            />
            <h6 className="text-light text-[16px] font-medium">
              High-Quality <br /> Streaming
            </h6>
          </div>
          <div className="flex items-center justify-start gap-5">
            <Image
              src={Feature04}
              width="50"
              height="50"
              alt="For phone, tablet, laptop and TV"
            />
            <h6 className="text-light text-[16px] font-medium">
              For phone, tablet, <br /> laptop and TV
            </h6>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
