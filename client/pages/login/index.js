import { useState } from "react";
import Link from "next/link";

import { useAuthContext } from "../../contexts/auth.context";
import { FormattedMessage } from "react-intl";
import styles from "../../styles/auth/auth.module.scss";

const LoadingCircle = () => {
	return (
		<div className={styles.loading}>
			<div className={styles.circle}></div>
		</div>
	);
};

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);

	const { signIn } = useAuthContext();

	const handleFormSubmit = async (event) => {
		if (loading) return;
		setLoading(true);
		event.preventDefault();
		await signIn(email, password);
		setLoading(false);
	};

	return (
		<div className={styles.wrapper}>
			<div className={styles.container}>
				<div className={styles.top_section}>
					<h1 className={styles.title}>
						<FormattedMessage id="login" />
					</h1>
				</div>

				<form onSubmit={handleFormSubmit}>
					<div className={styles.fields}>
						<label htmlFor="email">
							<FormattedMessage id="email" />
						</label>
						<input
							id="email"
							name="email"
							onChange={(event) => setEmail(event.target.value)}
							required
							type="email"
							value={email}
						/>

						<label htmlFor="password">
							<FormattedMessage id="password" />
						</label>
						<input
							id="password"
							name="password"
							onChange={(event) => setPassword(event.target.value)}
							required
							type="password"
							value={password}
						/>
					</div>

					{loading ? (
						<LoadingCircle />
					) : (
						<button type="submit">
							<FormattedMessage id="login-call" />
						</button>
					)}
				</form>

				<div className={styles.bottom_section}>
					<h3>
						<Link href="/login/reset-password">
							<FormattedMessage id="forgot-password" />
						</Link>
					</h3>

					<h3>
						<FormattedMessage id="no-account" />{" "}
						<Link href="/register">
							<FormattedMessage id="create_account" />
						</Link>
					</h3>
				</div>
			</div>
		</div>
	);
};

export default Login;
