import Layout from "../Layout";
import styles from './CreateRecipe.module.css';
import React, { useState } from 'react';
import { create } from '../../services/recipeService';

export default function CreateRecipe() {
  const [recipeData, setRecipeData] = useState({
    title: '',
    prepTime: '',
    description: '',
    ingredients: [{ name: '', quantity: '' }],
    method: '',
    imageUrl: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setRecipeData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleIngredientChange = (e, index) => {
    const newIngredients = [...recipeData.ingredients];
    newIngredients[index][e.target.name] = e.target.value;

    setRecipeData((prevData) => ({
      ...prevData,
      ingredients: newIngredients,
    }));
  };

  const handleAddIngredient = () => {
    setRecipeData((prevData) => ({
      ...prevData,
      ingredients: [...prevData.ingredients, { name: '', quantity: '' }],
    }));
  };

  const handleRemoveIngredient = (index) => {
    setRecipeData((prevData) => {
      const newIngredients = [...prevData.ingredients];
      newIngredients.splice(index, 1);

      return {
        ...prevData,
        ingredients: newIngredients,
      };
    });
  };

  const createRecipeHandler = async (e) => {
    e.preventDefault();

    // Filter out ingredients with empty values
    const nonEmptyIngredients = recipeData.ingredients.filter(
      (ingredient) => ingredient.name.trim() !== '' && ingredient.quantity.trim() !== ''
    );

    // Create a new recipeData object without the empty ingredients
    const updatedRecipeData = {
      ...recipeData,
      ingredients: nonEmptyIngredients,
    };

    const result = await create(updatedRecipeData);

    // Pass updatedRecipeData to your server or handle the data submission logic here
    console.log(result);
  };

  // const createRecipeHandler = (e) => {
  //   e.preventDefault();
  //   const gameData = Object.fromEntries(new FormData(e.currentTarget));
  //   console.log(gameData);
  // }
  return (
    <Layout>
      <section className={styles.formSection}>
        <form onSubmit={createRecipeHandler}>
          <div className={styles.formContainer}>
            <h1>Create Recipe</h1>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Enter recipe title"
              value={recipeData.title}
              onChange={handleChange}
            />

            <label htmlFor="prep">Prep Time (minutes)</label>
            <input
              type="number"
              id="prep"
              name="prepTime"
              placeholder="Enter recipe prep time"
              value={recipeData.prepTime}
              onChange={handleChange}
              pattern="[0-9]*"
            />

            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              placeholder="Enter recipe description"
              value={recipeData.description}
              onChange={handleChange}
            ></textarea>

            <label htmlFor="ingredients">Ingredients</label>
            {recipeData.ingredients.map((ingredient, index) => (
              <div key={index} className={`${styles.ingredientContainer} ${styles.fadeIn}`}>
                <input
                  type="text"
                  name="name"
                  placeholder="Ingredient name"
                  value={ingredient.name}
                  onChange={(e) => handleIngredientChange(e, index)}
                />
                <input
                  type="text"
                  name="quantity"
                  placeholder="Quantity"
                  value={ingredient.quantity}
                  onChange={(e) => handleIngredientChange(e, index)}
                />
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveIngredient(index)}
                    className={styles.removeIngredientBtn}
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button type="button" onClick={handleAddIngredient} className={styles.addIngredientBtn}>
              Add Ingredient
            </button>

            <label htmlFor="method">Method</label>
            <textarea
              id="method"
              name="method"
              placeholder="Enter recipe method"
              value={recipeData.method}
              onChange={handleChange}
            ></textarea>

            <input
              type="text"
              id="imageUrl"
              name="imageUrl"
              placeholder="Enter recipe image url"
              value={recipeData.imageUrl}
              onChange={handleChange}
            />

            <input type="submit" value="Create Recipe" className={`${styles.btn} ${styles.submit}`} />
          </div>
        </form>
      </section>
    </Layout>
  );
}