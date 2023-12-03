const baseUrl = "http://localhost:3030/users";

export const login = async (email, password) => {
  try {
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

    if (!response.ok) {
      throw new Error(`Login failed with status: ${response.status}`);
    }

    const result = await response.json();

    return result;
  } catch (error) {
    throw new Error("Username or password is incorrect");
  }
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
