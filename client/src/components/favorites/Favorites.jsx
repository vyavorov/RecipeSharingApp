import { useContext, useEffect, useState } from "react";
import Layout from "../Layout";
import * as favoriteService from "../../services/favoriteService";
import AuthContext from "../../contexts/authContext";
import Recipe from "../catalog/Recipe";
import styles from '../catalog//Catalog.module.css';


export default function Favorites() {
  const auth = useContext(AuthContext);
  const [favorites, setFavorites] = useState([]);
  const [pagesCount, setPagesCount] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [offset, setOffset] = useState(0);
  const pageSizeToTake = 3;

  useEffect(() => {
    fetchFavorites();
  }, [auth.userId, offset, pageSizeToTake]);

  const fetchFavorites = async () => {
    try {
      const favoritesData = await favoriteService.getAllForUser(auth.userId);
      const favoriteIds = favoritesData.map(favorite => favorite.recipeId);
      const favoritesFullData = await favoriteService.getRecipeFullData(favoriteIds, offset, pageSizeToTake);
      setFavorites(favoritesFullData);

      favoriteService.getFilteredRecipesCount(favoriteIds)
        .then(count => {
          const newPagesCount = Array.from({ length: Math.ceil(count / 3) }, (_, index) => index + 1);
          setPagesCount(newPagesCount);
        });
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  };

  const pageClickHandler = (pageClicked) => {
    if (pageClicked === 1) {
      setOffset(0);
      setCurrentPage(pageClicked);
      return;
    }
    setOffset((pageClicked - 1) * pageSizeToTake);
    setCurrentPage(pageClicked);
  }
  return (
    <Layout>
      <div className={styles.recipesContainer}>
        {favorites.map(recipe => <Recipe key={recipe._id} {...recipe} updateRecipes={fetchFavorites} latest={false} isFavorites={true} />)}
      </div>
      {favorites.length === 0 && (
        <h3 className={styles.noRecipes}>No recipes yet...</h3>
      )}
      <div className={styles.pagesWrapper}>
        {pagesCount.map((page, index) => <button key={index} onClick={() => pageClickHandler(page)} className={currentPage === page ? styles.activeBtn : styles.pageBtn}>{page}</button>)}
      </div>
    </Layout>
  );
}