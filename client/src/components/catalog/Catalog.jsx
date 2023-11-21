import { Link } from "react-router-dom";
import Layout from "../Layout";
import Recipe from "./Recipe";
import styles from './Catalog.module.css';
import { getAll } from '../../services/recipeService';
import { useEffect, useState } from "react";

export default function Catalog() {
  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    // Use an IIFE (Immediately Invoked Function Expression) to call the async function
    (async () => {
      try {
        const result = await getAll();
        if (Array.isArray(result)) {
          setRecipes(result);
          console.log(result);
        } else {
          console.error("Error fetching recipes: Result is not an array");
        }
      } catch (error) {
        console.error("Error fetching recipes:", error);
        // Handle error if needed
      }
    })();
  }, []); // Make sure to include the dependency array
  // console.log(result);
  return (
    <Layout>
      <Link to="create-recipe" className={styles.addRecipeBtn}><i className="fa fa-plus"></i>  Add recipe </Link>
      <div className={styles.recipesContainer}>
        {recipes.map(recipe => <Recipe key={recipe._id} {...recipe} />)}
      </div>
    </Layout>
  )
}