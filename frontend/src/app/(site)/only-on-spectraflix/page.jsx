import { MovieCard } from "@/components";
import DummyMovieData from "@/utility/dummy-movie-data";

const OnlyOnSpectraflixPage = () => {
  return (
    <>
      <section className="section"></section>
      <section className="section">
        <div className="container">
          <h1 className="heading mb-10">Only On Spectraflix</h1>
          <div className="grid grid-cols-5 gap-5">
            {DummyMovieData.map((data) => (
              <MovieCard key={data._id} item={data} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default OnlyOnSpectraflixPage;
