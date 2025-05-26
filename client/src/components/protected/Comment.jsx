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
    <div>
      <div>{username}</div>
      <div>{content}</div>
      {auth.id === userId && (
        <div>
          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
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
