"use client";

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { GoPencil, GoTrash } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";

import { DummyUser } from "@/static/images";
import { Modal } from "@/components";
import { showAlert } from "@/store/slices/alertSlice";
import { showModal } from "@/store/slices/modalSlice";
import { UpdateCastForm } from "@/components/dashboard";

const Cast = () => {
  const dispatch = useDispatch();
  const modal = useSelector((state) => state.modal);

  // Fetch Genre
  const [casts, setCasts] = useState([]);
  const [selectedCast, setSelectedCast] = useState(null);

  // Handle Open Modal
  const handleOpenModal = (castId) => {
    setSelectedCast(castId);
    dispatch(showModal());
  };

  const fetchCast = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/casts/all`
      );

      setCasts(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCast();
  }, [modal.visible]);

  // Handle Delete Cast
  const handleDeleteCast = async (castId) => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/casts/${castId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      dispatch(
        showAlert({
          type: "success",
          message: "Cast deleted successfully",
        })
      );
      fetchCast();
    } catch (error) {
      console.error(error);
    }
  };

  const imageUrl = (item) => {
    return item
      ? `http://localhost:8000/${item
          .replace(/\\/g, "/")
          .replace("public/", "")}`
      : DummyUser;
  };

  return (
    <>
      <div className="flex items-center justify-between gap-10 mb-10">
        <h4 className="text-2xl font-bold">Casts</h4>
        <Link
          href="/dashboard/cast/add"
          className="button button-sm button-primary"
        >
          Add Cast
        </Link>
      </div>

      {!casts && <h3 className="heading">No Casts</h3>}

      {casts && (
        <>
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right">
              <thead className="text-xs bg-darkAlt uppercase">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {casts.map((cast) => (
                  <tr
                    key={cast._id}
                    className="border-b border-solid border-darkAlt"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      <div className="flex items-center justify-start gap-2">
                        <div className="relative w-14 h-14 rounded overflow-hidden">
                          <Image
                            src={imageUrl(cast.cast_avatar)}
                            alt={cast.name}
                            fill
                          />
                        </div>
                        <span>{cast.name}</span>
                      </div>
                    </th>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-5">
                        <button>
                          <GoPencil
                            onClick={() => handleOpenModal(cast._id)}
                            className="text-primary"
                          />
                        </button>
                        <button onClick={() => handleDeleteCast(cast._id)}>
                          <GoTrash className="text-red-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {modal.visible && (
        <Modal title="Update Cast">
          <UpdateCastForm castId={selectedCast} />
        </Modal>
      )}
    </>
  );
};

export default Cast;
