import { Link } from "react-router-dom";
import Layout from "../Layout";
import styles from './Login.module.css';
import useForm from "../../hooks/useForm";
import { useContext } from "react";
import AuthContext from "../../contexts/authContext";

export default function Login() {

  const { loginSubmitHandler } = useContext(AuthContext);

  const { values, onChange, onSubmit, error } = useForm(loginSubmitHandler, {
    email: '',
    password: ''
  });

  return (
    <Layout>
      <section className={styles.auth}>
        <form onSubmit={onSubmit}>
          <div className={styles.container}>
            <div className={styles.brandLogo}></div>
            <h1>login</h1>
            <label htmlFor="email">Email:</label>
            <input type="email"
              required
              name="email"
              id="email"
              placeholder="email address"
              onChange={onChange}
              value={values.email}
            />

            <label htmlFor="password">Password:</label>
            <input type="password"
              required
              name="password"
              id="password"
              placeholder="password"
              onChange={onChange}
              value={values.password}
            />

            {error && <p className={styles.error}>{error}</p>}


            <input type="submit"
              value="Login"
              className={`${styles.btn} ${styles.submit}`}
            />

            <p className={styles.field}>
              <span>If you don't have profile, click <Link to="/register">here</Link></span>
            </p>
          </div>
        </form>
      </section>
    </Layout>
  )
}