import { Link } from 'react-router-dom'
import styles from './Header.module.css';
import Layout from '../Layout';
import { useContext, useState } from 'react';
import AuthContext from '../../contexts/authContext';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Header() {
  library.add(faBars);
  const { isAuthenticated, username } = useContext(AuthContext);
  const [showRespNav, setShowRespNav] = useState(false);

  const handleBurgerClick = () => {
    setShowRespNav(!showRespNav);
  };
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
              <li><Link to="/favorites" className={styles.navLink}>Favorites</Link></li>
              <li><Link to="/logout" className={styles.navLink}>Logout</Link></li>
              <li className={styles.username}> | {username}</li>
            </>
            : <>
              <li><Link to="/login" className={styles.navLink}>Login</Link></li>
              <li><Link to="/register" className={styles.navLink}>Register</Link></li>
            </>
          }
        </ul>
        {/* <i className="fa fa-bars" style={{ fontSize: '36px'}}></i> */}
        <FontAwesomeIcon
          className={styles.burgerMenu}
          icon={faBars}
          onClick={handleBurgerClick}
        />
        <ul className={`${styles.respNavList} ${showRespNav ? '' : styles.hideOnMobile}`}>
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
        </ul>
      </nav>
    </header>
  );
}