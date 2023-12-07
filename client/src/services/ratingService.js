const baseUrl = "http://localhost:3030/data/ratings";

export const create = async (favoriteRecipeData) => {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(baseUrl, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "X-Authorization": token,
    },
    body: JSON.stringify(favoriteRecipeData),
  });

  const result = await response.json();

  return result;
};

export const isRated = async (userId, recipeId) => {
  const currentData = await getAll();
  const foundRating = currentData.find(
    (recipe) => recipe.userId === userId && recipe.recipeId === recipeId
  );
  if (foundRating) {
    return true;
  } else {
    return false;
  }
};

export const getAll = async () => {
  try {
    // Check if the collection exists before making the fetch request
    const collectionsResponse = await fetch("http://localhost:3030/data");
    const collectionsData = await collectionsResponse.json();

    if (!collectionsData.includes("recipes")) {
      console.warn("Recipes collection not found. Returning empty array.");
      return [];
    }

    // If the collection exists, proceed with the fetch request
    const response = await fetch(baseUrl);

    if (!response.ok) {
      // Throw an error for non-2xx HTTP statuses
      throw new Error(`Failed to fetch recipes. Status: ${response.status}`);
    }

    // Check if the response body is empty
    const contentLength = response.headers.get("content-length");
    if (contentLength && parseInt(contentLength, 10) === 0) {
      console.warn("Empty response received while fetching recipes.");
      return [];
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return [];
  }
};

export const getRatingsForSpecificRecipe = async (recipeId) => {
  try {
    // const response = await fetch(
    //   `${baseUrl}?offset=${offset}&pageSize=${pageSize}`
    // );
    const response = await fetch(`${baseUrl}?where=recipeId%3D%22${recipeId}%22`);

    if (!response.ok) {
      // Throw an error for non-2xx HTTP statuses
      throw new Error(
        `Failed to fetch favorite recipes. Status: ${response.status}`
      );
    }
    const data = await response.json();
    return data;
  } catch {
    console.error("Error fetching recipes:", error);
    return [];
  }
}

export const getRatingForSpecificRecipe = async (recipeId) => {
    const allRatings = await getRatingsForSpecificRecipe(recipeId);
    const totalRating = allRatings.reduce((acc, ratingObj) => acc + ratingObj.rating, 0);
    const avgRating = totalRating === 0 ? 0 : (totalRating / allRatings.length).toFixed(1);
    return avgRating;
};