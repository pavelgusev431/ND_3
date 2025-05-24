// @ts-check
import express from 'express';
import cors from 'cors';
import errorHandler from '../middlewares/errorHandler.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
//routers


dotenv.config();
/**@type {string}*/
const CLIENT_HOST = process.env.CLIENT_HOST || 'localhost';
/**@type {string}*/
const CLIENT_PORT = process.env.CLIENT_PORT || '3000';

/**@type {express.Express}*/
const app = express();

/**@type {object}*/
const corsOptions = {
    /**@type {string}*/
    origin: `http://${CLIENT_HOST}:${CLIENT_PORT}`,
    /**@type {boolean}*/
    credentials: true,
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

//========routers========

//=========last==========
app.use(errorHandler);

export default app;
