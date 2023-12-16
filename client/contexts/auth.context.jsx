import { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase";
import { useRouter } from "next/router";

export const AuthContext = createContext({});

export const useAuthContext = () => {
	const authContext = useContext(AuthContext);
	if (!authContext) throw new Error("Something went wrong with the React Context API!");
	return authContext;
};

export const AuthContextProvider = ({ children }) => {
	const [callback, setCallback] = useState(false);
	const [currentUser, setCurrentUser] = useState(null);
	const [loading, setLoading] = useState(true);

	const router = useRouter();

	const logout = async () => {
		try {
			await signOut(auth);
			setCurrentUser(null);
			router.push("/login");
		} catch (error) {
			console.error("Error signing out: ", error);
			// Handle error (e.g., show error message)
		}
	};

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setCurrentUser(user);
			setLoading(false);
		});
		return () => unsubscribe;
	}, []);

	const state = {
		currentUser,
		setCurrentUser,
		loading,
		setLoading,
		callback,
		setCallback,
		logout
	};

	return <AuthContext.Provider value={state}>{!loading && children}</AuthContext.Provider>;
};
