"use client";

import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { FaChevronDown } from "react-icons/fa6";
import FaqData from "@/utility/faq-data";

const HelpCenterSection = () => {
  const [accordion, setAccordion] = useState(FaqData);

  const toggleAccordion = (accordionkey) => {
    const updatedAccordions = accordion.map((accord) => {
      if (accord._id === accordionkey) {
        return { ...accord, isOpen: !accord.isOpen };
      } else {
        return { ...accord, isOpen: false };
      }
    });
    setAccordion(updatedAccordions);
  };

  return (
    <>
      <h3 className="heading mb-10">Help Center</h3>
      <Accordion data={accordion} toggle={toggleAccordion} />
    </>
  );
};

const Accordion = ({ data, toggle }) => (
  <>
    {data.map((item) => (
      <div
        key={item._id}
        className={twMerge(
          "border border-solid border-darkAlt rounded-lg overflow-hidden mb-2",
          item.isOpen && "border-primary"
        )}
      >
        <button
          onClick={() => toggle(item._id)}
          className={twMerge(
            "w-full py-3 px-4 text-left flex justify-between items-center transition duration-500 ",
            item.isOpen && "bg-primary text-dark"
          )}
        >
          <span className="font-semibold">{item.title}</span>
          <FaChevronDown
            className={twMerge("rotate-0", !item.isOpen && "rotate-180")}
          />
        </button>
        {item.isOpen && (
          <div className="p-4">
            <p>{item.content}</p>
          </div>
        )}
      </div>
    ))}
  </>
);

export default HelpCenterSection;
