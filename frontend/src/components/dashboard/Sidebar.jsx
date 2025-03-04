import Image from "next/image";
import Link from "next/link";

import { Logo } from "@/static/images";

const Sidebar = () => {
  return (
    <aside className="db-sidebar">
      <Link href="/dashboard">
        <Image src={Logo} alt="Spectraflix" width="200" height="100" />
      </Link>

      <ul className="mt-10">
        <li className="mb-4">
          <Link href="/dashboard" className="text-lightAlt">
            Dashboard
          </Link>
        </li>
        <li className="mb-4">
          <Link href="/dashboard/video" className="text-lightAlt">
            Video
          </Link>
        </li>
        <li className="mb-4">
          <Link href="/dashboard/category" className="text-lightAlt">
            Category
          </Link>
        </li>
        <li className="mb-4">
          <Link href="/dashboard/genre" className="text-lightAlt">
            Genre
          </Link>
        </li>
        <li className="mb-4">
          <Link href="/dashboard/cast" className="text-lightAlt">
            Cast
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
