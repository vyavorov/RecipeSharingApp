import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footerContainer}>
      <div className={styles.subscribeForm}>
        <form>
          <img src="https://staging.damndelicious.net/wp-content/themes/damndelicious2021/images/subscribe-image.jpg"
            className={styles.subscribeImg} alt="Subscribe image" />
          <div className={styles.subscribeFormWrapper}>
            <p>Sign up for FREE quick and easy weeknight dinners delivered right to your inbox! You'll receive new recipes as soon as they are published, plus our top 12 recipes free!</p>
            {/* <label htmlFor="email">Email:</label> */}
            <input type="email" id="email" name="email" placeholder="email address" />
            <button type="submit">Subscribe <i className="fa fa-arrow-right"></i></button>
          </div>
        </form>
      </div>

      <div className={styles.quickLinks}>
        <h3>Quick Links</h3>
        <ul>
          <li><a href="/catalog">Catalog</a></li>
          <li><a href="/about">About Us</a></li>
        </ul>
      </div>

      <div className={styles.followUs}>
        <h3>Follow Us</h3>
        <div className={styles.socialIcons}>
          <a href="#" target="_blank">FACEBOOK</a>
          <a href="#" target="_blank">PINTEREST</a>
          <a href="#" target="_blank">INSTAGRAM</a>
          <a href="#" target="_blank">YOUTUBE</a>
        </div>
      </div>
    </footer>
  )
}