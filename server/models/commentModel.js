import mn from "../database/mongoose.js"

const commentSchema = mn.Schema({
    userId: String,
    content: String,
});

const Comment = mn.model("Comment", commentSchema);
await Comment.deleteMany();

console.log("\x1b[35mModel created: comments\x1b[0m");

export default Comment;