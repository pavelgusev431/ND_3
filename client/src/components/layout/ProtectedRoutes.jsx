import { Route } from "react-router";
import Protected from "./Protected.jsx";
import Home from "../protected/Home.jsx";

const ProtectedRoutes = () => {
  return (
    <Route element={<Protected />}>
      <Route path="home" element={<Home />} />
    </Route>
  );
};

export default ProtectedRoutes;