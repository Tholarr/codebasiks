import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import ErrorBoundary from "./components/ErrorBoundary";
import RequireAuth from "./auth/RequireAuth";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Roadmap from "./pages/Roadmap";
import Module01 from "./modules/Module01";
import Module02 from "./modules/Module02";
import Module03 from "./modules/Module03";
import Lesson01M01 from "./lessons/module01/Lesson01";
import Lesson02M01 from "./lessons/module01/Lesson02";
import Lesson01M02 from "./lessons/module02/Lesson01";
import Lesson02M02 from "./lessons/module02/Lesson02";
import Lesson03M02 from "./lessons/module02/Lesson03";
import Lesson01M03 from "./lessons/module03/Lesson01";
import Lesson02M03 from "./lessons/module03/Lesson02";
import Lesson03M03 from "./lessons/module03/Lesson03";
import Lesson04M03 from "./lessons/module03/Lesson04";

import NotFound from "./pages/NotFound";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<RequireAuth><Profile /></RequireAuth>} />
            <Route path="/roadmap" element={<RequireAuth><Roadmap /></RequireAuth>} />

            <Route path="/module/01" element={<Module01 />} />
            <Route path="/module/02" element={<Module02 />} />
            <Route path="/module/03" element={<Module03 />} />

            {/* Module 01 */}
            <Route path="/module/01/lesson/01" element={<Lesson01M01 />} />
            <Route path="/module/01/lesson/02" element={<Lesson02M01 />} />

            {/* Module 02 */}
            <Route path="/module/02/lesson/01" element={<Lesson01M02 />} />
            <Route path="/module/02/lesson/02" element={<Lesson02M02 />} />
            <Route path="/module/02/lesson/03" element={<Lesson03M02 />} />

            {/* Module 03 */}
            <Route path="/module/03/lesson/01" element={<Lesson01M03 />} />
            <Route path="/module/03/lesson/02" element={<Lesson02M03 />} />
            <Route path="/module/03/lesson/03" element={<Lesson03M03 />} />
            <Route path="/module/03/lesson/04" element={<Lesson04M03 />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
    </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>
);
