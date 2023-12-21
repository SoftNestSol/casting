import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
	onAuthStateChanged,
	browserLocalPersistence,
	createUserWithEmailAndPassword,
	setPersistence,
	signInWithEmailAndPassword,
	signOut
} from "firebase/auth";
import { addDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

import { auth, storage, usersCollection } from "../config/firebase";

export const AuthContext = createContext({});

export const useAuthContext = () => {
	const authContext = useContext(AuthContext);
	if (!authContext) throw new Error("Something went wrong with the React Context API!");
	return authContext;
};

export const AuthContextProvider = ({ children }) => {
	const [loading, setLoading] = useState(true);
	const [currentUser, setCurrentUser] = useState();

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
			delete userData.files;

			await addDoc(usersCollection, {
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
		try {
			const userCredential = await signInWithEmailAndPassword(auth, email, password);
			setCurrentUser(userCredential.user);
			router.push(`/profile/${userCredential.user.uid}`);
		} catch (error) {
			console.error(error.response.data.message);
		}
	};

	const logout = async () => {
		try {
			await signOut(auth);
			setCurrentUser(null);
			router.push("/");
		} catch (error) {
			console.error(error.response.data.message);
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
		logout
	};

	return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
};
