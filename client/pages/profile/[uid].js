import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { deleteObject, getDownloadURL, ref, refFromURL, uploadBytes } from "firebase/storage";

import { useAuthContext } from "../../contexts/auth.context";
import { db, storage } from "../../config/firebase";

import styles from "../../styles/profile/profile.module.scss";

const profileDataInitialState = {
	name: "",
	email: "",
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

const securityDataInitialState = {
	currentPassword: "",
	newPassword: "",
	confirmPassword: ""
};

const ProfilePage = () => {
	const [section, setSection] = useState("profile");
	const [profileData, setProfileData] = useState(profileDataInitialState);
	const [initialPhotos, setInitialPhotos] = useState([]);
	const [securityData, setSecurityData] = useState(securityDataInitialState);

	const router = useRouter();
	const { uid } = router.query;

	const { currentUser, loading, logout, changePassword } = useAuthContext();

	useEffect(() => {
		if (!currentUser || !uid || currentUser.uid !== uid) return;

		const fetchData = async () => {
			try {
				const user = await getDoc(doc(db, "users", uid));
				if (!user.exists()) return;

				setProfileData({
					...user.data(),
					email: currentUser.email,
					files: []
				});
				setInitialPhotos(user.data().photos);
			} catch (error) {
				console.error(error);
			}
		};

		fetchData();
	}, [uid, currentUser]);

	const handleProfileInputChange = (event) => {
		setProfileData({ ...profileData, [event.target.name]: event.target.value });
	};

	const handleSpokenLanguagesInputChange = (event, index) => {
		setProfileData((prevState) => {
			const updatedLanguages = [...prevState.spokenLanguages];
			updatedLanguages[index] = event.target.value;
			return { ...prevState, spokenLanguages: updatedLanguages };
		});
	};

	const handleFileInputChange = (event) => {
		[...event.target.files].forEach((file) => {
			const reader = new FileReader();

			reader.onload = () =>
				setProfileData((prevState) => ({
					...prevState,
					photos: [reader.result, ...prevState.photos],
					files: [file, ...prevState.files]
				}));

			reader.readAsDataURL(file);
		});
	};

	const handleSecurityInputChange = (event) => {
		setSecurityData({ ...securityData, [event.target.name]: event.target.value });
	};

	const handleFormSubmit = async (event) => {
		event.preventDefault();

		try {
			if (section === "profile") {
				const photos = await Promise.all(
					profileData.files.map(async (file) => {
						const photoRef = ref(storage, `photos/${uid}/${file.name}`);
						const snapshot = await uploadBytes(photoRef, file);
						return getDownloadURL(snapshot.ref);
					})
				);

				delete profileData.files;

				profileData.photos.forEach((photo) => photo.startsWith("https://") && photos.push(photo));

				initialPhotos.forEach(async (photo) => {
					if (!photos.includes(photo)) {
						const photoRef = ref(storage, photo);
						await deleteObject(photoRef);
					}
				});

				await updateDoc(doc(db, "users", uid), {
					...profileData,
					photos
				});

				alert("Datele au fost actualizate cu succes!");
			}

			if (section === "security") {
				if (securityData.newPassword !== securityData.confirmPassword)
					return alert("Parolele nu sunt identice!");

				await changePassword(securityData.currentPassword, securityData.newPassword);
				setSecurityData(securityDataInitialState);

				alert("Parola a fost schimbata cu succes!");
			}
		} catch (error) {
			console.error(error);
		}
	};

	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<div className={styles.wrapper}>
			<div className={styles.container}>
				<div className={styles.sidebar}>
					<ul>
						<li
							className={section === "profile" ? styles.active : ""}
							onClick={() => setSection("profile")}
						>
							Profilul meu
						</li>

						<li
							className={section === "security" ? styles.active : ""}
							onClick={() => setSection("security")}
						>
							Securitate
						</li>
					</ul>

					<button onClick={logout}>Deconectare</button>
				</div>

				<div className={styles.content}>
					{section === "profile" ? <h1>Profilul meu</h1> : null}
					{section === "security" ? <h1>Securitate</h1> : null}

					<form onSubmit={handleFormSubmit}>
						{section === "profile" ? (
							<div className={styles.fields}>
								<label htmlFor="name">Nume</label>
								<input
									id="name"
									name="name"
									onChange={handleProfileInputChange}
									required
									type="text"
									value={profileData.name}
								/>

								<label htmlFor="email">Email</label>
								<input
									id="email"
									name="email"
									onChange={handleProfileInputChange}
									required
									type="email"
									value={profileData.email}
								/>

								<label htmlFor="phoneNumber">Telefon</label>
								<input
									id="phoneNumber"
									name="phoneNumber"
									onChange={handleProfileInputChange}
									required
									type="text"
									value={profileData.phoneNumber}
								/>

								<label htmlFor="county">Judet</label>
								<input
									id="county"
									name="county"
									onChange={handleProfileInputChange}
									required
									type="text"
									value={profileData.county}
								/>

								<label htmlFor="city">Oras</label>
								<input
									id="city"
									name="city"
									onChange={handleProfileInputChange}
									required
									type="text"
									value={profileData.city}
								/>

								<label htmlFor="gender">Gen</label>
								<select
									id="gender"
									name="gender"
									onChange={handleProfileInputChange}
									required
									value={profileData.gender}
								>
									<option value="">Selecteaza...</option>
									<option value="male">Masculin</option>
									<option value="female">Feminin</option>
								</select>

								<label htmlFor="dateOfBirth">Data nasterii</label>
								<input
									id="dateOfBirth"
									name="dateOfBirth"
									onChange={handleProfileInputChange}
									required
									type="date"
									value={profileData.dateOfBirth}
								/>

								<label htmlFor="height">Inaltime</label>
								<input
									id="height"
									name="height"
									onChange={handleProfileInputChange}
									required
									type="text"
									value={profileData.height}
								/>

								<label htmlFor="weight">Greutate</label>
								<input
									id="weight"
									name="weight"
									onChange={handleProfileInputChange}
									required
									type="text"
									value={profileData.weight}
								/>

								<label htmlFor="hairColor">Culoare par</label>
								<select
									id="hairColor"
									name="hairColor"
									onChange={handleProfileInputChange}
									required
									value={profileData.hairColor}
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
									onChange={handleProfileInputChange}
									required
									value={profileData.eyeColor}
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
									onChange={handleProfileInputChange}
									required
									type="text"
									value={profileData.school}
								/>

								<label htmlFor="nationality">Nationalitate</label>
								<input
									id="nationality"
									name="nationality"
									onChange={handleProfileInputChange}
									required
									type="text"
									value={profileData.nationality}
								/>

								<label htmlFor="spokenLanguages">Limbi vorbite</label>
								{profileData.spokenLanguages.map((language, index) => (
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
												const spokenLanguages = profileData.spokenLanguages;
												spokenLanguages.splice(index, 1);
												setProfileData({ ...profileData, spokenLanguages });
											}}
											type="button"
										>
											Sterge
										</button>
									</div>
								))}
								<button
									onClick={() => {
										setProfileData({
											...profileData,
											spokenLanguages: [...profileData.spokenLanguages, ""]
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
									onChange={handleProfileInputChange}
									value={profileData.description}
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

								{profileData.photos.length > 0 ? (
									<div className={styles.photos}>
										{profileData.photos.map((photo, index) => (
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
														const photos = profileData.photos;
														const files = profileData.files;
														photos.splice(index, 1);
														files.splice(index, 1);
														setProfileData({ ...profileData, photos, files });
													}}
												>
													Sterge
												</div>
											</div>
										))}
									</div>
								) : null}
							</div>
						) : null}

						{section === "security" ? (
							<div className={styles.fields}>
								<label htmlFor="currentPassword">Parola actuala</label>
								<input
									id="currentPassword"
									name="currentPassword"
									onChange={handleSecurityInputChange}
									type="password"
									value={securityData.currentPassword}
								/>

								<label htmlFor="newPassword">Parola noua</label>
								<input
									id="newPassword"
									name="newPassword"
									onChange={handleSecurityInputChange}
									type="password"
									value={securityData.newPassword}
								/>

								<label htmlFor="confirmPassword">Confirma parola</label>
								<input
									id="confirmPassword"
									name="confirmPassword"
									onChange={handleSecurityInputChange}
									type="password"
									value={securityData.confirmPassword}
								/>
							</div>
						) : null}

						<button type="submit">Salveaza modificarile</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default ProfilePage;
