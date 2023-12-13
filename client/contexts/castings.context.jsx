import { createContext, useContext, useState } from "react";

export const CastingsContext = createContext({});

export const useCastingsContext = () => {
	const castingsContext = useContext(CastingsContext);
	if (!castingsContext) throw new Error("Something went wrong with the React Context API!");
	return castingsContext;
};

export const CastingsContextProvider = ({ children }) => {
	const [callback, setCallback] = useState(false);
	const [castings, setCastings] = useState([]);

	const state = {
		callback,
		setCallback,
		castings,
		setCastings
	};

	return <CastingsContext.Provider value={state}>{children}</CastingsContext.Provider>;
};
