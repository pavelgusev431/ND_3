import mn from "../database/mongoose.js"

const commentSchema = mn.Schema({
    userId: String,
    content: String,
});

const Comment = mn.model("Comment", commentSchema);
await Comment.deleteMany();

export default Comment;