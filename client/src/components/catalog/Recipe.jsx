import React from 'react';
import styles from './Recipe.module.css';
import { Link } from 'react-router-dom';

export default function Recipe({ _id, title, imageUrl, prepTime }) {
  return (
    <div className={styles.recipeCard}>
      <img className={styles.recipeImage} src={imageUrl} alt="Recipe Image" />
      <div className={styles.recipeContent}>
        <div className={styles.recipeTitle}>{title}</div>
        <div className={styles.recipeTime}>{prepTime} minutes</div>
        <div className={styles.recipeButtons}>
          <Link to={`recipes/${_id}`} className={`${styles.recipeButton} ${styles.editButton}`}>Edit</Link>
          <Link to={`recipes/${_id}`} className={`${styles.recipeButton} ${styles.detailsButton}`}>Details</Link>
          <Link to={`recipes/${_id}`} className={`${styles.recipeButton} ${styles.deleteButton}`}>Delete</Link>
        </div>
      </div>
    </div>
  );
};