"use client";

import axios from "axios";
import Link from "next/link";
import { useState, useEffect } from "react";
import { GoPencil, GoTrash } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";

import { Modal } from "@/components";
import { showAlert } from "@/store/slices/alertSlice";
import { showModal } from "@/store/slices/modalSlice";
import { UpdateCategoryForm } from "@/components/dashboard";

const Category = () => {
  const dispatch = useDispatch();
  const modal = useSelector((state) => state.modal);

  // Fetch Category
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Handle Open Modal
  const handleOpenModal = (categoryId) => {
    setSelectedCategory(categoryId);
    dispatch(showModal());
  };

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
  }, [modal.visible]);

  // Handle Delete Category
  const handleDeleteCategory = async (categoryId) => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/categories/${categoryId}`,
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
          message: "Category deleted successfully",
        })
      );
      fetchCategories();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between gap-10 mb-10">
        <h4 className="text-2xl font-bold">Category</h4>
        <Link
          href="/dashboard/category/add"
          className="button button-sm button-primary"
        >
          Add Category
        </Link>
      </div>

      {!categories && <h3 className="heading">No Categories</h3>}

      {categories && (
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
                {categories.map((category) => (
                  <tr
                    key={category._id}
                    className="border-b border-solid border-darkAlt"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {category.name}
                    </th>
                    <td className="px-6 py-4">{category.description}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-5">
                        <button>
                          <GoPencil
                            onClick={() => handleOpenModal(category._id)}
                            className="text-primary"
                          />
                        </button>
                        <button
                          onClick={() => handleDeleteCategory(category._id)}
                        >
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
        <Modal title="Update Category">
          <UpdateCategoryForm categoryId={selectedCategory} />
        </Modal>
      )}
    </>
  );
};

export default Category;
