import { useState } from "react";
import { useAuthContext } from "../../contexts/auth.context";
import Link from "next/link";

import styles from "../../styles/login/login.module.scss";

const LoginPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const { signIn } = useAuthContext();

	const handleFormSubmit = async (event) => {
		event.preventDefault();
		await signIn(email, password);
	};

	return (
		<div className={styles.loginContainer}>
			<div className={styles.loginBox}>
				<h1 className={styles.loginTitle}>AUTENTIFICĂ-TE</h1>
				<form
					onSubmit={handleFormSubmit}
					className={styles.loginForm}
				>
					<label className="label">Email</label>
					<div className={styles.inputGroup}>
						<input
							className={styles.loginInput}
							type="email"
							value={email}
							onChange={(event) => setEmail(event.target.value)}
							name="email"
						/>
					</div>
					<label className="label">Parola</label>
					<div className={styles.inputGroup}>
						<input
							className={styles.loginInput}
							type="password"
							value={password}
							onChange={(event) => setPassword(event.target.value)}
							name="password"
						/>
					</div>
					<Link
						className={styles.forgotPassword}
						href="/login"
					>
						Ai uitat parola?
					</Link>
					<p className={styles.forgotPassword}>
						Nu ai cont?{" "}
						<Link
							className={styles.LinkField}
							href="/register"
						>
							Inregistreaza-te
						</Link>
					</p>
					<button
						className={styles.loginButton}
						type="submit"
					>
						Login
					</button>
				</form>
			</div>
		</div>
	);
};

export default LoginPage;
