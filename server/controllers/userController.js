import User from "../models/userModel.js";
import Secret from "../models/secretModel.js";
import sha1 from "js-sha1";
import sha256 from "js-sha256";
import AppError from "../utilities/AppError.js";
import dotenv from "dotenv";
import jsonwebtoken from "jsonwebtoken";
dotenv.config();
const ADMIN_USER = process.env.ADMIN_USER;
const ADMIN_PASS = process.env.ADMIN_PASS;
const ADMIN_HASH = sha256(sha1(sha256(sha1(ADMIN_PASS)) + "salt"));
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_BALANCE = +process.env.ADMIN_BALANCE;

const createAdmin = async () => {
  try {
    const admin = new User({
      username: ADMIN_USER,
      email: ADMIN_EMAIL,
    });
    await admin.save();
    console.log(
      `\x1b[34mUser \x1b[31m"${ADMIN_USER}"\x1b[34m created successfully\x1b[0m`
    );
    const secret = new Secret({
      userId: admin.id,
      password: `${ADMIN_HASH}:${"salt"}`,
      role: "admin",
      balance: ADMIN_BALANCE,
    });
    await secret.save();
    console.log(
      `\x1b[34mUser \x1b[31m"${ADMIN_USER}"\x1b[34m secret created successfully\x1b[0m`
    );
  } catch (error) {
    throw new AppError(
      `\x1b[31mError creating admin account:\x1b[0m\n${error}`,
      500
    );
  }
};

const createUser = async (req, res) => {
  const { username, password, email } = req.body;
  const role = "user";
  const now = new Date();
  const salt = sha256(sha1(now.toString() + username));
  const hashedPassword = sha256(sha1(password + salt));
  const user = new User({ username: username, email: email });
  const secret = new Secret({
    userId: user.id,
    password: `${hashedPassword}:${salt}`,
    role: role,
  });
  await user.save();
  await secret.save();

  res.status(201).json({
    status: "success",
    data: {
      username: user.username,
      email: user.email,
    },
  });
};

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });
    if (!user) throw new AppError("Invalid username or password", 401);
    const secret = await Secret.findOne({
      userId: user.id,
    });
    if (secret.role === "banned") {
      throw new AppError("This account is banned.", 403);
    }
    const salt = secret.password.split(":")[1];
    const hashedPassword = sha256(sha1(password + salt));
    if (hashedPassword !== secret.password.split(":")[0]) {
      throw new AppError("Invalid username or password", 401);
    }
    const token = jsonwebtoken.sign(
      { id: user.id, role: secret.role },
      process.env.JWT_SECRET,
      { expiresIn: "360s" }
    );
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });
    res.cookie("tokenJS", 1);
    res.status(200).json({
      status: "success",
      data: {
        username: user.username,
        email: user.email,
        role: secret.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    const cookies = req.cookies;
    if (!cookies?.token) return res.sendStatus(203);
    const token = jsonwebtoken.decode(cookies.token);
    const foundUser = await User.findById(token.id);
    if (foundUser) {
      res.clearCookie("token", { httpOnly: true });
      res.clearCookie("tokenJS");
      return res.sendStatus(204);
    } else throw new AppError("User not found", 404);
  } catch (error) {
    next(error);
  }
};

const me = async (_req, res, next) => {
  try {
    const { id } = res.locals;
    const user = await User.findById(id);
    const secret = await Secret.findOne({ userId: id });
    if (user && secret) {
      res.status(200).json({
        status: "success",
        data: { 
          username: user.username, 
          email: user.email, 
          role: secret.role 
        },
      });
    } else throw new AppError("User not found", 404);
  } catch (error) {
    next(error);
  }
};

export { createAdmin, createUser, login, logout, me };
