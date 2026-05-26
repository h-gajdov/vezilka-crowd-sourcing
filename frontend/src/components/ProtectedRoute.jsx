import { Navigate } from "react-router-dom";
import { clearAuth, getToken, getUser, isTokenExpired } from "../utils/auth";

function ProtectedRoute({ children, requireReview = false }) {
  const token = getToken();
  const user = getUser();

  if (!token || isTokenExpired()) {
    clearAuth();
    return <Navigate to="/login" replace />;
  }

  if (requireReview && !user.userCanReivew) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export default ProtectedRoute;
