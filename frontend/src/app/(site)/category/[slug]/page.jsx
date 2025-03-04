"use client";

import axios from "axios";
import { useState, useEffect, use } from "react";

import { MovieCard } from "@/components";
import DummyMovieData from "@/utility/dummy-movie-data";

const CategoryDetailPage = ({ params }) => {
  const unwrappedParams = use(params);
  const slug = unwrappedParams.slug;

  const [category, setCategory] = useState(null);

  const fetchCategoryDetail = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/categories/slug/${slug}`
      );

      setCategory(response.data.data);
    } catch (error) {
      if (error.response) {
        const apiError = error.response.data.message || "An error occured";
        console.log(apiError);
      } else if (error.request) {
        const apiError =
          error.response.data.message || "No response from server";
        console.log(apiError);
      } else {
        const apiError =
          error.response.data.message ||
          "An error occurred while making the request";
        console.log(apiError);
      }
    }
  };

  useEffect(() => {
    fetchCategoryDetail();
  }, []);

  return (
    <>
      <section className="section"></section>
      <section className="section">
        <div className="container">
          {!category && <p>Loading...</p>}
          {category && (
            <>
              <h4 className="heading mb-3">{category.name}</h4>
              <p className="mb-10">{category?.description}</p>

              <div className="grid grid-cols-5 gap-5">
                {DummyMovieData.map((data) => (
                  <MovieCard key={data._id} item={data} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default CategoryDetailPage;
