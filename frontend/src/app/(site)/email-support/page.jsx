import { FormInput } from "@/components";

const EmailSupportPage = () => {
  return (
    <>
      <section className="section"></section>
      <section className="section">
        <div className="container">
          <div className="w-3/5 mx-auto text-center">
            <h1 className="heading mb-4">Email Support</h1>
            <p className="mb-10">
              If you need help with your account, order, or any other matter
              related to your OTT Platform subscription, please don't hesitate
              to contact our support team. We'll be happy to help you.
            </p>
            <form className="flex items-center justify-center gap-5">
              <FormInput
                type="email"
                name="email"
                placeholder="Email"
                className="w-3/5"
              />
              <button className="button w-1/5" type="button">
                Get Help
              </button>
            </form>
          </div>

          <hr className="my-20 bg-darkAlt opacity-100 h-[1px]" />

          <div className="grid grid-cols-2 gap-7 text-center">
            <div className="rounded-lg bg-darkAlt p-4">
              <h5 className="text-xl font-semibold text-light mb-4">
                Contractual partner and point of contact
              </h5>
              <address>
                <b className="block mb-2 text-primary font-medium">
                  Spectraflix Pvt. Ltd.
                </b>
                Telli Gali ,Radha Appartment, 206, <br />
                Andhri (East), Mumbai 400051, India.
              </address>
            </div>
            <div className="rounded-lg bg-darkAlt p-4">
              <h5 className="text-xl font-semibold text-light mb-4">
                Data Controller
              </h5>
              <address>
                <b className="block mb-2 text-primary font-medium">
                  Spectraflix Pvt. Ltd.
                </b>
                Telli Gali ,Radha Appartment, 206, <br />
                Andhri (East), Mumbai 400051, India.
              </address>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default EmailSupportPage;
