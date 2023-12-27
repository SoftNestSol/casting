import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { doc, getDoc, updateDoc } from "firebase/firestore";

import { useAuthContext } from "../../contexts/auth.context";
import { db } from "../../config/firebase";

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
	hairLength: "",
	eyeColor: "",
	description: ""
};

const securityDataInitialState = {
	currentPassword: "",
	newPassword: "",
	confirmPassword: ""
};

const ProfilePage = () => {
	const [section, setSection] = useState("profile");
	const [profileData, setProfileData] = useState(profileDataInitialState);
	const [securityData, setSecurityData] = useState(securityDataInitialState);

	const router = useRouter();
	const { uid } = router.query;

	const { currentUser, loading, logout, changePassword } = useAuthContext();

	useEffect(() => {
		if (!currentUser || !uid || currentUser.uid !== uid) return;

		const fetchData = async () => {
			try {
				const user = await getDoc(doc(db, "users", uid));
				if (user.exists())
					setProfileData({
						...user.data(),
						email: currentUser.email
					});
			} catch (error) {
				console.error(error);
			}
		};

		fetchData();
	}, [uid, currentUser]);

	const handleProfileInputChange = (event) => {
		setProfileData({ ...profileData, [event.target.name]: event.target.value });
	};

	const handleSecurityInputChange = (event) => {
		setSecurityData({ ...securityData, [event.target.name]: event.target.value });
	};

	const handleFormSubmit = async (event) => {
		event.preventDefault();

		try {
			if (section === "profile") {
				await updateDoc(doc(db, "users", uid), profileData);
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

								<label htmlFor="gender">Gender</label>
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

								<label htmlFor="hairLength">Lungime par</label>
								<select
									id="hairLength"
									name="hairLength"
									onChange={handleProfileInputChange}
									required
									value={profileData.hairLength}
								>
									<option value="">Selecteaza...</option>
									<option value="short">Scurt</option>
									<option value="medium">Mediu</option>
									<option value="long">Lung</option>
									<option value="bald">Chel</option>
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

								<label htmlFor="description">Descriere</label>
								<textarea
									id="description"
									name="description"
									onChange={handleProfileInputChange}
									value={profileData.description}
								/>
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
