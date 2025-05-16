import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./app.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { CarritoContextProvider } from "./context/CarritoContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CarritoContextProvider>
      <App />
    </CarritoContextProvider>
  </React.StrictMode>
);
