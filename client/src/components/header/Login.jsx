import { Link } from "react-router-dom";
import Layout from "../Layout";
import styles from './Login.module.css';
import useForm from "../../hooks/useForm";

export default function Login({
  loginSubmitHandler,
}) {

  const { values, onChange, onSubmit } = useForm(loginSubmitHandler,{
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
              name="email"
              id="email"
              placeholder="email address"
              onChange={onChange}
              value={values.email}
            />

            <label htmlFor="password">Password:</label>
            <input type="password"
              name="password"
              id="password"
              placeholder="password"
              onChange={onChange}
              value={values.password}
            />

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