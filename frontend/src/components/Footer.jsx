import Link from "next/link";
import { BsTwitterX, BsInstagram } from "react-icons/bs";
import { SlSocialFacebook, SlSocialYoutube } from "react-icons/sl";

const question_links = [
  {
    title: "FAQ",
    link: "/faq",
  },
  {
    title: "Help Center",
    link: "/help-center",
  },
  {
    title: "Terms of Use",
    link: "/terms-of-use",
  },
  {
    title: "Corporation Information",
    link: "/corperation-information",
  },
  {
    title: "Cookie Preferences",
    link: "/cookie-preferences",
  },
];

const about_links = [
  {
    title: "Account",
    link: "/profile",
  },
  {
    title: "Way to Watch",
    link: "/way-to-watch",
  },
  {
    title: "Privacy",
    link: "/privacy",
  },
  {
    title: "Only on Spectraflix",
    link: "/only-on-spectraflix",
  },
];

const contact_links = [
  {
    title: "Email Support",
    link: "/email-support",
  },
  {
    title: "Call Us",
    link: "/call-us",
  },
  {
    title: "Head Office",
    link: "/head-office",
  },
];

const social_links = [
  {
    title: "Facebook",
    link: "#",
    icon: <SlSocialFacebook />,
  },
  {
    title: "Twitter",
    link: "#",
    icon: <BsTwitterX />,
  },
  {
    title: "Instagram",
    link: "#",
    icon: <BsInstagram />,
  },
  {
    title: "YouTube",
    link: "#",
    icon: <SlSocialYoutube />,
  },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="section-lg">
      <div className="container">
        <div className="grid grid-cols-4 gap-5">
          <div className="col">
            <h6 className="text-lg font-medium text-light mb-5">Question?</h6>
            <ul>
              {question_links.map((item) => (
                <li key={item.title} className="mb-2">
                  <Link
                    href={item.link}
                    className="text-sm text-lightAlt transition duration-500 hover:text-primary"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="col">
            <h6 className="text-lg font-medium text-light mb-5">About</h6>
            <ul>
              {about_links.map((item) => (
                <li key={item.title} className="mb-2">
                  <Link
                    href={item.link}
                    className="text-sm text-lightAlt transition duration-500 hover:text-primary"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="col">
            <h6 className="text-lg font-medium text-light mb-5">Contact Us</h6>
            <ul>
              {contact_links.map((item) => (
                <li key={item.title} className="mb-2">
                  <Link
                    href={item.link}
                    className="text-sm text-lightAlt transition duration-500 hover:text-primary"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="col">
            <h6 className="text-lg font-medium text-light mb-5">
              Social Media
            </h6>
            <ul className="flex items-center gap-3 flex-wrap">
              {social_links.map((item) => (
                <li key={item.title}>
                  <Link
                    href={item.link}
                    target="_blank"
                    className="text-xl text-lightAlt transition duration-500 hover:text-primary"
                  >
                    {item.icon}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <hr className="bg-darkAlt h-[1px] my-7" />

        <p className="text-sm text-lightAlt text-center">
          &copy; {year}{" "}
          <Link
            href="https://arabicitmedia.com/"
            target="_blank"
            className="text-light transition duration-500 hover:text-primary"
          >
            Arabic IT Media Pvt Ltd
          </Link>
          . All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
