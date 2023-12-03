import React from 'react';
import { Link } from 'react-router-dom';
import styles from './AboutUs.module.css';
import Layout from '../Layout';

// Placeholder images for team members
export default function AboutUs() {
  return (
    <Layout>
      <div className={styles.aboutUsContainer}>
        <div className={styles.aboutUsContent}>
          <h1>About Us</h1>
          <div className={styles.aboutUsText}>
            <p>
              Welcome to RecipeApp, your go-to destination for discovering and sharing delightful recipes. Our team is passionate about making healthy eating an enjoyable and accessible experience for everyone.
            </p>
            <p>
              At RecipeApp, we believe that good food has the power to bring people together, and we're here to empower you on your journey to a healthier lifestyle.
            </p>
          </div>

          <h2>Meet the Team</h2>
          <div className={styles.aboutUsTeam}>
            {/* Team Member 1 */}
            <div className={styles.teamMember}>
              <img
                className={styles.teamMemberImage}
                src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzBXNuO6PezhC18aYH_2cYtS0I7KbxoKYdwA&usqp=CAU'
                alt="John Doe"
              />
              <h3>John Doe</h3>
              <p>Co-Founder & Developer</p>
              <p>John is a passionate developer who loves turning ideas into reality. With a background in software engineering, he ensures that RecipeApp runs smoothly and provides an excellent user experience.</p>
            </div>

            {/* Team Member 2 */}
            <div className={styles.teamMember}>
              <img
                className={styles.teamMemberImage}
                src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzBXNuO6PezhC18aYH_2cYtS0I7KbxoKYdwA&usqp=CAU'
                alt="Jane Smith"
              />
              <h3>Jane Smith</h3>
              <p>Co-Founder & Designer</p>
              <p>Jane brings creativity and design expertise to RecipeApp. Her eye for detail ensures that the app not only functions well but also looks beautiful. She is dedicated to creating a visually appealing and user-friendly experience.</p>
            </div>

            {/* Team Member 3 */}
            <div className={styles.teamMember}>
              <img
                className={styles.teamMemberImage}
                src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzBXNuO6PezhC18aYH_2cYtS0I7KbxoKYdwA&usqp=CAU'
                alt="Mary Johnson"
              />
              <h3>Mary Johnson</h3>
              <p>Recipe Curator</p>
              <p>Mary is the culinary genius behind our delicious recipes. With a passion for healthy cooking, she curates a diverse range of recipes to suit different tastes and dietary preferences. Mary is dedicated to making healthy eating enjoyable for everyone.</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}