import { SwiperSlider } from "@/components";
import DummyMovieData from "@/utility/dummy-movie-data";

const TrendingTvSection = () => {
  return (
    <section className="section">
      <div className="container">
        <SwiperSlider
          list={DummyMovieData}
          heading="Trending TV Series"
          sectionId="trending-tv-series"
        />
      </div>
    </section>
  );
};

export default TrendingTvSection;
