import React from 'react';
import styles from './Recipe.module.css';

export default function Recipe({ title, imageUrl, prepTime }) {
  return (
    <div className={styles.recipeCard}>
      <img className={styles.recipeImage} src={imageUrl} alt="Recipe Image" />
      <div className={styles.recipeContent}>
        <div className={styles.recipeTitle}>{title}</div>
        <div className={styles.recipeTime}>{prepTime} minutes</div>
        <div className={styles.recipeButtons}>
          <button className={`${styles.recipeButton} ${styles.editButton}`}>Edit</button>
          <button className={`${styles.recipeButton} ${styles.detailsButton}`}>Details</button>
          <button className={`${styles.recipeButton} ${styles.deleteButton}`}>Delete</button>
        </div>
      </div>
    </div>
  );
};