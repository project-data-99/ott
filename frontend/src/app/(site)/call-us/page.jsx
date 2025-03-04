import Link from "next/link";

const CallUsPage = () => {
  return (
    <>
      <section className="section"></section>
      <section className="section">
        <div className="container">
          <h3 className="heading mb-5">Call Us</h3>
          <p className="mb-3">
            We're here to help if you need it for the fastest answer to your
            questions, we encourage you to reach out to our customer service.
            Visit the{" "}
            <Link className="text-primary" href="/help-center">
              Help Center
            </Link>{" "}
            for more info or{" "}
            <Link className="text-primary" href="/contact-us">
              contact us
            </Link>
            .
          </p>
          <p>
            If you have a request for a TV show or movie, see{" "}
            <Link className="text-primary" href="/request-tv-shows">
              Request TV shows or movies
            </Link>
            .
          </p>
          <h6 className="mt-5 text-2xl text-light">
            Call Us @
            <Link
              href="tel:9876543210"
              className="text-primary font-bold inline-block ms-4"
            >
              9876543210
            </Link>
          </h6>

          <div className="grid grid-cols-2 gap-7 mt-10">
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

export default CallUsPage;
