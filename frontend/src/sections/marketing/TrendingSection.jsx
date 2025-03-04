import { SwiperSlider } from "@/components";
import DummyMovieData from "@/utility/dummy-movie-data";

const TrendingSection = () => {
  return (
    <section className="section">
      <div className="container">
        <SwiperSlider
          list={DummyMovieData}
          heading="Trending Top 10"
          sectionId="trending-top-10"
        />
      </div>
    </section>
  );
};

export default TrendingSection;
