import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {BrowserRouter as Router} from "react-router";
import MainContext from "./contexts/MainContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <MainContext>
        <App />
      </MainContext>
    </Router>
  </StrictMode>
);
