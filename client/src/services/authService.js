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

export const register = async (email, password, confirmPassword) => {
  try {
    if (password !== confirmPassword) {
      throw new Error("Passwords do not match");
    }
    else if (password.length < 6) {
      throw new Error("Password must be at least 6 characters");
    }
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

    if (!response.ok) {
      throw new Error(`This user already exists`);
    }

    const result = await response.json();

    return result;
  } catch (error) {
    throw new Error(error.message);
  }
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
