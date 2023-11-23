const baseUrl = "http://localhost:3030/jsonstore/comments";

export const create = async (recipeId, username, text) => {
  const response = await fetch(baseUrl, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      recipeId,
      username,
      text,
    }),
  });

  const result = await response.json();

  return result;
};

export const getAll = async () => {
  try {
    const response = await fetch(baseUrl);
    const data = await response.json();
    const commentsArray = Object.values(data);
    return commentsArray;
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return [];
  }
};
