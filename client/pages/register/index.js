import { useState, useEffect } from "react";

import { AuthContext } from "../../contexts/auth.context";
import { CastingsContext } from "../../contexts/castings.context";

import styles from "../../styles/register/register.module.scss";

const RegisterPage = () => {
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
		// Perform registration logic here
	};

	return (
		<div className="container">
			<h1>Register</h1>
			<form onSubmit={handleSubmit}>
				<div>
					<label>Email:</label>
					<input
						type="email"
						value={email}
						onChange={handleEmailChange}
						name="email"
					/>
				</div>
				<div>
					<label>Password:</label>
					<input
						type="password"
						value={password}
						onChange={handlePasswordChange}
						name="password"
					/>
				</div>
				<button type="submit">Register</button>
			</form>
		</div>
	);
};

export default RegisterPage;
