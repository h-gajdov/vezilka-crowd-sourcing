import { getToken, refreshUserObj } from "../utils/auth";

export async function getUserUploads() {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const token = getToken();

  const res = await fetch(`${BACKEND_URL}/api/user/uploads`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch user");
  }

  const data = await res.json()
  return data;
}

export async function getUserDetails() {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const token = getToken();

  const res = await fetch(`${BACKEND_URL}/api/user/details`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch user");
  }

  const data = await res.json()
  return data;
}

export async function editUser(userData) {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const token = getToken();

  const res = await fetch(`${BACKEND_URL}/api/user/edit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(userData),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error("Failed to update user");
  }

  await refreshUserObj();

  const data = await res.json();

  return data;
}

export async function editAvatarPicture(file) {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const token = getToken();

  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${BACKEND_URL}/api/user/avatar`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error("Failed to update user");
  }

  await refreshUserObj();

  const data = await res.json();

  return data;
}

export async function removeAvatarPicture() {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const token = getToken();

  const res = await fetch(`${BACKEND_URL}/api/user/avatar`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to update user");
  }

    const stored = JSON.parse(localStorage.getItem('user'));
  localStorage.setItem('user', JSON.stringify({ ...stored, avatarUrl: null }));

  const data = await res.json();

  return data;
}