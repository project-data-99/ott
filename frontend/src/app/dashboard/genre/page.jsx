"use client";

import axios from "axios";
import Link from "next/link";
import { useState, useEffect } from "react";
import { GoPencil, GoTrash } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";

import { Modal } from "@/components";
import { showAlert } from "@/store/slices/alertSlice";
import { showModal } from "@/store/slices/modalSlice";
import { UpdateGenreForm } from "@/components/dashboard";

const Genre = () => {
  const dispatch = useDispatch();
  const modal = useSelector((state) => state.modal);

  // Fetch Genre
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);

  // Handle Open Modal
  const handleOpenModal = (genreId) => {
    setSelectedGenre(genreId);
    dispatch(showModal());
  };

  const fetchGenres = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/genres/all`
      );
      setGenres(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchGenres();
  }, [modal.visible]);

  // Handle Delete Genres
  const handleDeleteGenre = async (genreId) => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/genres/${genreId}`,
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
          message: "Genres deleted successfully",
        })
      );
      fetchGenres();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between gap-10 mb-10">
        <h4 className="text-2xl font-bold">Genres</h4>
        <Link
          href="/dashboard/genre/add"
          className="button button-sm button-primary"
        >
          Add Genre
        </Link>
      </div>

      {!genres && <h3 className="heading">No Categories</h3>}

      {genres && (
        <>
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right">
              <thead className="text-xs bg-darkAlt uppercase">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Description
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {genres.map((genre) => (
                  <tr
                    key={genre._id}
                    className="border-b border-solid border-darkAlt"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {genre.name}
                    </th>
                    <td className="px-6 py-4">{genre.description}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-5">
                        <button>
                          <GoPencil
                            onClick={() => handleOpenModal(genre._id)}
                            className="text-primary"
                          />
                        </button>
                        <button onClick={() => handleDeleteGenre(genre._id)}>
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
        <Modal title="Update Genre">
          <UpdateGenreForm genreId={selectedGenre} />
        </Modal>
      )}
    </>
  );
};

export default Genre;
