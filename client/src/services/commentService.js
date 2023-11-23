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
