import mn from "../database/mongoose.js";

const userSchema = new mn.Schema({
    username: String,
    email: String,
});

const User = mn.model("User", userSchema);
await User.deleteMany();

console.log("\x1b[35mModel created: users\x1b[0m");

export default User;