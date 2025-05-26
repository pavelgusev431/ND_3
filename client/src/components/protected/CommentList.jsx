import { useState, useEffect } from "react";
import Comment from "./Comment.jsx";
import { getComments } from "../../helpers/commentCRUD.js";

const CommentList = ({ update, setUpdate }) => {
  const [comments, setComments] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await getComments();
        setComments(response || []);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setComments([]);
        } else {
          setError(error.message || "Failed to load comments");
        }
      }
    };
    fetchComments();
  }, [update]);

  return (
    <div className="w-full flex flex-col">
      {error.message || (
        <div className="w-full">
          {comments[0] && comments.map((comment) => {
            return (
              <Comment
                key={comment.id}
                comment={comment}
                setUpdate={setUpdate}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CommentList;
