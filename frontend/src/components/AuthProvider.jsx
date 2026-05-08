import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { clearAuth, getToken } from "../utils/auth";
import { jwtDecode } from "jwt-decode";

export default function AuthProvider({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();

    if (!token) return;

    // timer to redirect when token expires
    try {
      const decoded = jwtDecode(token);

      const expiresIn = decoded.exp * 1000 - Date.now();

      if (expiresIn <= 0) {
        clearAuth();
        navigate("/login");
        return;
      }

      const timeout = setTimeout(() => {
        clearAuth();
        navigate("/login");
      }, expiresIn);

      return () => clearTimeout(timeout);
    } catch {
      clearAuth();
      navigate("/login");
    }
  }, [navigate]);

  return <>{children}</>;
}
