import { useState } from "react";
import { useAuthContext } from "../../contexts/auth.context";

import styles from "../../styles/register/register.module.scss";

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
					<label>Email</label>
					<div className={styles.inputGroup}>
						<input
							className={styles.loginInput}
							type="email"
							value={email}
							onChange={(event) => setEmail(event.target.value)}
							name="email"
						/>
					</div>
					<label>Parola</label>
					<div className={styles.inputGroup}>
						<input
							className={styles.loginInput}
							type="password"
							value={password}
							onChange={(event) => setPassword(event.target.value)}
							name="password"
						/>
					</div>
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
