import { useState } from "react";
import { useRouter } from "next/router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {
	db,
	getDocs,
	uploadToStorage,
	getMembersData,
	storageRef,
	imagesRef,
	createNewPersonRef,
	uploadBytes,
	getDownloadURL,
	colRef,
	AddDoc,
	firebaseConfig,
	FirebaseApp,
	auth,
	signInWithEmailAndPassword,
	ref,
	storage,
	setDoc,
	doc
} from "../../contexts/firebase";

import styles from "../../styles/register/register.module.scss";
import { addDoc } from "firebase/firestore";

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
	const [error, setError] = useState("");
	const router = useRouter();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setUserData((prevState) => ({
			...prevState,
			[name]: value
		}));
	};

	const handleFileChange = (e) => {
		setUserData((prevState) => ({
			...prevState,
			files: [...e.target.files]
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				userData.email,
				userData.password
			);
			const uid = userCredential.user.uid;

			const imageArray = await Promise.all(
				userData.files.map(async (file) => {
					const storageRef = ref(storage, `photos/${uid}/${file.name}`);
					const snapshot = await uploadBytes(storageRef, file);
					return getDownloadURL(snapshot.ref);
				})
			);

			const userProfileData = {
				name: userData.name,
				age: userData.age,
				sex: userData.sex,
				height: userData.height,
				weight: userData.weight,
				eyeColor: userData.eyeColor,
				hairColor: userData.hairColor,
				description: userData.description,
				photos: imageArray
			};

			await setDoc(doc(db, "users", uid), userProfileData);

			router.push("/login");
		} catch (error) {
			setError(error.message);
		}
	};

	return (
		<div className={styles.container}>
			<h1 className={styles.h1}>Register</h1>
			{error && <p className={styles.error}>{error}</p>}
			<form
				onSubmit={handleSubmit}
				className={styles.form}
			>
				<label>Name</label>
				<input
					type="text"
					name="name"
					value={userData.name}
					onChange={handleChange}
				/>

				<label>Email</label>
				<input
					type="email"
					name="email"
					value={userData.email}
					onChange={handleChange}
				/>
				<label>Pasword</label>
				<input
					type="password"
					name="password"
					value={userData.password}
					onChange={handleChange}
				/>
				<label>Age</label>
				<input
					type="number"
					name="age"
					value={userData.age}
					onChange={handleChange}
				/>
				<label>Gender</label>
				<input
					type="text"
					name="sex"
					value={userData.sex}
					onChange={handleChange}
				/>
				<label>Height</label>
				<input
					type="number"
					name="height"
					value={userData.height}
					onChange={handleChange}
				/>
				<label>Weight</label>
				<input
					type="number"
					name="weight"
					value={userData.weight}
					onChange={handleChange}
				/>
				<label>EyeColor</label>
				<input
					type="text"
					name="eyeColor"
					value={userData.eyeColor}
					onChange={handleChange}
				/>
				<label>HairColor</label>
				<input
					type="text"
					name="hairColor"
					value={userData.hairColor}
					onChange={handleChange}
				/>
				<label>Select at least 3 photos</label>
				<input
					type="file"
					name="files"
					multiple
					onChange={handleFileChange}
				/>
				<label>Tell us something about you</label>
				<textarea
					name="description"
					value={userData.description}
					onChange={handleChange}
				></textarea>
				<button
					className={styles.button}
					type="submit"
				>
					Register
				</button>
			</form>
		</div>
	);
};

export default RegisterPage;
