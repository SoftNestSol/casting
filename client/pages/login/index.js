import { useState } from "react";
import Link from "next/link";

import { useAuthContext } from "../../contexts/auth.context";

import styles from "../../styles/auth/auth.module.scss";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const { signIn } = useAuthContext();

	const handleFormSubmit = async (event) => {
		event.preventDefault();
		await signIn(email, password);
	};

	return (
		<div className={styles.wrapper}>
			<div className={styles.container}>
				<div className={styles.top_section}>
					<h1 className={styles.title}>Autentifica-te</h1>
				</div>

				<form onSubmit={handleFormSubmit}>
					<div className={styles.fields}>
						<label htmlFor="email">Email</label>
						<input
							id="email"
							name="email"
							onChange={(event) => setEmail(event.target.value)}
							required
							type="email"
							value={email}
						/>

						<label htmlFor="password">Parola</label>
						<input
							id="password"
							name="password"
							onChange={(event) => setPassword(event.target.value)}
							required
							type="password"
							value={password}
						/>
					</div>

					<button type="submit">Intra in cont</button>
				</form>

				<div className={styles.bottom_section}>
					<h3>
						<Link href="/login">Ai uitat parola?</Link>
					</h3>

					<h3>
						Nu ai un cont? <Link href="/register">Inregistreaza-te</Link>
					</h3>
				</div>
			</div>
		</div>
	);
};

export default Login;
