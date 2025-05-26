import mn from "../database/mongoose.js"

const secretSchema = mn.Schema({
    userId: String,
    password: String,
    role: String,
});

const Secret = mn.model("Secret", secretSchema);
await Secret.deleteMany();

export default Secret;