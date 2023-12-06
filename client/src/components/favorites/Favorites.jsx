import { useContext, useEffect, useState } from "react";
import Layout from "../Layout";
import * as favoriteService from "../../services/favoriteService";
import AuthContext from "../../contexts/authContext";
import Recipe from "../catalog/Recipe";
import styles from '../catalog//Catalog.module.css';


export default function Favorites() {
    const auth = useContext(AuthContext);
    const [favorites, setFavorites] = useState([]);
    useEffect(() => {
        fetchFavorites();
    }, [auth.userId]);

    const fetchFavorites = async () => {
        try {
            const favoritesData = await favoriteService.getAllForUser(auth.userId);
            const favoriteIds = favoritesData.map(favorite => favorite.recipeId);
            const favoritesFulLData = await favoriteService.getRecipeFullData(favoriteIds);
            setFavorites(favoritesFulLData);
        } catch (error) {
            console.error("Error fetching favorites:", error);
        }
    };
    return (
        <Layout>
            <div className={styles.recipesContainer}>
                {favorites.map(recipe => <Recipe key={recipe._id} {...recipe} updateRecipes={fetchFavorites} latest={false} isFavorites={true} />)}
            </div>
            {favorites.length === 0 && (
                <h3 className={styles.noRecipes}>No recipes yet...</h3>
            )}
            {/* <div className={styles.pagesWrapper}>
                {pageSize.map((page, index) => <button key={index} onClick={() => pageClickHandler(page)} className={currentPage === page ? styles.activeBtn : styles.pageBtn}>{page}</button>)}
            </div> */}
        </Layout>
    );
}