import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const DB_HOST = process.env.DB_HOST;
const DB_NAME = process.env.DB_NAME;
const DB_PORT = process.env.DB_PORT;

const mn = await mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`).catch(err => console.log(err));

export default mn;