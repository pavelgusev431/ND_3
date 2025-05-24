import mn from "../database/mongoose.js";

const userSchema = new mn.Schema({
    name: String,
    email: String,
});

const User = mn.model("User", userSchema);

export default User;