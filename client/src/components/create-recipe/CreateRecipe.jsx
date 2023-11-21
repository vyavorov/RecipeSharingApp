import Layout from "../Layout";
import styles from './CreateRecipe.module.css';


export default function CreateRecipe() {
  return (
    <Layout>

      <section className={styles.formSection}>
        <form action="">
          <div className={styles.formContainer}>
            <h1>Create Recipe</h1>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" placeholder="Enter recipe title" />

            <label htmlFor="prep">Prep Time (minutes)</label>
            <input type="number" id="prep" name="prep" placeholder="Enter recipe prep time" />

            <label htmlFor="description">Description</label>
            <textarea id="description" name="description" placeholder="Enter recipe description"></textarea>

            <input type="submit" value="Create Recipe" className={`${styles.btn} ${styles.submit}`} />
          </div>
        </form>
      </section>
    </Layout>
  );
}