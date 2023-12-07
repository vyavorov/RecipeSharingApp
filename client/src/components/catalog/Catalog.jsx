import { Link } from "react-router-dom";
import Layout from "../Layout";
import Recipe from "./Recipe";
import styles from './Catalog.module.css';
import * as recipeService from '../../services/recipeService';
import { useEffect, useState } from "react";

export default function Catalog() {
  //used to load the recipes in the initial mount
  const [recipes, setRecipes] = useState([]);
  const [pagesCount, setPagesCount] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [offset, setOffset] = useState(0);
  const pageSizeToTake = 3;
  useEffect(() => {
    getAllCount()
      .then(count => {
        const newPagesCount = Array.from({ length: Math.ceil(count / 3) }, (_, index) => index + 1);
        setPagesCount(newPagesCount);
      });
    updateRecipes(offset, pageSizeToTake);

  }, [offset, pageSizeToTake]);

  const pageClickHandler = (pageClicked) => {
    if (pageClicked === 1) {
      setOffset(0);
      setCurrentPage(pageClicked);
      return;
    }
    setOffset((pageClicked - 1) * pageSizeToTake);
    setCurrentPage(pageClicked);
  }

  //used to get the count of all recipes in order to determine total page size
  const getAllCount = async () => await recipeService.getAllCount();

  //used to update the recipes once I delete a recipe
  const updateRecipes = async (offset, pageSizeToTake) => {
    try {
      if (!offset) {
        setOffset(0);
      }
      const result = await recipeService.getAll(offset, pageSizeToTake);
      setRecipes(result);
      if (offset === 0) {
        setCurrentPage(1);
      }
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  }
  return (
    <Layout>
      <Link to="create-recipe" className={styles.addRecipeBtn}><i className="fa fa-plus"></i>  Add recipe </Link>
      <div className={styles.recipesContainer}>
        {recipes.map(recipe => <Recipe key={recipe._id} {...recipe} updateRecipes={updateRecipes} latest={false} isFavorites={false} />)}
      </div>
      {recipes.length === 0 && (
        <h3 className={styles.noRecipes}>No recipes yet...</h3>
      )}
      <div className={styles.pagesWrapper}>
        {pagesCount.map((page, index) => <button key={index} onClick={() => pageClickHandler(page)} className={currentPage === page ? styles.activeBtn : styles.pageBtn}>{page}</button>)}
      </div>
    </Layout>
  )
}