import styles from "../../styles/register/register.module.scss";
import { useState } from "react";
import { useRouter } from "next/router";

import { signInWithEmailAndPassword, auth } from "../../contexts/firebase";

const LoginPage = () => {
	//

	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleEmailChange = (e) => {
		setEmail(e.target.value);
	};

	const handlePasswordChange = (e) => {
		setPassword(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				const user = userCredential.user;
				router.push(`/profile/${user.uid}`);
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
			});
	};

	return (
		<div className={styles.loginContainer}>
			<div className={styles.loginBox}>
				<h1 className={styles.loginTitle}>AUTENTIFICĂ-TE</h1>
				<form
					onSubmit={handleSubmit}
					className={styles.loginForm}
				>
					<label>Email</label>
					<div className={styles.inputGroup}>
						<input
							className={styles.loginInput}
							type="email"
							value={email}
							onChange={handleEmailChange}
							name="email"
						/>
					</div>
					<label>Parola</label>
					<div className={styles.inputGroup}>
						<input
							className={styles.loginInput}
							type="password"
							value={password}
							onChange={handlePasswordChange}
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
