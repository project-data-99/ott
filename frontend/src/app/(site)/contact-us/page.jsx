import Link from "next/link";

import { FormInput, FormTextarea } from "@/components";

const ContactPage = () => {
  return (
    <>
      <section className="section"></section>
      <section className="section">
        <div className="container">
          <div className="grid grid-cols-12 gap-0 md:gap-5">
            <div className="col-span-5">
              <div className="p-5 border border-solid border-darkAlt rounded-lg">
                <form>
                  <h3 className="text-2xl font-bold text-light mb-1">
                    Get In Touch
                  </h3>
                  <p className="mb-8">You can reach us any time.</p>

                  <FormInput
                    label="Full Name"
                    type="test"
                    name="fullName"
                    placeholder="Full Name"
                    required
                    className="mb-5"
                  />

                  <FormInput
                    label="Email"
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                    className="mb-5"
                  />

                  <FormInput
                    label="Phone Number"
                    type="tel"
                    name="phoneNumber"
                    placeholder="Phone Number"
                    required
                    className="mb-5"
                  />

                  <FormTextarea
                    label="Message"
                    name="message"
                    placeholder="Message"
                    required
                    className="mb-5"
                  />

                  <button className="button" type="submit">
                    Send Message
                  </button>
                </form>
              </div>
            </div>

            <div className="col-span-7">
              <h3 className="heading mb-5">Contact Us</h3>
              <p className="mb-3">
                Email, call, or complete the form to learn how Snappy can solve
                your messaging problem.
              </p>
              <p className="mb-2">
                <Link
                  href="mailto:info@spectraflix.com"
                  className="text-primary"
                >
                  info@spectraflix.com
                </Link>
              </p>
              <p>
                <Link href="tel:9876543210" className="text-primary">
                  9876-5432-10
                </Link>
              </p>

              <div className="grid grid-cols-2 gap-5 mt-10">
                <div>
                  <h5 className="text-lg text-light font-bold">
                    Customer Support
                  </h5>
                  <p>
                    Our support team is available around the clock to address
                    any concerns or queries you may have.
                  </p>
                </div>
                <div>
                  <h5 className="text-lg text-light font-bold">
                    Feedback and Suggestions
                  </h5>
                  <p>
                    We value your feedback and are continuously working to
                    improve Spectraflix. Your input is crucial in shaping the
                    future of Spectraflix.
                  </p>
                </div>
                <div>
                  <h5 className="text-lg text-light font-bold">
                    Media Inquiries
                  </h5>
                  <p>
                    For media-related questions or press inquiries, please
                    contact us at{" "}
                    <Link href="mailto:info@spectraflix.com">
                      info@spectraflix.com
                    </Link>
                    .
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
