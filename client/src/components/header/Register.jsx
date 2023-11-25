import { useContext } from "react";
import Layout from "../Layout";
import styles from './Register.module.css';
import useForm from "../../hooks/useForm";
import { Link } from "react-router-dom";
import AuthContext from "../../contexts/authContext";

export default function Register() {
    const { registerSubmitHandler } = useContext(AuthContext);

    const { values, onChange, onSubmit } = useForm(registerSubmitHandler, {
        email: '',
        password: '',
        confirmPassword: ''
    });

    return (
        <Layout>
            <section className={`${styles.registerForm}`}>
                <form onSubmit={onSubmit}>
                    <div className={styles.registerContainer}>
                        <div className={styles.registerBrandLogo}></div>
                        <h1 className={styles.registerTitle}>Register</h1>
                        <label htmlFor="email" className={styles.registerLabel}>Email:</label>
                        <input type="email"
                            name="email"
                            id="email"
                            placeholder="Email..."
                            className={styles.registerInput}
                            value={values.email}
                            onChange={onChange}
                        />

                        <label htmlFor="password" className={styles.registerLabel}>
                            Password:
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Password..."
                            className={styles.registerInput}
                            value={values.password}
                            onChange={onChange}
                        />

                        <label htmlFor="confirmPassword" className={styles.registerLabel}>
                            Confirm Password:
                        </label>
                        <input
                            type="password"
                            name="confirmPassword"
                            id="confirmPassword"
                            placeholder="Confirm Password..."
                            className={styles.registerInput}
                            value={values.confirmPassword}
                            onChange={onChange}
                        />

                        <input type="submit" value="Register" className={`${styles.registerBtn}`} />

                        <p className={`${styles.registerField}`}>
                            <span>If you already have a profile, click <Link to="/login">here</Link></span>
                        </p>
                    </div>
                </form>
            </section>
        </Layout>
    )
}