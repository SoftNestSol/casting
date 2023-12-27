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
	updatePassword
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

import { auth, storage, usersCollection} from "../config/firebase";

export const AuthContext = createContext({});

export const useAuthContext = () => {
	const authContext = useContext(AuthContext);
	if (!authContext) throw new Error("Something went wrong with the React Context API!");
	return authContext;
};

export const AuthContextProvider = ({ children }) => {
	const [loading, setLoading] = useState(true);
	const [currentUser, setCurrentUser] = useState();
	const [isAdmin, setIsAdmin] = useState(false);

	const router = useRouter();

	useEffect(() => {
		setPersistence(auth, browserLocalPersistence);
		return () =>
			onAuthStateChanged(auth, (user) => {
				if (user === null) return;
				setCurrentUser(user);
				setLoading(false);
			});
	}, []);

	const signUp = async (userData) => {
		try {
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				userData.email,
				userData.password
			);

			const photos = await Promise.all(
				userData.files.map(async (file) => {
					const storageRef = ref(storage, `photos/${userCredential.user.uid}/${file.name}`);
					const snapshot = await uploadBytes(storageRef, file);
					return getDownloadURL(snapshot.ref);
				})
			);

			delete userData.email;
			delete userData.password;
			delete userData.confirmPassword;
			delete userData.files;

			await setDoc(doc(usersCollection, userCredential.user.uid), {
				...userData,
				photos
			});

			setCurrentUser(userCredential.user);
			router.push(`/profile/${userCredential.user.uid}`);
		} catch (error) {
			console.error(error);
		}
	};

	const signIn = async (email, password) => {
		if (email == "admin@mycasting.ro") {
			setIsAdmin(true);
		}
		console.log(isAdmin, email, "admin@mycasting.ro");

		if (isAdmin) {
			router.push("/dashboard");
			return;
		} else
			try {
				const userCredential = await signInWithEmailAndPassword(auth, email, password);
				setCurrentUser(userCredential.user);
				router.push(`/profile/${userCredential.user.uid}`);
			} catch (error) {
				console.error(error);
			}
	};

	const logout = async () => {
		try {
			await signOut(auth);
			setCurrentUser(null);
			router.push("/");
		} catch (error) {
			console.error(error);
		}
	};

	const changePassword = async (currentPassword, newPassword) => {
		try {
			const credential = EmailAuthProvider.credential(currentUser.email, currentPassword);
			await reauthenticateWithCredential(currentUser, credential);
			await updatePassword(currentUser, newPassword);
		} catch (error) {
			console.error(error);
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
		changePassword
	};

	return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
};
