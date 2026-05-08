import { jwtDecode } from "jwt-decode";

export const saveAuth = (authResponse) => {
  localStorage.setItem('token', authResponse.jwtToken);
  localStorage.setItem('user', JSON.stringify({
    firstName: authResponse.firstName,
    lastName: authResponse.lastName,
    email: authResponse.email,
  }));
};

export const getToken = () => localStorage.getItem('token');

export const getUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const clearAuth = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export const isLoggedIn = () => {
  const token = getToken();

  return !!token && !isTokenExpired();
}

export function isTokenExpired() {
  try {
    const token = getToken();
    
    if (!token) return true;

    const decoded = jwtDecode(token);

    console.log(decoded.exp * 1000)

    return decoded.exp * 1000 < Date.now();
  } catch (error) {
    return true;
  }
}