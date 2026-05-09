import { Navigate } from "react-router-dom";
import { clearAuth, getToken, isTokenExpired } from "../utils/auth";

function ProtectedRoute({ children }) {
  const token = getToken();

  if (!token || isTokenExpired()) {
    clearAuth();
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
