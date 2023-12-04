import styles from './Footer.module.css';
import { useState } from 'react';
import * as subscriberService from '../../services/subscribeService';

export default function Footer() {
  const [subscriberData, setSubscriberData] = useState({
    email: '',
  });
  const [isLoggedIn, setIsloggedIn] = useState(true);
  const [didSubscribe, setDidSubscribe] = useState(false);
  const [alreadySubscriber, setAlreadySubscriber] = useState(false);
  const onChangeHandler = (e) => {
    const { name, value } = e.target;

    setSubscriberData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await subscriberService.create(subscriberData);
      // navigate('/catalog');
      setSubscriberData({ email: '' });
      setDidSubscribe(true);
      setAlreadySubscriber(false);
      setIsloggedIn(true);
    } catch (err) {
      if (err.message.includes("Already subscribed")) {
        setDidSubscribe(false);
        setAlreadySubscriber(true);
      }
      else {
        setDidSubscribe(false);
        setIsloggedIn(false);
      }
    }
  }
  return (
    <footer className={styles.footerContainer}>
      <div className={styles.subscribeForm}>
        <form onSubmit={onSubmit}>
          <img src="https://staging.damndelicious.net/wp-content/themes/damndelicious2021/images/subscribe-image.jpg"
            className={styles.subscribeImg} alt="Subscribe image" />
          <div className={styles.subscribeFormWrapper}>
            <p>Sign up for FREE quick and easy weeknight dinners delivered right to your inbox! You'll receive new recipes as soon as they are published, plus our top 12 recipes free!</p>
            {/* <label htmlFor="email">Email:</label> */}
            <input type="email" id="footer-email" name="email" placeholder="email address" onChange={onChangeHandler} value={subscriberData.email} />
            {!isLoggedIn && <p className={styles.error}>Please log in first before you subscribe</p>}
            {alreadySubscriber && <p className={styles.error}>You have already subscribed</p>}
            {didSubscribe && <p className={styles.success}>Subscribed successfully</p>}
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