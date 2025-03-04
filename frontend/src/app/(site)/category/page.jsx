"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/categories/all`
      );
      setCategories(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      <section className="section"></section>
      <section className="section">
        <div className="container">
          {!categories && <h3 className="heading">No Categories</h3>}

          {categories && (
            <>
              <h1 className="heading mb-10">Categories</h1>

              <div className="grid grid-cols-3 gap-5">
                {categories.map((category) => (
                  <Link
                    href={`/category/${category?.slug}`}
                    key={category._id}
                    className="p-4 bg-primary rounded"
                  >
                    <h4 className="text-dark text-2xl font-semibold mb-2">
                      {category.name}
                    </h4>
                    <p className="text-darkAlt">{category.description}</p>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default CategoryPage;
