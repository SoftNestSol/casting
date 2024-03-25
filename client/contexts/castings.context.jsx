import { createContext, useContext, useEffect, useRef, useState } from "react";

export const CastingsContext = createContext({});

export const useCastingsContext = () => {
	const castingsContext = useContext(CastingsContext);
	if (!castingsContext)
		throw new Error("Something went wrong with the React Context API!");
	return castingsContext;
};
const desireUndercoverCasting = {
	title: "Desire Undercover",
	project: "Mini-Series",
	lookingFor: ["Femei", "Barbati"],
	ageRange: [23, 53],
	startDate: new Date(2024, 2, 26),
	endDate: new Date(2024, 3, 5),
	location: "Romania",
	compensation: "TBA",
	country: "WorldWide",
	description:
		"Desire Undercover is a high-stakes drama centered on a group of undercover agents. It follows Nico, a dashing half-Italian American with piercing eyes and an athletic build; Kody, a blond, medium-build techie with charm; and Faith, a serious yet friendly African-American woman. Carl and Donnie add experience with their weathered, professional demeanor. Silk, possibly Japanese, brings an edgy glamour. Jayda combines focus with athletic grace. Shooting begins in Romania, April 2024.",
	imageUrls: [
		"images/castings/test/1.jpg",
		"images/castings/test/2.jpg",
		"images/castings/test/3.jpg",
		"images/castings/test/4.jpg",
		"images/castings/test/5.jpg",
		"images/castings/test/6.jpg",
		"images/castings/test/7.jpg",
		"images/castings/test/8.jpg",
	]
};

const ceoCasting = {
	title: "Mafia CEO",
	project: "Mini-Series",
	lookingFor: ["Femei", "Barbati"],
	ageRange: [22, 50],
	startDate: new Date(2024, 2, 25),
	endDate: new Date(2024, 3, 10),
	location: "Romania",
	compensation: "TBA",
	country: "WorldWide",
	description:
		"Mafia CEO mini-series. Lead: Riley Murphy, 22, a smart college grad transforming from carefree to formidable. Needs depth and resilience. Co-Lead: Patrick Conner, 28, mob strategist, calm, with a deep, seductive voice. Supporting: Sean Murphy, 50, mob patriarch, strong but caring. Thomas Salvat, 24, sharp mob aide, tactician. Scott Shaw, 28, volatile enforcer with a muscular presence. Minor: Mary Perkins, 22, innocent, loyal, tragic. Dynamic roles, complex emotions, set in Romania, April 2024.",
	imageUrls: [
		"images/castings/casting-ceo/1.jpeg",
		"images/castings/casting-ceo/2.jpeg",
		"images/castings/casting-ceo/3.jpeg",
		"images/castings/casting-ceo/4.jpeg",
		"images/castings/casting-ceo/5.jpeg",
		"images/castings/casting-ceo/6.jpeg",
		"images/castings/casting-ceo/7.jpeg",
		"images/castings/casting-ceo/8.jpeg",
		"images/castings/casting-ceo/9.jpeg",
		"images/castings/casting-ceo/10.jpeg",
		"images/castings/casting-ceo/11.jpeg"
	]
};

export const CastingsContextProvider = ({ children }) => {
	const [callback, setCallback] = useState(false);
	const [castings, setCastings] = useState([]);
	const setCastingsRef = useRef(false);

	const getRemainingDays = (endDate) => {
		endDate = new Date(endDate);
		const today = new Date();

		return (Math.floor((endDate - today) / (1000 * 60 * 60 * 24)) - 1);
	};

	useEffect(() => {
		if (setCastingsRef.current) return;

		const castingsArray = [desireUndercoverCasting, ceoCasting];

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
