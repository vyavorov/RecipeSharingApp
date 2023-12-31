import { useEffect, useState } from 'react'
import styles from './LatestRecipes.module.css'
import * as recipeService from '../../../services/recipeService'
import Recipe from '../../catalog/Recipe';
import { Link } from 'react-router-dom';

export default function LatestRecipes() {
  const [latestRecipes, setLatestRecipes] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const result = await recipeService.getLatest();
      setLatestRecipes(result);
    } catch (err) {
      console.error("Error fetching recipes:", err);
    }
  };
  return (
    <section className={styles.latestRecipesSection}>
      <h2>Our latest uploaded recipes</h2>
      <div className={styles.recipesContainer}>
        {latestRecipes.map(recipe => <Recipe key={recipe._id} {...recipe} latest={true} updateRecipes={fetchData}/>)}
      </div>
      {latestRecipes.length === 0 && (
        <h3 className={styles.noRecipes}>No recipes yet...</h3>
      )}
      <Link to="catalog" className={styles.viewMore}>View more <i className="fa fa-arrow-right"></i></Link>
    </section>
  )
}