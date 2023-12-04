import { useEffect, useState } from "react";
const token = localStorage.getItem("accessToken");
const baseUrl = "http://localhost:3030/data/recipes";

export const create = async (recipeData) => {
  const token = localStorage.getItem("accessToken");
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

export const edit = async (recipeData, recipeId) => {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(`${baseUrl}/${recipeId}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
      "X-Authorization": token,
    },
    body: JSON.stringify(recipeData),
  });

  const result = await response.json();

  return result;
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

export const getAll = async (offset,pageSize) => {
  try {
    // Check if the collection exists before making the fetch request
    const collectionsResponse = await fetch("http://localhost:3030/data");
    const collectionsData = await collectionsResponse.json();

    if (!collectionsData.includes("recipes")) {
      console.warn("Recipes collection not found. Returning empty array.");
      return [];
    }

    // If the collection exists, proceed with the fetch request
    const response = await fetch(`${baseUrl}?offset=${offset}&pageSize=${pageSize}`);

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

export const getAllCount = async () => {
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
    return data.length;
  }
  catch (error) {
    console.error("Error fetching recipes:", error);
    return [];
  }
}

export const getOneById = async (recipeId) => {
  try {
    const response = await fetch(`${baseUrl}/${recipeId}`);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error fetching recipes:", err);
  }
};

export const getLatest = async () => {
  try {
    const response = await fetch(`${baseUrl}?sortBy=_createdOn%20desc&offset=0&pageSize=3`);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error fetching recipes:", err);
  }
};

// Utility function to check if the provided URL points to a valid image
export const isValidImageUrl = async (imageUrl) => {
  if (imageUrl.trim() === '') {
    throw new Error('Image URL is required.');
  }

  try {
    const response = await fetch(imageUrl, { method: 'HEAD' });

    if (!response.ok) {
      throw new Error('Invalid image URL or server error.');
    }

    const contentType = response.headers.get('Content-Type');
    if (!contentType || !contentType.startsWith('image/')) {
      throw new Error('The provided URL is not an image.');
    }

    return true;
  } catch (error) {
    console.error('Error checking image URL:', error);
    throw error;
  }
};