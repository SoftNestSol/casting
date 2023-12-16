import { AuthContext } from "../../contexts/auth.context";
import { CastingsContext } from "../../contexts/castings.context";
import styles from "../../styles/register/register.module.scss";
import { useState } from "react";

import { signInWithEmailAndPassword, auth } from "../../contexts/firebase";


const LoginPage = () => {

	
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
			console.log(user);
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
		});

	};

	return (
		<div className={styles.container}>
			<h1 className = "h1">Login</h1>
			<form  className = "form" onSubmit={handleSubmit}>
				<div>
					<label className = "label" >Email:</label>
					<input className ={styles.input}
						type="email"
						value={email}
						onChange={handleEmailChange}
						name="email"
					/>
				</div>
				<div>
					<label className = {styles.label}>Password:</label>
					<input className = {styles.input}
						type="password"
						value={password}
						onChange={handlePasswordChange}
						name="password"
					/>
				</div>
				<button className = {styles.button} type="submit">Login</button>
			</form>
		</div>
	);
};

export default LoginPage;
