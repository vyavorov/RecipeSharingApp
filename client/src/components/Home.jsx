import styles from './Home.module.css';
import { Link } from 'react-router-dom'

export default function Home() {
  return (<div className={styles.homeContainer}>
    <section className={styles.introSection}>
      <div className={styles.introSectionContent}>
        <div className={styles.introLogo}>
          <Link to="/" className={styles.navLink}>RecipeApp</Link>
        </div>
        <div className={styles.introText}>
          <p>
            Discover the joy of healthy eating with our delicious and nutritious recipes.
            Eating well is not just about counting calories; it's about nourishing your body and
            enjoying every bite. Explore a variety of recipes tailored to your taste and health goals.
          </p>
        </div>
        <div className={styles.introContactUs}>
          <Link to="/about" className={styles.navLink}>About Us</Link>
        </div>
      </div>
    </section>

    <section className={styles.additionalContentSection}>
      <div className={styles.additionalContent}>
        <div className={styles.additionalText}>
          <h2>Why Choose Healthy Eating?</h2>
          <p>
            Embracing a healthy lifestyle through proper nutrition brings numerous benefits.
            From improved energy levels to enhanced mood, the positive impact is immense.
            Our recipes are crafted to make healthy eating enjoyable and sustainable for everyone.
          </p>
        </div>
        <div className={styles.additionalImageContainer}>
          <img
            className={styles.additionalImage}
            src="../../public/Roasted-pork.webp"  // Replace with your actual image URL
            alt="Fresh Vegetables"
          />
        </div>
      </div>
    </section>

    <section className={styles.statisticsSection}>
      <h2>How Healthy Eating Boosts Your Brain Productivity</h2>
      <div className={styles.statisticsCards}>
        <div className={styles.statCard}>
          <h3>Enhanced Focus</h3>
          <p>Healthy eating provides nutrients that support cognitive function, leading to improved focus and concentration.</p>
        </div>
        <div className={styles.statCard}>
          <h3>Increased Energy</h3>
          <p>Nourishing your body with wholesome foods results in sustained energy levels, keeping your brain alert throughout the day.</p>
        </div>
        <div className={styles.statCard}>
          <h3>Optimal Brain Function</h3>
          <p>A well-balanced diet supports the optimal function of neurotransmitters, contributing to better memory and cognitive abilities.</p>
        </div>
      </div>
    </section>
  </div>
  );
}