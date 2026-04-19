import { BrowserRouter, Routes, Route } from "react-router-dom";

import UserDashboard from "./pages/UserDashboard";
import UploadPage from "./pages/UploadPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import AdminDashboard from "./pages/AdminDashboard";
import ReviewPage from "./pages/ReviewPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<HomePage/>}/>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/review/:type/:id" element={<ReviewPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
