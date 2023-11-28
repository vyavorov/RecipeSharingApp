const baseUrl = "http://localhost:3030/data/comments";

export const create = async (recipeId, text) => {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(baseUrl, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "X-Authorization": token,
    },
    body: JSON.stringify({
      recipeId,
      text,
    }),
  });

  const result = await response.json();

  return result;
};

export const getAll = async (recipeId) => {
  try {
    const query = new URLSearchParams({
      where: `recipeId="${recipeId}"`,
      load: `owner=_ownerId:users`,
    });

    // Check if the collection exists before making the fetch request
    const collectionsResponse = await fetch("http://localhost:3030/data");
    const collectionsData = await collectionsResponse.json();

    if (!collectionsData.includes("comments")) {
      console.warn("Comments collection not found. Returning empty array.");
      return [];
    }

    // If the collection exists, proceed with the fetch request
    const response = await fetch(`${baseUrl}?${query}`);

    if (!response.ok) {
      // Throw an error for non-2xx HTTP statuses
      throw new Error(`Failed to fetch comments. Status: ${response.status}`);
    }

    // Check if the response body is empty
    const contentLength = response.headers.get("content-length");
    if (contentLength && parseInt(contentLength, 10) === 0) {
      console.warn("Empty response received while fetching comments.");
      return [];
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching comments:", error);
    return [];
  }
};
