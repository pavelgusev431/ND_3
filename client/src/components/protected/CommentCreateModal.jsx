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
      <h3>Create New Comment</h3>
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
      <form onSubmit={handleSubmit(submitHandler)}>
        <div>
          <input
            type="text"
            placeholder="Comment..."
            {...register("content", {
              required: "This field is required",
              onChange: () => {
                setError("");
                clearErrors("content");
              },
            })}
          />
          {errors.content && 
          <p>
            {errors.content}  
          </p>}
        </div>

        {error.message && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
        <button type="submit">Create comment</button>
      </form>
    </div>
  );
};

export default CommentCreateModal;