import { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import {auth}	from "./firebase"

export const AuthContext = createContext({});

export const useAuthContext = () => {
	const authContext = useContext(AuthContext);
	if (!authContext) throw new Error("Something went wrong with the React Context API!");
	return authContext;
};

export const AuthContextProvider = ({ children }) => {

	const [callback, setCallback] = useState(false);
	const [currentUser, setCurrentUser] = useState(null);        
	const [loading,setLoading] = useState(true);
	
	function register (email,password) { 
			return auth.createUserWithEmailAndPassword(email,password);
	}


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
	};

	return <AuthContext.Provider value={state}>{!loading && children}</AuthContext.Provider>;
};
