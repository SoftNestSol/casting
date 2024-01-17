import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { doc, getDoc } from "firebase/firestore";

import { db } from "../../../config/firebase";
import { useDashboardContext } from "../../../contexts/dashboard.context";

import styles from "../../../styles/profile/profile.module.scss";
import photoStyles from "../../../styles/dashboard/photo.module.scss";

const MemberPage = () => {
	const [user, setUser] = useState(null);
	const [email, setEmail] = useState("");
	const router = useRouter();
	const [loading, setLoading] = useState(true);

	const { ComputeAge } = useDashboardContext();

	const getUserData = async (uid) => {
		const docRef = doc(db, "users", uid);
		const docSnap = await getDoc(docRef);

		if (docSnap.exists()) {
			return docSnap.data();
		} else
			try {
				throw new Error("No such document!");
			} catch {
				console.log("No such document!");
			}
	};

	useEffect(() => {
		if (!router.isReady) return;

		const uid = router.query.uid;

		getUserData(uid)
			.then((userData) => {
				setUser(userData);
			})
			.catch((error) => {
				console.error("Error fetching user data: ", error);
			})
			.finally(() => {
				setLoading(false);
			});
	}, [router.isReady, router.query.uid]);

	if (!user) {
		return <div>No user data found.</div>;
	}

	console.log(user);

	return (
		<div className={styles.wrapper}>
			<div className={styles.container}>
				<div className={styles.content}>
					<h1>Profilul {user.name}</h1>
					<div className={styles.fields}>
						<p>
							<strong>Nume:</strong> {user.name}
						</p>
						<p>
							<strong>Email:</strong> {email}
						</p>
						<p>
							<strong>Telefon:</strong> {user.phoneNumber}
						</p>
						<p>
							<strong>Judet:</strong> {user.county}
						</p>
						<p>
							<strong>Oras:</strong> {user.city}
						</p>
						<p>
							<strong>Gen:</strong> {user.gender}
						</p>
						<p>
							<strong>Varsta:</strong> {ComputeAge(user.dateOfBirth)}
						</p>
						<p>
							<strong>Inaltime:</strong> {user.height}
						</p>
						<p>
							<strong>Greutate:</strong> {user.weight}
						</p>
						<p>
							<strong>Culoare par:</strong> {user.hairColor}
						</p>
						<p>
							<strong>Nationalitate:</strong> {user.nationality}
						</p>
						<p>
							<strong>Culoare ochi:</strong> {user.eyeColor}
						</p>
						<p>
							<strong>Descriere:</strong> {user.description}
						</p>
						<p>
							<strong>Ultima scoala absolvita:</strong> {user.school}
						</p>
						<p>
							<strong>Limbi straine:</strong>{" "}
							{user.spokenLanguages.map((language) => `${language} `)}
						</p>

						{user.photos && user.photos.length > 0 && (
							<div className={photoStyles.photos}>
								{user.photos.map((photo, index) => (
									<div
										className={styles.photo}
										key={index}
									>
										<img
											alt={`Photo ${index + 1}`}
											src={photo}
											className={photoStyles.photo}
										/>
									</div>
								))}
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default MemberPage;
