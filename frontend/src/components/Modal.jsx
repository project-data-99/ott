"use client";

import { RxCross2 } from "react-icons/rx";
import { useDispatch } from "react-redux";

import { hideModal } from "@/store/slices/modalSlice";

const Modal = ({ title = "Modal Title", children }) => {
  const dispatch = useDispatch();

  const handleModalClose = () => dispatch(hideModal());

  return (
    <div className="fixed overflow-y-auto top-0 left-0 h-full w-full z-40 bg-[#00000091] backdrop-blur-sm">
      <div className="absolute top-14 left-2/4 -translate-x-2/4 w-11/12 max-w-[800px] bg-dark border border-solid border-primary p-10 rounded-lg">
        <button
          className="absolute top-3 -right-8 w-8 h-8 flex items-center justify-center bg-primary rounded-e-lg text-dark text-lg"
          onClick={handleModalClose}
        >
          <RxCross2 />
        </button>
        <h4 className="text-2xl font-bold text-light mb-7">{title}</h4>
        {children}
      </div>
    </div>
  );
};

export default Modal;
