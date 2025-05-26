import axios from "axios";
import url from "./getURL.js";

const logout = async () => {
  await axios
    .post(url("users/logout"), {}, { withCredentials: true })
    .catch((error) => {
      return error;
    });
};

export default logout;
