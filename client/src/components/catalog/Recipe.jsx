import React, { useContext, useState } from 'react';
import styles from './Recipe.module.css';
import { Link, useParams, useNavigate } from 'react-router-dom';
import AuthContext from '../../contexts/authContext';
import DeleteRecipe from '../delete-recipe/DeleteRecipe';
import * as recipeService from '../../services/recipeService';

export default function Recipe({ _id, title, imageUrl, prepTime, _ownerId, updateRecipes, latest }) {
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const navigate = useNavigate();

  const openDeleteModal = () => {
    setDeleteModalOpen(true);
  }

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
  }

  const handleDelete = async () => {
    console.log(_id);
    try {
      await recipeService.remove(_id);
      setDeleteModalOpen(false);
      if (!latest) {
        navigate('/catalog');
      }
      updateRecipes();
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
        <div className={styles.recipeTime}>{prepTime} minutes</div>
        <div className={styles.recipeButtons}>
          {_ownerId === userId &&
            <Link to={latest ? `catalog/recipes/${_id}/edit` : `recipes/${_id}/edit`} className={`${styles.recipeButton} ${styles.editButton}`}>Edit</Link>
          }

          <Link to={latest ? `catalog/recipes/${_id}` : `recipes/${_id}`} className={`${styles.recipeButton} ${styles.detailsButton}`}>Details</Link>

          {_ownerId === userId &&
            <button
              onClick={openDeleteModal}
              className={`${styles.recipeButton} ${styles.deleteButton}`}
            >
              Delete
            </button>
          }
        </div>
      </div>

      <DeleteRecipe isOpen={isDeleteModalOpen} onClose={closeDeleteModal} onConfirm={handleDelete} />
    </div>
  );
};