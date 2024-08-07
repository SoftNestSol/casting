import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { useAuthContext } from "../../contexts/auth.context";

import styles from "../../styles/auth/auth.module.scss";
import { FormattedMessage } from "react-intl";

const LoadingCircle = () => {
	return (
		<div className={styles.loading}>
			<div className={styles.circle}></div>
		</div>
	);
};

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
	const [loading, setLoading] = useState(false);

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
			if (!file.name.match(/\.(jpg|jpeg|png)$/))
				return alert("Fisierul nu este o imagine!");

			const reader = new FileReader();

			reader.onload = () => {
				setUserData((prevState) => ({
					...prevState,
					photos: [reader.result, ...prevState.photos],
					files: [file, ...prevState.files]
				}));
			};

			reader.readAsDataURL(file);
		});
	};

	const handleFormSubmit = async (event) => {
		event.preventDefault();

		if (userData.spokenLanguages.length === 0)
			return alert("Add at least one spoken language!");
		if (userData.files.length === 0) return alert("Add at least one photo!");
		if (userData.files.length > 8 || userData.files.length < 5)
			return alert("between 5 and 8 photos allowed!");
		if (userData.password !== userData.confirmPassword) return;

		if (loading) return;
		setLoading(true);

		try {
			if (
				Object.values(userData).filter((value) => value !== "").length !==
				Object.keys(userData).length
			)
				throw new Error("No data");
			else {
				await signUp(userData);
				setLoading(false);
			}
		} catch (error) {
			alert(
				"A aparut o eroare la crearea contului! Verifica conexiunea la internet si incearca din nou si verifica daca ai completat toate campurile!"
			);
			setLoading(false);
		}
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
							<FormattedMessage id="weight" />
						</label>
						<input
							id="weight"
							name="weight"
							onChange={handleInputChange}
							required
							type="number"
							value={userData.weight}
						/>
						<label htmlFor="nationality">
							<FormattedMessage id="nationality" />
						</label>
						<input
							id="nationality"
							name="nationality"
							onChange={handleInputChange}
							required
							type="text"
							value={userData.nationality}
						/>
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
						<label htmlFor="spokenLanguages">
							<FormattedMessage id="spoken languages" />
						</label>
						{userData.spokenLanguages.map((language, index) => (
							<div
								className={styles.input_container}
								key={index}
							>
								<input
									id="spokenLanguages"
									name="spokenLanguages"
									onChange={(event) =>
										handleSpokenLanguagesInputChange(event, index)
									}
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
							<FormattedMessage id="address" />
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
							<FormattedMessage id="city" />
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
							<FormattedMessage id="gender" />
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

						<label htmlFor="hairColor">
							<FormattedMessage id="hair color" />
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

						<label htmlFor="description_placeholder">
							<FormattedMessage id="description_placeholder" />
						</label>
						<textarea
							id="description"
							name="description"
							onChange={handleInputChange}
							value={userData.description}
							required
						/>

						<label htmlFor="photos">
							<FormattedMessage id="photos" />
						</label>
						<label
							className={styles.upload}
							htmlFor="photos"
						>
							<FormattedMessage id="load photos" />
							<FormattedMessage id="photos constraints" />
						</label>

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
											<FormattedMessage id="delete" />
										</div>
									</div>
								))}
							</div>
						) : null}

						<label htmlFor="password">
							<FormattedMessage id="password" />
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
							<FormattedMessage id="confirm_password" />
							{userData.password !== userData.confirmPassword
								? " (parolele nu sunt identice)"
								: ""}
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
					&nbsp;
					<span>
						<input
							type="checkbox"
							id="terms"
							name="terms"
							required
						/>
						&nbsp; &nbsp;
						<label htmlFor="terms">
							<Link href="/terms">
								<u>
									<FormattedMessage id="terms" />
								</u>
							</Link>
						</label>
					</span>
					{loading ? (
						<LoadingCircle />
					) : (
						<button type="submit">
							<FormattedMessage id="register" />
						</button>
					)}
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
