import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GlobalProvider } from "./context/GlobalState";

ReactDOM.render(
  <BrowserRouter>
    <GlobalProvider>
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
    </GlobalProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
