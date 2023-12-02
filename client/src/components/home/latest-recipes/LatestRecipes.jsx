import { useEffect, useState } from 'react'
import styles from './LatestRecipes.module.css'
import * as recipeService from '../../../services/recipeService'
import Recipe from '../../catalog/Recipe';

export default function LatestRecipes() {
  const [latestRecipes, setLatestRecipes] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await recipeService.getLatest();
        setLatestRecipes(result);
        console.log(result);
        console.log(latestRecipes);
      } catch (err) {
        console.error("Error fetching recipes:", err);
      }
    };

    fetchData();
  }, []);
  // console.log(result);
  console.log(latestRecipes);
  return (
    <section className={styles.latestRecipesSection}>
      <h2>Our latest uploaded recipes</h2>
      <div className={styles.recipesContainer}>
        {latestRecipes.map(recipe => <Recipe key={recipe._id} {...recipe} />)}
      </div>
      {latestRecipes.length === 0 && (
        <h3 className={styles.noRecipes}>No recipes yet...</h3>
      )}
    </section>
  )
}