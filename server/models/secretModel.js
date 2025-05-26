import mn from "../database/mongoose.js"

const secretSchema = mn.Schema({
    userId: String,
    password: String,
    role: String,
});

const Secret = mn.model("Secret", secretSchema);
await Secret.deleteMany();

console.log("\x1b[35mModel created: secrets\x1b[0m");

export default Secret;