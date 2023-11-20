import { Link } from 'react-router-dom'
import styles from './Header.module.css';
import Layout from './Layout';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link to="/" className={styles.navLink}>RecipeApp</Link>
      </div>
      <nav className={styles.navigation}>
        <ul className={styles.navList}>
          <li><Link to="/catalog" className={styles.navLink}>Catalog</Link></li>
          <li><Link to="/about" className={styles.navLink}>About Us</Link></li>
          {/* Add more navigation links as needed */}
        </ul>
      </nav>
    </header>
  );
}