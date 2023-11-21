import { Link } from "react-router-dom";
import Layout from "../Layout";
import Recipe from "./Recipe";
import styles from './Catalog.module.css';

export default function Catalog() {
  return (
    <Layout>
      <Link to="create-recipe" className={styles.addRecipeBtn}><i className="fa fa-plus"></i>  Add recipe </Link>
      <Recipe />
    </Layout>
  )
}