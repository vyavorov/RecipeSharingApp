import { Link } from 'react-router-dom'
import styles from './Header.module.css';
import Layout from '../Layout';
import { useContext } from 'react';
import AuthContext from '../../contexts/authContext';

export default function Header() {
  const { isAuthenticated, username } = useContext(AuthContext);
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link to="/" className={styles.navLink}>RecipeApp</Link>
      </div>
      <nav className={styles.navigation}>
        <ul className={styles.navList}>
          <li><Link to="/about" className={styles.navLink}>About Us</Link></li>
          {isAuthenticated
            ?
            <>
              <li><Link to="/catalog" className={styles.navLink}>Catalog</Link></li>
              <li><Link to="/logout" className={styles.navLink}>Logout</Link></li>
              <li className={styles.username}> | {username}</li>
            </>
            : <>
              <li><Link to="/login" className={styles.navLink}>Login</Link></li>
              <li><Link to="/register" className={styles.navLink}>Register</Link></li>
            </>
          }

          {/* Add more navigation links as needed */}
        </ul>
      </nav>
    </header>
  );
}