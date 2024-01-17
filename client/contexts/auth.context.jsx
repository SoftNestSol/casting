import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
	onAuthStateChanged,
	browserLocalPersistence,
	createUserWithEmailAndPassword,
	EmailAuthProvider,
	reauthenticateWithCredential,
	setPersistence,
	signInWithEmailAndPassword,
	signOut,
	updatePassword,
	sendPasswordResetEmail
} from "firebase/auth";
import { adminsCollection, aggregationsCollection, db } from "../config/firebase";
import { doc, setDoc, getDoc, updateDoc, increment } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

import { auth, storage, usersCollection } from "../config/firebase";

export const AuthContext = createContext({});

export const useAuthContext = () => {
	const authContext = useContext(AuthContext);
	if (!authContext)
		throw new Error("Something went wrong with the React Context API!");
	return authContext;
};

export const resizedName = (fileName) => {
	const lastDotIndex = fileName.lastIndexOf(".");
	const resizedName =
		fileName.substring(0, lastDotIndex) +
		"_600x800" +
		fileName.substring(lastDotIndex);
	return resizedName;
};

export const checkIfAdmin = async (uid) => {
	const docRef = doc(adminsCollection, uid);
	const docSnap = await getDoc(docRef);

	return docSnap.exists();
};

export const AuthContextProvider = ({ children }) => {
	const [loading, setLoading] = useState(true);
	const [currentUser, setCurrentUser] = useState();

	const router = useRouter();

	useEffect(() => {
		if (!router.isReady) return;
		setPersistence(auth, browserLocalPersistence);

		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setLoading(false);
			if (user) {
				setCurrentUser(user);

				if (router.pathname === "/dashboard" && !checkIfAdmin(user.uid)) {
					router.push(`/profile/${user.uid}`);
				}

				if (
					router.pathname === "/profile/[uid]" &&
					router.query.uid !== user.uid
				) {
					router.push(`/profile/${user.uid}`);
				}
			} else {
				if (router.pathname.startsWith("/profile")) {
					router.push(`/profile/${user.uid}`);
				} else if (router.pathname === "/dashboard") {
					router.push("/");
				}
			}
		});

		return () => unsubscribe();
	}, [router, auth]);

	const signUp = async (userData) => {
		try {
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				userData.email,
				userData.password
			);
			await setPersistence(auth, browserLocalPersistence);
			await signInWithEmailAndPassword(auth, userData.email, userData.password);

			const MAX_RETRIES = 3;

			const uploadPhotoWithRetry = async (file, attempt = 0) => {
				const photoRef = ref(
					storage,
					`photos/${userCredential.user.uid}/${file.name}`
				);

				try {
					const snapshot = await uploadBytes(photoRef, file);
					const url = await getDownloadURL(snapshot.ref);
				
					return resizedName(url);
				} catch (uploadError) {
					if (attempt < MAX_RETRIES) {
						console.warn(`Retry ${attempt + 1} for file:`, file.name);
						return await uploadPhotoWithRetry(file, attempt + 1);
					}

					console.error(
						"Final upload attempt failed for file:",
						file.name,
						uploadError
					);
					return null;
				}
			};

			const photoUploadPromises = userData.files.map((file) =>
				uploadPhotoWithRetry(file)
			);
			const photoResults = await Promise.all(photoUploadPromises);
			const photos = photoResults.filter((url) => url != null);

			delete userData.email;
			delete userData.password;
			delete userData.confirmPassword;
			delete userData.files;

			await setDoc(doc(usersCollection, userCredential.user.uid), {
				...userData,
				photos,
				uid: userCredential.user.uid
			});
			const docRef = doc(db, aggregationsCollection, "100");
			await updateDoc(docRef, { 
				userCounter: increment(1) 
			})
			setCurrentUser(userCredential.user);

			router.push(`/profile/${userCredential.user.uid}`);
			router.reload();
		} catch (error) {
			alert(error);
		}
	};

	const signIn = async (email, password) => {
		try {
			const userCredential = await signInWithEmailAndPassword(
				auth,
				email,
				password
			);
			setCurrentUser(userCredential.user);

			const isAdmin = await checkIfAdmin(userCredential.user.uid);
			if (isAdmin) {
				router.push("/dashboard");
			} else {
				router.push(`/profile/${userCredential.user.uid}`);
			}
		} catch (error) {
			alert(error);
		}
	};

	const logout = async () => {
		try {
			if (!currentUser) return;
			await signOut(auth);
			setCurrentUser(null);
			router.replace("/");
		} catch (error) {
			alert(error);
		}
	};

	const sendResetPasswordEmail = async (email) => {
		try {
			await sendPasswordResetEmail(auth, email);
		} catch (error) {
			alert(error);
		}
	};

	const changePassword = async (currentPassword, newPassword) => {
		try {
			const credential = EmailAuthProvider.credential(
				currentUser.email,
				currentPassword
			);
			await reauthenticateWithCredential(currentUser, credential);
			await updatePassword(currentUser, newPassword);
		} catch (error) {
			alert(error);
		}
	};

	const state = {
		// States
		currentUser,
		setCurrentUser,
		loading,
		setLoading,
		// Methods
		signUp,
		signIn,
		logout,
		changePassword,
		checkIfAdmin,
		resizedName,
		sendResetPasswordEmail
	};

	return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
};
