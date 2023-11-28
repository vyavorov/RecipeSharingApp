import Layout from "../Layout";
import styles from './RecipeDetails.module.css';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as recipeService from '../../services/recipeService';
import * as commentService from '../../services/commentService';

export default function RecipeDetails() {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState({ ingredients: [] });
  const [comments, setComments] = useState([]);

  //GET ONE RECIPE FOR DETAILS FUNCTIONALITY
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await recipeService.getOneById(recipeId);
        setRecipe(result);

        const commentsResult = await commentService.getAll(recipeId);
        setComments(commentsResult);
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

  return (
    <Layout>
      <div className={styles.recipeDetailsWrapper}>

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

          {comments.map(({_id, text, owner: {email}}) =>
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
