import { Navigate } from "react-router-dom";
import {
  clearAuth,
  getToken,
  isTokenExpired,
  userCanReview,
} from "../utils/auth";
import { useEffect, useState } from "react";

function ProtectedRoute({ children, requireReview = false }) {
  const token = getToken();

  const [canReview, setCanReview] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviewStatus = async () => {
      try {
        const result = await userCanReview();
        setCanReview(result);
      } catch {
        setCanReview(false);
      } finally {
        setLoading(false);
      }
    };

    fetchReviewStatus();
  }, []);

  if (!token || isTokenExpired()) {
    clearAuth();
    return <Navigate to="/login" replace />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (requireReview && !canReview) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export default ProtectedRoute;
