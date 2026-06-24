import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Lesson01 from "./lessons/module01/lesson01";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/module/01/lesson/01" element={<Lesson01 />} />
        <Route path="/module/01/lesson/02" element={<div style={{ padding: "2rem" }}>Lesson 02 - coming soon</div>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
