import Comment from "../models/commentModel.js";
import AppError from "../utilities/AppError.js";

const createComment = async (req, res, next) => {
  try {
    const { content } = req.body;
    const { id } = res.locals;

    if (!content) {
      throw new AppError("Comment can not be empty", 403);
    }

    const comment = new Comment();
    comment.content = content;
    comment.userId = id;
    await comment.save();

    res.status(201).json({
      status: "success",
      data: {
        content: comment.content,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getComments = async (_req, res, next) => {
  try {
    let comments = await Comment.find();
    comments = comments.map((comment) => {
      return {
        id: comment.id,
        content: comment.content,
      };
    });
    res.status(200).json({
      status: "success",
      data: comments,
    });
  } catch (error) {
    next(error);
  }
};

const updateComment = async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const { content } = req.body;
    const { id } = res.locals;

    const comment = await Comment.findById(commentId);
    if (comment.userId !== id) {
      throw new AppError(403, "Can not edit another user's comment");
    }
    comment.content = content;
    await comment.save();
    res.status(200).json({
      message: "success",
      data: {
        content: comment.content,
      },
    });
  } catch (error) {
    next(error);
  }
};

const deleteComment = async (req, res, next) => {
  console.log("Inside");
  try {
    console.log("Inside try/catch");
    const { commentId } = req.params;
    const { id } = res.locals;

    const comment = await Comment.findById(commentId);
    if (comment.userId !== id) {
      console.log("Id doesn't match");
      throw new AppError(403, "Can not delete another user's comment");
    }
    await comment.deleteOne();
    res.sendStatus(203);
  } catch (error) {
    console.log("Found error");
    next(error);
  }
};

export { createComment, getComments, updateComment, deleteComment };
