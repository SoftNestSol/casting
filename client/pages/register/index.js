import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { useAuthContext } from "../../contexts/auth.context";

import styles from "../../styles/auth/auth.module.scss";
import { FormattedMessage } from "react-intl";

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
					<h1>
						<FormattedMessage id="create_account" />
					</h1>
				</div>

				<form onSubmit={handleFormSubmit}>
					<div className={styles.fields}>
						<label htmlFor="name">
							<FormattedMessage id="name" />
						</label>
						<input
							id="name"
							name="name"
							onChange={handleInputChange}
							required
							type="text"
							value={userData.name}
						/>

						<label htmlFor="email">
							<FormattedMessage id="email" />
						</label>
						<input
							id="email"
							name="email"
							onChange={handleInputChange}
							required
							type="email"
							value={userData.email}
						/>

						<label htmlFor="phoneNumber">
							<FormattedMessage id="phone" />
						</label>
						<input
							id="phoneNumber"
							name="phoneNumber"
							onChange={handleInputChange}
							required
							type="text"
							value={userData.phoneNumber}
						/>

						<label htmlFor="county">
							Județ
						</label>
						<input
							id="county"
							name="county"
							onChange={handleInputChange}
							required
							type="text"
							value={userData.county}
						/>

						<label htmlFor="city">
							Oraș
						</label>
						<input
							id="city"
							name="city"
							onChange={handleInputChange}
							required
							type="text"
							value={userData.city}
						/>

						<label htmlFor="gender">
							<FormattedMessage id = "gender" />
						</label>
						<select
							id="gender"
							name="gender"
							onChange={handleInputChange}
							required
							value={userData.gender}
						>
							<option value="">
								<FormattedMessage id="select" />
							</option>
							<option value="male">M</option>
							<option value="female">F</option>
						</select>

						<label htmlFor="dateOfBirth">
							<FormattedMessage id="date of birth" />
						</label>
						<input
							id="dateOfBirth"
							name="dateOfBirth"
							onChange={handleInputChange}
							required
							type="date"
							value={userData.dateOfBirth}
						/>

						<label htmlFor="height">
							<FormattedMessage id="height" />
						</label>
						<input
							id="height"
							name="height"
							onChange={handleInputChange}
							required
							type="number"
							value={userData.height}
						/>

						<label htmlFor="weight">
							<FormattedMessage id="weight"/>
						</label>
						<input
							id="weight"
							name="weight"
							onChange={handleInputChange}
							required
							type="number"
							value={userData.weight}
						/>

						<label htmlFor="hairColor">
							Culoarea părului
						</label>
						<select
							id="hairColor"
							name="hairColor"
							onChange={handleInputChange}
							required
							value={userData.hairColor}
						>
							<option value="">
								<FormattedMessage id="select" />
							</option>
							<option value="black">
								<FormattedMessage id="black" />
							</option>
							<option value="brown">
								<FormattedMessage id="brown" />
							</option>
							<option value="blonde">
								<FormattedMessage id="blonde" />
							</option>
							<option value="red">
								<FormattedMessage id="red" />
							</option>
							<option value="gray">
								<FormattedMessage id="gray" />
							</option>
							<option value="other">
								<FormattedMessage id="other" />
							</option>
						</select>

						<label htmlFor="eyeColor">
							<FormattedMessage id="eye color" />
						</label>
						<select
							id="eyeColor"
							name="eyeColor"
							onChange={handleInputChange}
							required
							value={userData.eyeColor}
						>
							<option value="">
								<FormattedMessage id="select" />
							</option>
							<option value="brown">
								<FormattedMessage id="brown" />
							</option>
							<option value="blue">
								<FormattedMessage id="blue" />
							</option>
							<option value="green">
								<FormattedMessage id="green" />
							</option>
							<option value="black">
								<FormattedMessage id="black" />
							</option>
							<option value="yellow">
								<FormattedMessage id="yellow" />
							</option>
							<option value="other">
								<FormattedMessage id="other" />
							</option>
						</select>

						<label htmlFor="school">
							<FormattedMessage id="school" />
						</label>
						<input
							id="school"
							name="school"
							onChange={handleInputChange}
							required
							type="text"
							value={userData.school}
						/>

						<label htmlFor="nationality">
							<FormattedMessage id = "nationality" />
						</label>
						<input
							id="nationality"
							name="nationality"
							onChange={handleInputChange}
							required
							type="text"
							value={userData.nationality}
						/>

						<label htmlFor="spokenLanguages">
							Limbi vorbite
						</label>
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
									<FormattedMessage id="delete" />
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
							<FormattedMessage id="languages" />
						</button>

						<label htmlFor="description_placeholder">
							<FormattedMessage id="description_placeholder" />
						</label>
						<textarea
							id="description"
							name="description"
							onChange={handleInputChange}
							value={userData.description}
						/>

						<label htmlFor="photos">
							<FormattedMessage id="photos" />
						</label>
						<label
							className={styles.upload}
							htmlFor="photos"
						>
							<FormattedMessage id="load photos" />
						</label>
				
						<input
							id="load photos"
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
											<FormattedMessage id="delete" />
										</div>
									</div>
								))}
							</div>
						) : null}

						<label htmlFor="password">
							Parolă
						</label>
						<input
							id="password"
							name="password"
							onChange={handleInputChange}
							required
							type="password"
							value={userData.password}
						/>

						<label htmlFor="confirmPassword">
							Confirmă parola
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

					<button type="submit">
						Creați un cont
					</button>
				</form>

				<div className={styles.bottom_section}>
					<h3>
						<Link href="/login">
							<FormattedMessage id="allready_have_account" />
						</Link>
					</h3>
				</div>
			</div>
		</div>
	);
};

export default Register;
