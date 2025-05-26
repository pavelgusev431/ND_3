import { Routes, Route } from "react-router";
import Auth from "./components/layout/Auth.jsx";
import NotFound from "./components/layout/NotFound.jsx";
import ProtectedRoutes from "./components/layout/ProtectedRoutes.jsx";

const App = () => {
  return (
      <Routes>
        <Route index element={<Auth/>} />
        {ProtectedRoutes()}
        <Route path="*" element={<NotFound></NotFound>} />
      </Routes>
  );
};

export default App;
