const baseUrl = "http://localhost:3030/data/favorites";
const recipesUrl = "http://localhost:3030/data/recipes";

export const create = async (favoriteRecipeData) => {
  const currentData = await getAll();
  const { userId, recipeId } = favoriteRecipeData;

  const foundRecipe = currentData.find(
    (recipe) => recipe.userId === userId && recipe.recipeId === recipeId
  );

  if (foundRecipe) {
    await remove(foundRecipe._id);
  } else {
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
  }
};

export const getAll = async () => {
  try {
    // const response = await fetch(
    //   `${baseUrl}?offset=${offset}&pageSize=${pageSize}`
    // );
    const response = await fetch(baseUrl);
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
};

export const remove = async (recipeId) => {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(`${baseUrl}/${recipeId}`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      "X-Authorization": token,
    },
  });

  const result = await response.json();

  return result;
};

export const getAllForUser = async (userId) => {
  try {
    // const response = await fetch(
    //   `${baseUrl}?offset=${offset}&pageSize=${pageSize}`
    // );
    const response = await fetch(`${baseUrl}?where=userId%3D%22${userId}%22`);

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
};

export const getRecipeFullData = async (recipeIds) => {
  try {
    // const response = await fetch(`${baseUrl}?offset=${offset}&pageSize=${pageSize}`); //WILL USE THIS
    // const whereClause = `_id in (${recipeIds.map(id => `%22${id}%22`).join(',')})`;  //THIS IS NOT WORKING FOR SOME REASON
    const response = await fetch(`${recipesUrl}`); // THAT RETURNS ARRAY OF OBJECTS

    if (!response.ok) {
      // Throw an error for non-2xx HTTP statuses
      throw new Error(
        `Failed to fetch favorite recipes. Status: ${response.status}`
      );
    }

    const data = await response.json();

    const filteredArray = data.filter((recipe) =>
      recipeIds.includes(recipe._id)
    );
    return filteredArray;
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return [];
  }
};

export const isFavorite = async (userId, recipeId) => {
  const currentData = await getAll();
  const foundRecipe = currentData.find(
    (recipe) => recipe.userId === userId && recipe.recipeId === recipeId
  );
  if (foundRecipe) {
    return true;
  } else {
    return false;
  }
};
