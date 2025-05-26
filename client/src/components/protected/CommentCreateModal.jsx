import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { createComment } from "../../helpers/commentCRUD.js";
import { AuthContext } from "../../contexts/AuthContext";

const CommentCreateModal = ({ setShowModal, setUpdate }) => {
  const [error, setError] = useState("");
  const {
    auth: { id },
  } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
  } = useForm();

  const handleClose = () => {
    setShowModal(false);
  };

  const submitHandler = async (data) => {
    try {
      await createComment(data, id);
      setUpdate((update) => update + 1);
      setError("");
      setValue("content", "");
      handleClose();
    } catch (error) {
      setError(error.message || "Failed to create comment");
    }
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-stone-900/50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800">
            Create New Comment
          </h3>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none p-1 rounded-full hover:bg-gray-100 transition duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <form onSubmit={handleSubmit(submitHandler)} className="p-6">
          <div>
            <input
              type="text"
              placeholder="Comment..."
              className="mb-2 w-full"
              {...register("content", {
                required: "This field is required",
                onChange: () => {
                  setError("");
                  clearErrors("content");
                },
              })}
            />
            {errors.content && <p>{errors.content}</p>}
          </div>

          {error.message && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-1 px-4 rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          >
            Create comment
          </button>
        </form>
      </div>
    </div>
  );
};

export default CommentCreateModal;
