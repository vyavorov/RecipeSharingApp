import { useEffect, useState } from "react";

const baseUrl = "http://localhost:3030/data/recipes";
export const create = async (recipeData) => {
const token = localStorage.getItem('accessToken');
const response = await fetch(baseUrl, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "X-Authorization": token,
    },
    body: JSON.stringify(recipeData),
  });

  const result = await response.json();

  return result;
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
    const recipesArray = Object.values(data);
    return recipesArray;
  } catch (error) {
    // console.error("Error fetching recipes:", error);
    return [];
  }
};

export const getOneById = async (recipeId) => {
  try {
    const response = await fetch(`${baseUrl}/${recipeId}`);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error fetching recipes:", err);
  }
};
