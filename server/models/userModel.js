import mn from "../database/mongoose.js";

const userSchema = new mn.Schema({
    username: String,
    email: String,
});

const User = mn.model("User", userSchema);
await User.deleteMany();

export default User;