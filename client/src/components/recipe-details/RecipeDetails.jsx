import Layout from "../Layout";
import styles from './RecipeDetails.module.css';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as recipeService from '../../services/recipeService';

export default function RecipeDetails() {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState({ ingredients: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await recipeService.getOneById(recipeId);
        setRecipe(result);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [recipeId]);

  return (
    <Layout>
      <div className={styles.recipeDetails}>
        <img className={styles.recipeImage} src={recipe.imageUrl} alt={`${recipe.title} Image`} />
        <div className={styles.recipeText}>
          <h1 className={styles.recipeTitle}>{recipe.title}</h1>
          <p className={styles.recipeCategory}>Category: {recipe.category}</p>
          <div className={styles.recipeInfo}>
            <p className={styles.recipeTime}>Prep Time: {recipe.prepTime} minutes</p>
            <p className={styles.recipeDescription}>{recipe.description}</p>

            <div className={styles.ingredientsSection}>
              <h2>Ingredients:</h2>
              <ul>
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index}>{`${ingredient.name}: ${ingredient.quantity}`}</li>
                ))}
              </ul>
            </div>

            <div className={styles.methodSection}>
              <h2>Method:</h2>
              <p>{recipe.method}</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
