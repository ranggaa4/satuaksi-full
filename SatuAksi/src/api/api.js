// src/api/api.js
const BASE_URL = "http://localhost:5000/api";

export const api = {
  get: async (url, token = null) => {
    const res = await fetch(`${BASE_URL}${url}`, {
      method: "GET",
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });
    return res.json();
  },

  post: async (url, body = {}, token = null) => {
    const res = await fetch(`${BASE_URL}${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify(body),
    });
    return res.json();
  },

  upload: async (url, formData, token = null) => {
    const res = await fetch(`${BASE_URL}${url}`, {
      method: "POST",
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: formData,
    });
    return res.json();
  },

  uploadPut: async (url, formData, token = null) => {
    const res = await fetch(`${BASE_URL}${url}`, {
      method: "PUT",
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: formData,
    });
    return res.json();
  },

  delete: async (url, token = null) => {
    const res = await fetch(`${BASE_URL}${url}`, {
      method: "DELETE",
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });
    return res.json();
  },
};
