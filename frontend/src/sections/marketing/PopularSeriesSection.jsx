import { SwiperSlider } from "@/components";
import DummyMovieData from "@/utility/dummy-movie-data";

const PopularSeriesSection = () => {
  return (
    <section className="section">
      <div className="container">
        <SwiperSlider
          list={DummyMovieData}
          heading="Popular Web Series"
          sectionId="popular-web-series"
        />
      </div>
    </section>
  );
};

export default PopularSeriesSection;
