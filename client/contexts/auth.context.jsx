import { createContext, useContext, useState } from "react";

const userInitialState = {
	_id: "",
	email: "",
	username: ""
};

export const AuthContext = createContext({});

export const useAuthContext = () => {
	const authContext = useContext(AuthContext);
	if (!authContext) throw new Error("Something went wrong with the React Context API!");
	return authContext;
};

export const AuthContextProvider = ({ children }) => {
	const [callback, setCallback] = useState(false);
	const [user, setUser] = useState(userInitialState);

	const state = {
		callback,
		setCallback,
		user,
		setUser
	};

	return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
};
