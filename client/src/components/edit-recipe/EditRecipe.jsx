import Layout from "../Layout";
import styles from '../create-recipe/CreateRecipe.module.css';
import React, { useEffect, useState } from 'react';
import * as recipeService from '../../services/recipeService';
import { useNavigate, useParams } from "react-router-dom";

export default function EditRecipe() {
  const navigate = useNavigate();
  const { recipeId } = useParams();

  const [recipeData, setRecipeData] = useState({
    title: '',
    prepTime: '',
    description: '',
    ingredients: [{ name: '', quantity: '' }],
    method: '',
    imageUrl: '',
    category: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await recipeService.getOneById(recipeId);
        setRecipeData({
          title: result.title || '',
          prepTime: result.prepTime || '',
          description: result.description || '',
          ingredients: result.ingredients || [{ name: '', quantity: '' }],
          method: result.method || '',
          imageUrl: result.imageUrl || '',
          category: result.category || '',
        })
      } catch (err) {
        console.error('Error fetching recipe data:', err);
      }
    }

    fetchData();
  }, [recipeId]);

  const [imageUrlError, setImageUrlError] = useState('');


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

  const editRecipeHandler = async (e) => {
    e.preventDefault();

    try {
      await recipeService.isValidImageUrl(recipeData.imageUrl);
      setImageUrlError('');
    }
    catch (error) {
      setImageUrlError(error.message);
      return;
    }

    // Filter out ingredients with empty values
    const nonEmptyIngredients = recipeData.ingredients.filter(
      (ingredient) => ingredient.name.trim() !== '' && ingredient.quantity.trim() !== ''
    );

    // Create a new recipeData object without the empty ingredients
    const updatedRecipeData = {
      ...recipeData,
      ingredients: nonEmptyIngredients,
    };

    try {
      await recipeService.edit(updatedRecipeData, recipeId);
      navigate('/catalog');
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Layout>
      <section className={styles.formSection}>
        <form onSubmit={editRecipeHandler}>
          <div className={styles.formContainer}>
            <h1>Edit Recipe</h1>
            <label htmlFor="title">Title</label>
            <input
              required
              type="text"
              id="title"
              name="title"
              placeholder="Enter recipe title"
              value={recipeData.title}
              onChange={handleChange}
            />

            <label htmlFor="category">Category</label>
            <input
              required
              type="text"
              id="category"
              name="category"
              placeholder="Enter recipe category"
              value={recipeData.category}
              onChange={handleChange}
            />

            <label htmlFor="prep">Prep Time (minutes)</label>
            <input
              required
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
              required
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
              required
              id="method"
              name="method"
              placeholder="Enter recipe method"
              value={recipeData.method}
              onChange={handleChange}
            ></textarea>

            <label htmlFor="imageUrl">Image URL</label>
            <input
              required
              type="text"
              id="imageUrl"
              name="imageUrl"
              placeholder="Enter recipe image url"
              value={recipeData.imageUrl}
              onChange={handleChange}
            />

            {imageUrlError && <p className={styles.error}>{imageUrlError}</p>}

            <input type="submit" value="Edit Recipe" className={`${styles.btn} ${styles.submit}`} />
          </div>
        </form>
      </section>
    </Layout>
  );
}