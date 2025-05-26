import { useState } from "react";
import CommentCreateModal from "./CommentCreateModal.jsx";
import CommentList from "./CommentList.jsx";
import logout from "../../helpers/logout.js";
import {useNavigate} from "react-router";

const Comments = () => {
  const [showModal, setShowModal] = useState(false);
  const [update, setUpdate] = useState(0);
  const goBack = useNavigate();

  const handleCommentCreate = () => {
    setShowModal(true);
  };

  const handleLogout = async () => {
    await logout();
    goBack("/");
  }

  return (
    <div className="w-full flex flex-col items-center mt-5 gap-1">
      <header>
        <h2 className="text-5xl italic font-bold">Comments</h2>
      </header>
      <div className="w-1/2 flex justify-end">
        <button
          onClick={handleLogout}
          className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-1 px-4 rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
        >
          Logout
        </button>
      </div>
      <div className="w-1/2 flex justify-end">
        <button
          onClick={handleCommentCreate}
          className="bg-red-500 hover:bg-red-600 text-white font-medium py-1 px-4 rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
        >
          Add +
        </button>
      </div>
      <main className="w-2/3">
        <CommentList update={update} setUpdate={setUpdate} />
      </main>
      {showModal && (
        <CommentCreateModal setShowModal={setShowModal} setUpdate={setUpdate} />
      )}
    </div>
  );
};

export default Comments;
