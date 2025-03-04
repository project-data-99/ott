"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import "swiper/css";
import "swiper/css/pagination";

import { MovieCard } from ".";

const SwiperSlider = ({ list, heading = "Latest Movies", sectionId }) => {
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const breakpointsResponsive = {
    "@0.00": {
      slidesPerView: 1,
      spaceBetween: 10,
    },
    "@0.75": {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    "@1.00": {
      slidesPerView: 3,
      spaceBetween: 10,
    },
    "@1.50": {
      slidesPerView: 5,
      spaceBetween: 15,
    },
  };

  const handleSwiperEvents = (swiper) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  return (
    <>
      <div className="flex items-center justify-between gap-5 mb-10">
        <h3 className="heading">{heading}</h3>
        <div className="flex justify-end items-center gap-2">
          <button
            className={`${sectionId}-prev w-8 h-8 flex items-center justify-center rounded-full bg-dark border border-solid border-primary text-sm text-lightAlt transition duration-500 hover:bg-primary hover:text-dark disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            <FaChevronLeft />
          </button>
          <button
            className={`${sectionId}-next w-8 h-8 flex items-center justify-center rounded-full bg-dark border border-solid border-primary text-sm text-lightAlt transition duration-500 hover:bg-primary hover:text-dark disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            <FaChevronRight />
          </button>
        </div>
      </div>

      <Swiper
        spaceBetween={15}
        slidesPerView={5}
        modules={[Navigation]}
        autoplay={{
          delay: 2000,
          loop: true,
        }}
        navigation={{
          nextEl: `.${sectionId}-next`,
          prevEl: `.${sectionId}-prev`,
        }}
        breakpoints={breakpointsResponsive}
        onSlideChange={(swiper) => handleSwiperEvents(swiper)}
        onInit={(swiper) => handleSwiperEvents(swiper)}
      >
        {list.map((item) => (
          <SwiperSlide key={item._id}>
            <MovieCard item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default SwiperSlider;
