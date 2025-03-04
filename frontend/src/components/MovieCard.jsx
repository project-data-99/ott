import Image from "next/image";
import Link from "next/link";
import { FaRegHeart } from "react-icons/fa6";

import { DummyPoster } from "@/static/images";

const MovieCard = ({ item }) => {
  return (
    <>
      <div className="relative rounded-lg overflow-hidden group cursor-pointer">
        <div className="absolute z-20 h-full w-full flex flex-col justify-end bg-[linear-gradient(to_top,#0c0c0c,#0c0c0cd4,transparent)] p-5 transition duration-500 translate-y-full group-hover:translate-y-0">
          <h5 className="block w-11/12 mb-1 text-lg font-semibold whitespace-nowrap overflow-hidden text-ellipsis text-light">
            {item.title}
          </h5>
          <h6 className="mb-4 text-sm">
            {item.year} - {item.runtime}
          </h6>
          <div className="flex items-stretch gap-2">
            <Link href="/watch-now" className="button-sm">
              Watch Now
            </Link>
            <Link
              href="/watch-now"
              className="button-sm !bg-dark !text-primary"
            >
              <FaRegHeart />
            </Link>
          </div>
        </div>
        <div className="relative z-10 trnsition duration-500 group-hover:scale-105">
          <Image
            src={item.poster || DummyPoster}
            alt={item.title}
            width="300"
            height="600"
            title={item.title}
          />
        </div>
      </div>
    </>
  );
};

export default MovieCard;
