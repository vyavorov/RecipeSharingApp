import { Link } from "react-router-dom";
import Layout from "../Layout";
import Recipe from "./Recipe";
import styles from './Catalog.module.css';
import * as recipeService from '../../services/recipeService';
import { useEffect, useState } from "react";

export default function Catalog() {
  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const result = await recipeService.getAll();
        setRecipes(result);
      } catch (error) {
        console.error("Error fetching recipes:", error);
        // Handle error if needed
      }
    })();
  }, []);
  // console.log(result);
  return (
    <Layout>
      <Link to="create-recipe" className={styles.addRecipeBtn}><i className="fa fa-plus"></i>  Add recipe </Link>
      <div className={styles.recipesContainer}>
        {recipes.map(recipe => <Recipe key={recipe._id} {...recipe} />)}
      </div>
      {recipes.length === 0 && (
        <h3 className={styles.noRecipes}>No recipes yet...</h3>
      )}
    </Layout>
  )
}