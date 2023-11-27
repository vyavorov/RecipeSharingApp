const baseUrl = "http://localhost:3030/users";

export const login = async (email, password) => {
  const response = await fetch(`${baseUrl}/login`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const result = await response.json();

  return result;
};

export const register = async (email, password) => {
  const response = await fetch(`${baseUrl}/register`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const result = await response.json();

  return result;
};

export const logout = async () => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    const response = await fetch(`${baseUrl}/logout`, {
      headers: {
        "X-Authorization": token,
      },
    });
  }
};
