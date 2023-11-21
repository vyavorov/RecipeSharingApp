import { useEffect, useState } from "react";

const baseUrl = "http://localhost:3030/jsonstore/recipes";

export const create = async (recipeData) => {
  const response = await fetch(baseUrl, {
    method: "POST",
    header: {
      "content-type": "application/json",
    },
    body: JSON.stringify(recipeData),
  });

  const result = await response.json();

  return result;
};

export const getAll = async () => {
  try {
    const response = await fetch(baseUrl);
    const data = await response.json();
    const recipesArray = Object.values(data);
    return recipesArray;
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return [];
  }
};
