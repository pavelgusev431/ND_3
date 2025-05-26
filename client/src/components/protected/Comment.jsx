import CommentEditModal from "./CommentEditModal.jsx";
import CommentDeleteModal from "./CommentDeleteModal.jsx";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext.jsx";
import { getUserById } from "../../helpers/getUser.js";

const Comment = ({ comment, setUpdate }) => {
  const { id, userId, content } = comment;
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [username, setUsername] = useState("");

  const { auth } = useContext(AuthContext);

  useEffect(() => {
    const fetchUsername = async () => {
      const fetchedUsername = await getUserById(userId);
      setUsername(fetchedUsername);
    };
    fetchUsername();
  }, [userId]);

  const handleEdit = () => {
    setShowEdit(!showEdit);
  };
  const handleDelete = () => {
    setShowDelete(!showDelete);
  };

  return (
    <div className="flex flex-row justify-start w-full items-center rounded-md bg-slate-100 p-3 m-1">
      <div className="font-bold text-gray-700 text-xl w-1/5">{username}</div>
      <div className="text-gray-600 w-3/5">{content}</div>
      {auth.id === userId && (
        <div className="flex flex-col items-end w-1/5 gap-1">
          <button
            onClick={handleEdit}
            className="bg-amber-400 hover:bg-amber-500 text-white font-medium py-1 px-4 rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
            >
            🖍
          </button>
          <button
            onClick={handleDelete}
            className="bg-slate-400 hover:bg-slate-500 text-white font-medium py-1 px-4 rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
            >
            ✖
          </button>
        </div>
      )}
      {showEdit && (
        <CommentEditModal
          id={id}
          toggleShow={handleEdit}
          setUpdate={setUpdate}
          comment={comment}
        />
      )}
      {showDelete && (
        <CommentDeleteModal
          id={id}
          toggleShow={handleDelete}
          setUpdate={setUpdate}
        />
      )}
    </div>
  );
};

export default Comment;
