import Image from "next/image";

import Banner from "@/static/images/watch-now-banner.jpg";

const WatchNow = () => {
  return (
    <>
      <div className="relative w-full h-full before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-dark">
        <Image src={Banner} alt="Banner" className="relative z-10" />
      </div>

      <section className="section"></section>
      <section className="section">
        <div className="container">
          <div className="flex">
            <div className="w-full md:w-2/3">
              <h1 className="text-3xl font-bold">Watch Now</h1>
              <p className="mt-5 text-gray-600">
                Discover the latest movies, TV shows, and more. Choose your
                favorite genre, platform, or streaming service.
              </p>
            </div>
            <div className="w-full md:w-1/3">
              <div className="mt-10">
                <button className="button">Start Watching</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default WatchNow;
