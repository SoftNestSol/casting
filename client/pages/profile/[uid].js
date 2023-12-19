import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { db, doc, getDoc, setDoc } from "../../contexts/firebase";
import { useAuthContext } from "../../contexts/auth.context";
import styles from "../../styles/profile/profile.module.scss";

const UserProfile = () => {
	const router = useRouter();
	const { uid } = router.query;
	const [userData, setUserData] = useState({ name: "", age: "", photos: [] });
	const { currentUser, logout, loading } = useAuthContext();

	useEffect(() => {
		if (!loading) {
			if (!currentUser) {
				router.push("/login");
			} else if (currentUser.uid !== uid) {
				router.push(`/profile/${currentUser.uid}`);
			}
		}
	}, [currentUser, loading, uid, router]);

	useEffect(() => {
		const fetchData = async () => {
			if (uid) {
				try {
					const docRef = doc(db, "users", uid);
					const docSnap = await getDoc(docRef);

					if (docSnap.exists()) {
						setUserData(docSnap.data());
					} else {
						console.log("No such document!");
					}
				} catch (error) {
					console.error("Error fetching user data:", error);
				}
			}
		};

		if (currentUser && currentUser.uid === uid) {
			fetchData();
		}
	}, [uid, currentUser]);

	const handleInputChange = (e) => {
		setUserData({ ...userData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const docRef = doc(db, "users", uid);
			await setDoc(docRef, userData);
			alert("User data updated!");
		} catch (error) {
			console.error("Error updating user data:", error);
		}
	};

	if (loading || !userData) {
		return <div>Loading...</div>;
	}

	return (
		<div className={styles.container}>
			<h1>Edit Profile</h1>
			<form
				onSubmit={handleSubmit}
				className={styles.formControl}
			>
				<div className="mb-3">
					<label
						className={styles.formLabel}
						htmlFor="name"
					>
						Name:
					</label>
					<input
						type="text"
						className={styles.formControl}
						id="name"
						name="name"
						value={userData.name}
						onChange={handleInputChange}
					/>
				</div>
				<div className="mb-3">
					<label
						htmlFor="age"
						className={styles.formLabel}
					>
						Age:
					</label>
					<input
						type="number"
						className={styles.formControl}
						id="age"
						name="age"
						value={userData.age}
						onChange={handleInputChange}
					/>
				</div>
				<div>
					{userData.photos &&
						userData.photos.map((image, index) => (
							<img
								key={index}
								src={image}
								alt={`User photo ${index + 1}`}
								className={styles.imgThumbnail}
								width="200"
								height="200"
							/>
						))}
				</div>
				<button
					type="submit"
					className={`${styles.btn} ${styles.btnPrimary}`}
				>
					Save Changes
				</button>
			</form>
			<button
				onClick={logout}
				className={`${styles.btn} ${styles.btnSecondary}`}
			>
				Logout
			</button>
		</div>
	);
};

export default UserProfile;
