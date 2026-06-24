import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lesson/01" element={<App />} />
        <Route path="/lesson/02" element={<div>Lesson 02 - coming soon</div>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
