import { getToken, refreshUserObj } from "../utils/auth";

export const reviewDocumentAccept = async (toSend) => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const token = getToken();

  const result = await fetch(`${BACKEND_URL}/api/files/accept`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(toSend),
  });
  return result;
};

export const reviewDocumentReject = async (toSend) => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const token = getToken();

  const result = await fetch(`${BACKEND_URL}/api/files/reject`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(toSend),
  });
  return result;
};

export async function getRejectedDocuments() {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const token = getToken();

  const result = await fetch(`${BACKEND_URL}/api/files/rejected`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!result.ok) {
    throw new Error("Failed to fetch rejected documents");
  }

  return result.json();
}
export async function getApprovedDocuments() {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const token = getToken();

  const result = await fetch(`${BACKEND_URL}/api/files/approved`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!result.ok) {
    throw new Error("Failed to fetch approved documents");
  }

  return result.json();
}

export async function getPendingDocuments() {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const token = getToken();

  const result = await fetch(`${BACKEND_URL}/api/files/pending`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!result.ok) {
    throw new Error("Failed to fetch pending documents");
  }

  return result.json();
}

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

  await refreshUserObj();

  const data = await res.json();

  return data;
}

export async function getUserDashboardStats() {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const token = getToken();

  const res = await fetch(`${BACKEND_URL}/api/user/stats`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to get user stats");
  }

  const data = await res.json();

  return data;
}

export async function getUserActivities() {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const token = getToken();

  const res = await fetch(`${BACKEND_URL}/api/user/activity`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to get user activity");
  }

  const data = await res.json();

  return data;
}