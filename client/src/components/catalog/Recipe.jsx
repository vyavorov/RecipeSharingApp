import React, { useContext, useEffect, useState } from 'react';
import styles from './Recipe.module.css';
import { Link, useParams, useNavigate } from 'react-router-dom';
import AuthContext from '../../contexts/authContext';
import DeleteRecipe from '../delete-recipe/DeleteRecipe';
import * as recipeService from '../../services/recipeService';
import * as ratingService from '../../services/ratingService';

export default function Recipe({ _id, title, imageUrl, prepTime, _ownerId, updateRecipes, latest, description, isFavorites, ratings }) {
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);

  useEffect(() => {
    getRatingForSpecificRecipe(_id)
      .then(rating => setRating(rating));
  }, [])

  const getRatingForSpecificRecipe = async (id) =>  await ratingService.getRatingForSpecificRecipe(id);

  const openDeleteModal = () => {
    setDeleteModalOpen(true);
  }

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
  }

  const handleDelete = async () => {
    try {
      await recipeService.remove(_id);
      setDeleteModalOpen(false);
      if (!latest) {
        navigate('/catalog');
      }
      updateRecipes(0, 3);
    } catch (err) {
      console.log(err);
    }
  }

  const { userId } = useContext(AuthContext);
  return (
    <div className={styles.recipeCard}>
      <img className={styles.recipeImage} src={imageUrl} alt="Recipe Image" />
      <div className={styles.recipeContent}>
        <div className={styles.recipeTitle}>{title}</div>
        <div className={styles.recipeDescription}>{description}</div>
        <div className={styles.recipeTime}>{prepTime} minutes</div>
        <div className={styles.rating}>
          {rating} / 5
        </div>
        {/* REMOVE THE BELOW CONDITION IF BUTTONS ARE TO BE SHOWN ON HOME PAGE */}
        {!latest && (
          <div className={styles.recipeButtons}>
            {_ownerId === userId && !isFavorites &&
              <Link to={latest ? `catalog/recipes/${_id}/edit` : `recipes/${_id}/edit`} className={`${styles.recipeButton} ${styles.editButton}`}>Edit</Link>
            }

            <Link to={isFavorites ? `../catalog/recipes/${_id}` : (latest ? `catalog/recipes/${_id}` : `recipes/${_id}`)} className={`${styles.recipeButton} ${styles.detailsButton}`}>Details</Link>

            {_ownerId === userId && !isFavorites &&
              <button
                onClick={openDeleteModal}
                className={`${styles.recipeButton} ${styles.deleteButton}`}
              >
                Delete
              </button>
            }
          </div>
        )}

      </div>

      <DeleteRecipe isOpen={isDeleteModalOpen} onClose={closeDeleteModal} onConfirm={handleDelete} />
    </div>
  );
};