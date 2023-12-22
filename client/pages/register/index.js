import { useState, useEffect } from "react";
import { useAuthContext } from "../../contexts/auth.context";
import Link from "next/link";

import styles from "../../styles/register/register.module.scss";

function formatDate(date) {
	let d = new Date(date),
		month = "" + (d.getMonth() + 1),
		day = "" + d.getDate(),
		year = d.getFullYear();

	if (month.length < 2) month = "0" + month;
	if (day.length < 2) day = "0" + day;

	return [year, month, day].join("-");
}

const RegisterPage = () => {
	//

	const [letRegister, setLetRegister] = useState(false);
	const [userData, setUserData] = useState({
		email: "",
		password: "",
		name: "",
		dateOfBirth: "",
		gender: "",
		height: "",
		weight: "",
		eyeColor: "",
		hairColor: "",
		hairLength: "",
		description: "",
		phoneNumber: "",
		county: "",
		city: "",
		files: [],
		confirmPassword: ""
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
		if (userData.password !== userData.confirmPassword) {
			return;
		}
		await signUp(userData);
	};

	return (
		<div className={styles.loginContainer}>
			<div className={styles.loginBox}>
				<h1 className={styles.loginTitle}>
					Inregistreaza-te
					<span className={styles.loginSubtitle}>
						<Link
							className={styles.loginSubtitle}
							href="/login"
						>
							Ai deja un cont?{" "}
						</Link>
					</span>
				</h1>

				<form
					onSubmit={handleFormSubmit}
					className={styles.loginForm}
				>
					<div className={styles.containerFormular}>
						<div className={styles.separatorOne}>
							<label className={styles.label}>Numele tau Complet</label>
							<input
								required
								className={styles.loginInput}
								type="text"
								name="name"
								value={userData.name}
								onChange={handleInputChange}
							/>

							<label className={styles.label}>Email</label>
							<input
								required
								className={styles.loginInput}
								type="email"
								name="email"
								value={userData.email}
								onChange={handleInputChange}
							/>

							<label className={styles.label}>Telefon</label>
							<input
								required
								className={styles.loginInput}
								type="text"
								name="phoneNumber"
								value={userData.phoneNumber}
								onChange={handleInputChange}
							/>

							<label className={styles.label}>Judet</label>
							<input
								required
								className={styles.loginInput}
								type="text"
								name="county"
								value={userData.county}
								onChange={handleInputChange}
							/>

							<label className={styles.label}>Oras</label>
							<input
								required
								className={styles.loginInput}
								type="text"
								name="city"
								value={userData.city}
								onChange={handleInputChange}
							/>

							<label className={styles.label}>Data de Nastere</label>
							<input
								required
								className={styles.loginInput}
								type="date"
								name="dateOfBirth"
								value={userData.dateOfBirth ? formatDate(userData.dateOfBirth) : ""}
								onChange={handleInputChange}
							/>

							<label className={styles.label}>Sexul tau</label>
							<select
								required
								className={styles.loginInput}
								name="gender"
								value={userData.gender}
								onChange={handleInputChange}
							>
								<option value="">Selecteaza...</option>
								<option value="male">Masculin</option>
								<option value="female">Feminin</option>
							</select>

							<label className={styles.label}>Inaltime</label>
							<input
								required
								className={styles.loginInput}
								type="number"
								name="height"
								value={userData.height}
								onChange={handleInputChange}
							/>
						</div>
						<div className={styles.separatorTwo}>
							<label className={styles.label}>Greutate</label>
							<input
								required
								className={styles.loginInput}
								type="number"
								name="weight"
								value={userData.weight}
								onChange={handleInputChange}
							/>

							<label className={styles.label}>Culoare Ochilor</label>
							<select
								required
								className={styles.loginInput}
								name="eyeColor"
								value={userData.eyeColor}
								onChange={handleInputChange}
							>
								<option value="">Selecteaza...</option>
								<option value="brown">Caprui</option>
								<option value="blue">Albastri</option>
								<option value="green">Verzi</option>
								<option value="hazel">Negrii</option>
								<option value="gray">Galbeni</option>
								<option value="other">Alta</option>
							</select>

							<label className={styles.label}>Culoarea Parului</label>
							<select
								required
								className={styles.loginInput}
								name="hairColor"
								value={userData.hairColor}
								onChange={handleInputChange}
							>
								<option value="">Selecteaza...</option>
								<option value="black">Negru</option>
								<option value="brown">Castaniu</option>
								<option value="blonde">Blond</option>
								<option value="red">Rosu</option>
								<option value="gray">Gri</option>
								<option value="other">Altul</option>
							</select>

							<label className={styles.label}>Lungimea Parului</label>
							<select
								required
								className={styles.loginInput}
								name="hairLength"
								value={userData.hairLength}
								onChange={handleInputChange}
							>
								<option value="">Selecteaza...</option>
								<option value="short">Scurt</option>
								<option value="medium">Mediu</option>
								<option value="long">Lung</option>
								<option value="bald">Chel</option>
							</select>

							<label className={styles.label}>Selecteaza cel putin 3 poze cu tine</label>
							<input
								required
								className={[styles.loginInput]}
								type="file"
								name="files"
								multiple
								onChange={handleFileChange}
							/>

							<label className={styles.label}>
								Spune-ne ceva despre tine (experienta, interese, etc...)
							</label>
							<textarea
								className={styles.loginInput}
								name="description"
								value={userData.description}
								onChange={handleInputChange}
							></textarea>

							<label className={styles.label}>Parola</label>
							<input
								required
								className={styles.loginInput}
								type="password"
								name="password"
								value={userData.password}
								onChange={handleInputChange}
							/>

							<label className={styles.label}>Confirma Parola</label>
							<input
								required
								className={styles.loginInput}
								type="password"
								name="confirmPassword"
								value={userData.confirmPassword}
								onChange={handleInputChange}
							/>

							{userData.password !== userData.confirmPassword && <p>Parolele sunt diferite!</p>}
						</div>
					</div>
					{
						<button
							className={styles.loginButton}
							type="submit"
						>
							Register
						</button>
					}
				</form>
			</div>
		</div>
	);
};

export default RegisterPage;
