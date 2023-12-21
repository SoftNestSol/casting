import { useState } from "react";
import { useAuthContext } from "../../contexts/auth.context";

import styles from "../../styles/register/register.module.scss";

const RegisterPage = () => {
	const [userData, setUserData] = useState({
		email: "",
		password: "",
		name: "",
		age: "",
		sex: "",
		height: "",
		weight: "",
		eyeColor: "",
		hairColor: "",
		description: "",
		files: []
	});

	const { signUp } = useAuthContext();

	const handleInputChange = (event) => {
		setUserData((prevState) => ({
			...prevState,
			[event.target.name]: event.target.value
		}));
	};

	const handleFileChange = (event) => {
		setUserData((prevState) => ({
			...prevState,
			files: [...event.target.files]
		}));
	};

	const handleFormSubmit = async (event) => {
		event.preventDefault();
		await signUp(userData);
	};

	return (
		<div className={styles.loginContainer}>
			<div className={styles.loginBox}>
				<h1 className={styles.h1}>Register</h1>
				<form
					onSubmit={handleFormSubmit}
					className={styles.loginForm}
				>
					<label>Name</label>
					<input
						className={styles.loginInput}
						type="text"
						name="name"
						value={userData.name}
						onChange={handleInputChange}
					/>

					<label>Email</label>
					<input
						className={styles.loginInput}
						type="email"
						name="email"
						value={userData.email}
						onChange={handleInputChange}
					/>

					<label>Pasword</label>
					<input
						className={styles.loginInput}
						type="password"
						name="password"
						value={userData.password}
						onChange={handleInputChange}
					/>

					<label>Age</label>
					<input
						className={styles.loginInput}
						type="number"
						name="age"
						value={userData.age}
						onChange={handleInputChange}
					/>

					<label>Gender</label>
					<input
						className={styles.loginInput}
						type="text"
						name="sex"
						value={userData.sex}
						onChange={handleInputChange}
					/>

					<label>Height</label>
					<input
						className={styles.loginInput}
						type="number"
						name="height"
						value={userData.height}
						onChange={handleInputChange}
					/>

					<label>Weight</label>
					<input
						className={styles.loginInput}
						type="number"
						name="weight"
						value={userData.weight}
						onChange={handleInputChange}
					/>

					<label>EyeColor</label>
					<input
						className={styles.loginInput}
						type="text"
						name="eyeColor"
						value={userData.eyeColor}
						onChange={handleInputChange}
					/>

					<label>HairColor</label>
					<input
						className={styles.loginInput}
						type="text"
						name="hairColor"
						value={userData.hairColor}
						onChange={handleInputChange}
					/>

					<label>Select at least 3 photos</label>
					<input
						className={styles.loginInput}
						type="file"
						name="files"
						multiple
						onChange={handleFileChange}
					/>

					<label>Tell us something about you</label>
					<textarea
						className={styles.loginInput}
						name="description"
						value={userData.description}
						onChange={handleInputChange}
					></textarea>

					<button
						className={styles.loginButton}
						type="submit"
					>
						Register
					</button>
				</form>
			</div>
		</div>
	);
};

export default RegisterPage;
