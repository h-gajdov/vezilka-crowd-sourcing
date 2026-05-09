import { jwtDecode } from "jwt-decode";

export const saveAuth = (authResponse) => {
  localStorage.setItem('token', authResponse.jwtToken);
  localStorage.setItem('user', JSON.stringify({
    firstName: authResponse.firstName,
    lastName: authResponse.lastName,
    email: authResponse.email,
    createdAt: authResponse.createdAt
  }));
};

export const updateUserData = (userDetailsResponse) => {
    localStorage.setItem('user', JSON.stringify({
        firstName: userDetailsResponse.firstName,
        lastName: userDetailsResponse.lastName,
        email: userDetailsResponse.email,
        createdAt: userDetailsResponse.createdAt
    }));
}

export const getToken = () => localStorage.getItem('token');

export const getUser = () => {
  const user = localStorage.getItem('user');
  if(!user) return null;

  const result = JSON.parse(user);
  result.createdAt = new Date(result.createdAt);
  return result;
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

    return decoded.exp * 1000 < Date.now();
  } catch (error) {
    return true;
  }
}