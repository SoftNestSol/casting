import { use, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { doc, getDoc } from "firebase/firestore";

import { db } from "../../../config/firebase";
import { useDashboardContext } from "../../../contexts/dashboard.context";
import { storage } from "../../../config/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { resizedName } from "../../../contexts/auth.context";
import { updateDoc } from "firebase/firestore";
import { useRef } from "react";

import photoStyles from "../../../styles/dashboard/photo.module.scss";

const MemberPage = () => {
	const [user, setUser] = useState(null);
	const router = useRouter();
	const [hasVideo, setHasVideo] = useState(false);
	const [loading, setLoading] = useState(true);
	const [expanded, setExpanded] = useState(-1);
	const [profileData, setProfileData] = useState({
		photos: [],
		files: [],
		videoURL: ""
	});

	const openFilePicker = () => {
		inputRef.current.click();
	};

	const inputRef = useRef(null);

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

	const handleVideoInputChange = (event) => {
		setProfileData((prevState) => ({
			...prevState,
			videoURL: event.target.value
		}));
		setHasVideo(true);
	};

	useEffect(() => {
		if (!router.isReady) return;

		const uid = router.query.uid;

		getUserData(uid)
			.then((userData) => {
				setUser(userData);
				setProfileData((prevState) => ({
					...prevState,
					photos: userData.photos,
					videoURL: userData.videoURL
				}));
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

	const handleFileInputChange = (event) => {
		[...event.target.files].forEach((file) => {
			if (!file.name.match(/\.(jpg|jpeg|png)$/))
				return alert("Fisierul nu este o imagine!");

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

	const deletePhoto = async (photoUrl) => {
		setProfileData((prevState) => ({
			...prevState,
			photos: prevState.photos.filter((photo) => photo !== photoUrl)
		}));

		const userRef = doc(db, "users", user.uid);
		const newPhotos = user.photos.filter((photo) => photo !== photoUrl);

		await updateDoc(userRef, {
			photos: newPhotos
		});

		setUser((prevState) => ({
			...prevState,
			photos: newPhotos
		}));
	};

	const uploadPhotos = async () => {
		const promises = profileData.files.map(async (file) => {
			const photoRef = ref(storage, `photos/${router.query.uid}/${file.name}`);
			const snapshot = await uploadBytes(photoRef, file);
			const url = await getDownloadURL(snapshot.ref);
			return resizedName(url);
		});

		const urls = await Promise.all(promises);

		const userRef = doc(db, "users", user.uid);
		await updateDoc(userRef, {
			photos: [...user.photos, ...urls],
			videoURL: profileData.videoURL
		});
		router.reload();
	};

	return (
		<div className={photoStyles.wrapper}>
			<div
				className={expanded !== -1 ? photoStyles.hidden : photoStyles.container}
			>
				<div className={photoStyles.content}>
					<h1>Profilul {user.name}</h1>
					<div className={photoStyles.fields}>
						<p>
							<strong>Nume:</strong> {user.name}
						</p>
						<p>
							<p>
								<strong>Varsta:</strong> {ComputeAge(user.dateOfBirth)}
							</p>
							<strong>Oras:</strong> {user.city}
						</p>
						<p>
							<strong>Greutate:</strong> {user.weight}
						</p>
						<p>
							<strong>Inaltime:</strong> {user.height}
						</p>
						<p>
							<strong>Nationalitate:</strong> {user.nationality}
						</p>
						<p>
							<strong>Ultima scoala absolvita:</strong> {user.school}
						</p>
						<p>
							<strong>Limbi straine:</strong>{" "}
							{user.spokenLanguages.map((language) => `${language} `)}
						</p>
						<p>
							<strong>Email:</strong> {user.email}
						</p>
						<p>
							<strong>Telefon:</strong> {user.phoneNumber}
						</p>
						<p>
							<strong>Culoare par:</strong> {user.hairColor}
						</p>

						<p>
							<strong>Culoare ochi:</strong> {user.eyeColor}
						</p>
						<p>
							<strong>Descriere:</strong> {user.description}
						</p>

						<div>
							<div className={photoStyles.photos}>
								{profileData.photos.map((photoUrl, index) => (
									<div>
										<div
											key={index}
											//	className={photoStyles.photo}
											onClick={() => {
												if (expanded === index) setExpanded(-1);
												else setExpanded(index);
											}}
										>
											<img
												className={
													expanded === index
														? photoStyles.expanded
														: photoStyles.photo
												}
												src={photoUrl}
												alt={`Photo ${index + 1}`}
											/>
										</div>
										<button
											className={photoStyles.removeButton}
											onClick={() => deletePhoto(photoUrl)}
										>
											Sterge
										</button>
									</div>
								))}
							</div>
							<div className={photoStyles.buttonsContainer}>
								<div>
									<button
										type="button"
										onClick={openFilePicker}
										className={photoStyles.uploadButton}
									>
										Alege pozele noi
									</button>

									<input
										ref={inputRef}
										id="photos"
										name="photos"
										onChange={handleFileInputChange}
										type="file"
										multiple
										style={{ display: "none" }}
									/>
								</div>
								<div className={photoStyles.youtubeContainer}>
									<label
										htmlFor="videoURL"
										className={photoStyles.label}
									>
										Introdu link-ul catre video-ul tau
									</label>
									<input
										type="text"
										id="videoURL"
										name="videoURL"
										value={profileData.videoURL}
										onChange={handleVideoInputChange}
										className={photoStyles.videoInput}
									/>
									<iframe
										className={photoStyles.video}
										width="560"
										height="315"
										src={profileData.videoURL}
										title="YouTube video player"
										frameborder="0"
										allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
										referrerpolicy="strict-origin-when-cross-origin"
										allowfullscreen="true"
									></iframe>
								</div>
								<button
									className={photoStyles.uploadButton}
									onClick={uploadPhotos}
								>
									Aplica Schimbari
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MemberPage;
