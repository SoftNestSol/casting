import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "../../../styles/profile/profile.module.scss";
import { getMembersData } from "../../../config/firebase";
import { getUserData } from "../../../config/firebase";

const MemberPage = () => {


	const [user, setUser] = useState(null);
	const router = useRouter();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (!router.isReady) return;

		const uid = router.query.uid;
		setLoading(true);

		getUserData(uid)
			.then((userData) => {
				setUser(userData);
				setLoading(false);
			})
			.catch((error) => {
				console.error("Error fetching user data: ", error);
				setLoading(false);
			});
	}, [router.isReady, router.query.uid]);

	if (loading) {
		return <div>Loading...</div>;
	}

	if (!user) {
		return <div>No user data found.</div>;
	}

	console.log(user);

	return (
		<div className={styles.wrapper}>
			<div className={styles.container}>
				<div className={styles.content}>
					<h1>Profilul meu</h1>
					<div className={styles.fields}>
						<p>
							<strong>Nume:</strong> {user.name}
						</p>
						<p>
							<strong>Email:</strong> {user.email}
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
							<strong>Data nasterii:</strong> {user.dateOfBirth}
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
							<strong>Lungime par:</strong> {user.hairLength}
						</p>
						<p>
							<strong>Culoare ochi:</strong> {user.eyeColor}
						</p>
						<p>
							<strong>Descriere:</strong> {user.description}
						</p>

						{user.photos && user.photos.length > 0 && (
							<div className={styles.photos}>
								{user.photos.map((photo, index) => (
									<div
										className={styles.photo}
										key={index}
									>
										<Image
											alt={`Photo ${index + 1}`}
											src={photo}
											height={125}
											width={100}
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
