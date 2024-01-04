import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { useAuthContext } from "../../contexts/auth.context";

import styles from "../../styles/auth/auth.module.scss";

const userDataInitialState = {
	name: "",
	email: "",
	password: "",
	confirmPassword: "",
	phoneNumber: "",
	county: "",
	city: "",
	gender: "",
	dateOfBirth: "",
	height: "",
	weight: "",
	hairColor: "",
	eyeColor: "",
	school: "",
	nationality: "",
	spokenLanguages: [],
	description: "",
	photos: [],
	files: []
};

const Register = () => {
	const [userData, setUserData] = useState(userDataInitialState);

	const { signUp } = useAuthContext();

	const handleInputChange = (event) => {
		setUserData({ ...userData, [event.target.name]: event.target.value });
	};

	const handleSpokenLanguagesInputChange = (event, index) => {
		setUserData((prevState) => {
			const updatedLanguages = [...prevState.spokenLanguages];
			updatedLanguages[index] = event.target.value;
			return { ...prevState, spokenLanguages: updatedLanguages };
		});
	};

	const handleFileInputChange = (event) => {
		[...event.target.files].forEach((file) => {
			const reader = new FileReader();

			reader.onload = () =>
				setUserData((prevState) => ({
					...prevState,
					photos: [reader.result, ...prevState.photos],
					files: [file, ...prevState.files]
				}));

			reader.readAsDataURL(file);
		});
	};

	const handleFormSubmit = async (event) => {
		event.preventDefault();
		if (userData.spokenLanguages.length === 0) return alert("Adauga cel putin o limba vorbita!");
		if (userData.files.length === 0) return alert("Adauga cel putin o fotografie!");
		if (userData.password !== userData.confirmPassword) return;
		await signUp(userData);
	};

	return (
		<div className={styles.wrapper}>
			<div className={styles.container}>
				<div className={styles.top_section}>
					<h1>Inregistreaza-te</h1>
				</div>

				<form onSubmit={handleFormSubmit}>
					<div className={styles.fields}>
						<label htmlFor="name">Nume</label>
						<input
							id="name"
							name="name"
							onChange={handleInputChange}
							required
							type="text"
							value={userData.name}
						/>

						<label htmlFor="email">Email</label>
						<input
							id="email"
							name="email"
							onChange={handleInputChange}
							required
							type="email"
							value={userData.email}
						/>

						<label htmlFor="phoneNumber">Telefon</label>
						<input
							id="phoneNumber"
							name="phoneNumber"
							onChange={handleInputChange}
							required
							type="text"
							value={userData.phoneNumber}
						/>

						<label htmlFor="county">Judet</label>
						<input
							id="county"
							name="county"
							onChange={handleInputChange}
							required
							type="text"
							value={userData.county}
						/>

						<label htmlFor="city">Oras</label>
						<input
							id="city"
							name="city"
							onChange={handleInputChange}
							required
							type="text"
							value={userData.city}
						/>

						<label htmlFor="gender">Gen</label>
						<select
							id="gender"
							name="gender"
							onChange={handleInputChange}
							required
							value={userData.gender}
						>
							<option value="">Selecteaza...</option>
							<option value="male">Masculin</option>
							<option value="female">Feminin</option>
						</select>

						<label htmlFor="dateOfBirth">Data nasterii</label>
						<input
							id="dateOfBirth"
							name="dateOfBirth"
							onChange={handleInputChange}
							required
							type="date"
							value={userData.dateOfBirth}
						/>

						<label htmlFor="height">Inaltime (cm)</label>
						<input
							id="height"
							name="height"
							onChange={handleInputChange}
							required
							type="number"
							value={userData.height}
						/>

						<label htmlFor="weight">Greutate (kg)</label>
						<input
							id="weight"
							name="weight"
							onChange={handleInputChange}
							required
							type="number"
							value={userData.weight}
						/>

						<label htmlFor="hairColor">Culoare par</label>
						<select
							id="hairColor"
							name="hairColor"
							onChange={handleInputChange}
							required
							value={userData.hairColor}
						>
							<option value="">Selecteaza...</option>
							<option value="black">Negru</option>
							<option value="brown">Castaniu</option>
							<option value="blonde">Blond</option>
							<option value="red">Rosu</option>
							<option value="gray">Gri</option>
							<option value="other">Altul</option>
						</select>

						<label htmlFor="eyeColor">Culoare ochi</label>
						<select
							id="eyeColor"
							name="eyeColor"
							onChange={handleInputChange}
							required
							value={userData.eyeColor}
						>
							<option value="">Selecteaza...</option>
							<option value="brown">Caprui</option>
							<option value="blue">Albastri</option>
							<option value="green">Verzi</option>
							<option value="hazel">Negri</option>
							<option value="gray">Galbeni</option>
							<option value="other">Alta</option>
						</select>

						<label htmlFor="school">Scoala absolvita</label>
						<input
							id="school"
							name="school"
							onChange={handleInputChange}
							required
							type="text"
							value={userData.school}
						/>

						<label htmlFor="nationality">Nationalitate</label>
						<input
							id="nationality"
							name="nationality"
							onChange={handleInputChange}
							required
							type="text"
							value={userData.nationality}
						/>

						<label htmlFor="spokenLanguages">Limbi vorbite</label>
						{userData.spokenLanguages.map((language, index) => (
							<div
								className={styles.input_container}
								key={index}
							>
								<input
									id="spokenLanguages"
									name="spokenLanguages"
									onChange={(event) => handleSpokenLanguagesInputChange(event, index)}
									required
									type="text"
									value={language}
								/>
								<button
									onClick={() => {
										const spokenLanguages = userData.spokenLanguages;
										spokenLanguages.splice(index, 1);
										setUserData({ ...userData, spokenLanguages });
									}}
									type="button"
								>
									Sterge
								</button>
							</div>
						))}
						<button
							onClick={() => {
								setUserData({
									...userData,
									spokenLanguages: [...userData.spokenLanguages, ""]
								});
							}}
							type="button"
						>
							Adauga limba
						</button>

						<label htmlFor="description">Descriere</label>
						<textarea
							id="description"
							name="description"
							onChange={handleInputChange}
							placeholder="Spune-ne ceva despre tine (experienta, interese, etc)"
							value={userData.description}
						/>

						<label htmlFor="photos">Fotografii</label>
						<label
							className={styles.upload}
							htmlFor="photos"
						/>
						<input
							id="photos"
							name="photos"
							onChange={handleFileInputChange}
							type="file"
							multiple
						/>

						{userData.photos.length > 0 ? (
							<div className={styles.photos}>
								{userData.photos.map((photo, index) => (
									<div
										className={styles.photo}
										key={index}
									>
										<Image
											alt={`Photo ${index + 1}`}
											src={photo}
											height={180}
											width={140}
										/>

										<div
											className={styles.remove}
											onClick={() => {
												const photos = userData.photos;
												const files = userData.files;
												photos.splice(index, 1);
												files.splice(index, 1);
												setUserData({ ...userData, photos, files });
											}}
										>
											Sterge
										</div>
									</div>
								))}
							</div>
						) : null}

						<label htmlFor="password">Parola</label>
						<input
							id="password"
							name="password"
							onChange={handleInputChange}
							required
							type="password"
							value={userData.password}
						/>

						<label htmlFor="confirmPassword">
							Confirma parola
							{userData.password !== userData.confirmPassword ? " (parolele nu sunt identice)" : ""}
						</label>
						<input
							id="confirmPassword"
							name="confirmPassword"
							onChange={handleInputChange}
							required
							type="password"
							value={userData.confirmPassword}
						/>
					</div>

					<button type="submit">Creeaza cont</button>
				</form>

				<div className={styles.bottom_section}>
					<h3>
						<Link href="/login">Ai deja un cont?</Link>
					</h3>
				</div>
			</div>
		</div>
	);
};

export default Register;
