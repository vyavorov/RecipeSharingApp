import Layout from "../Layout";
import styles from './RecipeDetails.module.css';
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as recipeService from '../../services/recipeService';
import * as commentService from '../../services/commentService';
import * as favoriteService from '../../services/favoriteService';
import AuthContext from "../../contexts/authContext";

export default function RecipeDetails() {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState({ ingredients: [] });
  const [comments, setComments] = useState([]);
  const auth = useContext(AuthContext);
  const [heartColor, setHeartColor] = useState("black");


  //GET ONE RECIPE FOR DETAILS FUNCTIONALITY
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await recipeService.getOneById(recipeId);
        setRecipe(result);

        //GET ALL COMMENTS FROM SERVER
        const commentsResult = await commentService.getAll(recipeId);
        setComments(commentsResult);

        const isFavorite = await favoriteService.isFavorite(auth.userId, recipeId);

        setHeartColor(isFavorite ? "red" : "black");
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [recipeId]);


  const [commentData, setCommentData] = useState({
    username: '',
    comment: ''
  })

  //COMMENTS FORM CHANGE HANDLER
  const handleChange = (e) => {
    const { name, value } = e.target;

    setCommentData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  //COMMENT CREATE HANDLER
  const addCommentHandler = async (e) => {
    e.preventDefault();
    commentService.create(recipeId, commentData.comment)
    setCommentData({
      comment: ''
    })

    // Fetch comments again after adding a new comment
    const commentsResult = await commentService.getAll(recipeId);
    setComments(commentsResult);
  }

  const addToFavoritesHandler = async () => {
    try {
      await favoriteService.create({ userId: auth.userId, recipeId: recipeId });
      if (heartColor === "black") {
        setHeartColor("red");
      }
      else {
        setHeartColor("black");
      }

    }
    catch (err) {
      console.log(err);
    }
  }

  return (
    <Layout>
      <div className={styles.recipeDetailsWrapper}>

        <div className={styles.recipeDetails}>
          <img className={styles.recipeImage} src={recipe.imageUrl} alt={`${recipe.title} Image`} />
          {/* <img src="/heart.svg" alt="Favorites image" className={styles.favoritesIcon} onClick={addToFavoritesHandler}/> */}
          {/* <img src={`data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23ff0000"><path d="M12 21.35l-1.45-1.32C5.4 14.25 2 11.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C15.09 3.81 16.76 3 18.5 3 21.58 3 24 5.42 24 8.5c0 2.78-3.4 5.75-8.55 11.54L12 21.35z"/></svg>`} alt="Favorites image" className={styles.favoritesIcon} onClick={addToFavoritesHandler}/> */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={heartColor} // Apply the fill color dynamically
            className={styles.favoritesIcon}
            onClick={addToFavoritesHandler}
          >
            {/* Include the path or content of your heart SVG here */}
            <path d="M12 21.35l-1.45-1.32C5.4 14.25 2 11.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C15.09 3.81 16.76 3 18.5 3 21.58 3 24 5.42 24 8.5c0 2.78-3.4 5.75-8.55 11.54L12 21.35z" />
          </svg>

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
                    <li key={index}>  - {`${ingredient.name}: ${ingredient.quantity}`}</li>
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
        <h3 className={styles.commentHeader}>Comments:</h3>
        <section className={styles.commentSection}>

          {comments.map(({ _id, text, owner: { email } }) =>
            <p className={styles.commentItem} key={_id}>{email}: {text}</p>
          )}

          {comments.length === 0 && (
            <p className={styles.noComments}>No comments yet...</p>
          )}

          {/* <p className={styles.commentItem}>Ventsy: What a delicious meal!</p> */}
        </section>
      </div>

      <article className={styles.createComment}>
        <label>Add new comment:</label>
        <form className={styles.commentsForm} onSubmit={addCommentHandler}>
          {/* <input type="text" name="username" placeholder="Username..." onChange={handleChange} value={commentData.username} /> */}
          <textarea name="comment" placeholder="Comment..." onChange={handleChange} value={commentData.comment}></textarea>
          <input type="submit" value="Add Comment" className={`${styles.btn} ${styles.submit}`} />
        </form>
      </article>
    </Layout>
  );
}
