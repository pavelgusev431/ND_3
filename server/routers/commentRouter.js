import {createComment, getComments, updateComment, deleteComment} from "../controllers/commentController.js"
import express from "express"
import protect from "../validators/validateJWT.js"

const commentRouter = express.Router();

commentRouter.use(protect);
commentRouter.route("/").get(getComments).post(createComment);
commentRouter.route("/:commentId").patch(updateComment).delete(deleteComment);

export default commentRouter;