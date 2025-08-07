const API_URL = "http://localhost:5000";

export const getToken = () => localStorage.getItem("token");

export const fetchWithAuth = (url, options = {}) => {
  const token = getToken();
  return fetch(`${API_URL}${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...(options.headers || {}),
    },
  });
};
