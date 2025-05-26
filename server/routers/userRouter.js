import {createUser, login, logout, me} from "../controllers/userController.js";
import express from "express";
import protect from "../validators/validateJWT.js";

const userRouter = express.Router();

userRouter.route("/").post(createUser);
userRouter.route("/login").post(login);
userRouter.use(protect);
userRouter.route("/logout").post(logout);
userRouter.route("/me").post(me);

export default userRouter;