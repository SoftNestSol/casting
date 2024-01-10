import { createContext, useContext, useEffect, useRef, useState } from "react";

export const CastingsContext = createContext({});

export const useCastingsContext = () => {
	const castingsContext = useContext(CastingsContext);
	if (!castingsContext)
		throw new Error("Something went wrong with the React Context API!");
	return castingsContext;
};

const sampleCasting = {
	title: "Figuratie speciala reclama farmacie",
	project: "Farmacie",
	lookingFor: ["Femei", "Barbati"],
	ageRange: [18, 30],
	startDate: new Date(2024, 0, 7),
	endDate: new Date(2024, 0, 10),
	location: "Bucuresti",
	compensation: 1200,
	country: "Romania",
	description:
		"Cautam femei si barbati figuratie speciala pentru o reclama la farmacie. Filmarile au loc in perioada 13-15 Noiembrie (1 sau 2 zile)."
};

const sampleCasting2 = {
	title: "Figuratie speciala reclama farmacie",
	project: "Farmacie",
	lookingFor: ["Femei", "Barbati"],
	ageRange: [18, 30],
	startDate: new Date(2024, 0, 14),
	endDate: new Date(2024, 0, 16),
	location: "Bucuresti",
	compensation: 1200,
	country: "Romania",
	description:
		"Cautam femei si barbati figuratie speciala pentru o reclama la farmacie. Filmarile au loc in perioada 13-15 Noiembrie (1 sau 2 zile)."
};

export const CastingsContextProvider = ({ children }) => {
	const [callback, setCallback] = useState(false);
	const [castings, setCastings] = useState([]);
	const setCastingsRef = useRef(false);

	const getRemainingDays = (endDate) => {
		endDate = new Date(endDate);
		const today = new Date();

		return Math.floor((endDate - today) / (1000 * 60 * 60 * 24)) - 1;
	};

	useEffect(() => {
		if (setCastingsRef.current) return;

		const castingsArray = [
			sampleCasting,
			sampleCasting2,
			sampleCasting,
			sampleCasting2
		];

		castingsArray.forEach((casting) => {
			casting.remainingDays = getRemainingDays(casting.endDate);

			if (casting.remainingDays > 0)
				setCastings((prevCastings) => [...prevCastings, casting]);
		});

		setCastingsRef.current = true;
	}, []);

	const state = {
		callback,
		setCallback,
		castings,
		setCastings
	};

	return (
		<CastingsContext.Provider value={state}>
			{children}
		</CastingsContext.Provider>
	);
};
