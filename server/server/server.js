import app from "./app.js";
import dotenv from "dotenv";
import test from "../controllers/testController.js";
import { createAdmin } from "../controllers/userController.js";

dotenv.config();
const port = process.env.PORT;

const setup = async () => {
  test();
  await createAdmin();
};

app.listen(port, async () => {
  await setup().then(() => {
    console.log(`\x1b[36mServer started on port \x1b[35m${port}`, "\x1b[0m");
  });
});
