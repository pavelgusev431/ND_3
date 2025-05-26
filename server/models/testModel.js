import mn from "../database/mongoose.js";

const testSchema = new mn.Schema({});

testSchema.methods.test = () => {
    console.log("\x1b[32mMongoDB test successful\x1b[0m");
}

const Test = mn.model("Test", testSchema);
await Test.deleteMany();

export default Test;