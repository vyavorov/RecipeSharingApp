import React from 'react';
import styles from './Recipe.module.css';

export default function Recipe({ title, imageUrl, creationTime }) {
  return (
    <div className={styles.recipeCard}>
      <img className={styles.recipeImage} src="https://hips.hearstapps.com/hmg-prod/images/220922-delish-membership-green-chile-chciken-skillet-enchiladas-0180-eb-1664396967.jpg" alt="Recipe Image" />
      <div className={styles.recipeContent}>
        <div className={styles.recipeTitle}>Title</div>
        <div className={styles.recipeTime}>Time</div>
        <div className={styles.recipeButtons}>
          <button className={`${styles.recipeButton} ${styles.editButton}`}>Edit</button>
          <button className={`${styles.recipeButton} ${styles.detailsButton}`}>Details</button>
          <button className={`${styles.recipeButton} ${styles.deleteButton}`}>Delete</button>
        </div>
      </div>
    </div>
  );
};