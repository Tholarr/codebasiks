import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Module01 from "./modules/Module01";
import Module02 from "./modules/Module02";
import Lesson01M01 from "./lessons/module01/lesson01";
import Lesson02M01 from "./lessons/module01/lesson02";
import Lesson01M02 from "./lessons/module02/lesson01";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/module/01" element={<Module01 />} />
        <Route path="/module/02" element={<Module02 />} />

        {/* Module 01 */}
        <Route path="/module/01/lesson/01" element={<Lesson01M01 />} />
        <Route path="/module/01/lesson/02" element={<Lesson02M01 />} />

        {/* Module 02 */}
        <Route path="/module/02/lesson/01" element={<Lesson01M02 />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
