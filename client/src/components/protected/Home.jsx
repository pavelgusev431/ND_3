import { useState } from "react";
import CommentCreateModal from "./CommentCreateModal.jsx";
import CommentList from "./CommentList.jsx";

const Comments = () => {
  const [showModal, setShowModal] = useState(false);
  const [update, setUpdate] = useState(0);

  const handleCommentCreate = () => {
    setShowModal(true);
  };

  return (
    <div className="w-full flex flex-col items-center mt-5">
      <header>
        <h2>Comments</h2>
      </header>
      <div className="w-1/2 flex justify-end">
        <button onClick={handleCommentCreate}>Add a comment</button>
      </div>
      <main>
        <CommentList update={update} setUpdate={setUpdate} />
      </main>
      {showModal && (
        <CommentCreateModal
          setShowModal={setShowModal}
          setUpdate={setUpdate}
        />
      )}
    </div>
  );
};

export default Comments;