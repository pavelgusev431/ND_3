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
      {error ||  (comments[0] && 
        <div className="w-full">
          {comments.map((comment) => {
            return (
              <Comment
                key={comment.id}
                comment={comment}
                setUpdate={setUpdate}
              />
            );
          })}
        </div>
      ) || <p className="italic text-gray-400">No comments found..</p>}
    </div>
  );
};

export default CommentList;
