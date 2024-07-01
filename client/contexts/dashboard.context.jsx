import { createContext, useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import { useAuthContext, checkIfAdmin } from "../contexts/auth.context";
import { format } from "path";
import Fuse from "fuse.js";

export const DashboardContext = createContext({});

export const useDashboardContext = () => {
	const dashboardContext = useContext(DashboardContext);
	if (!dashboardContext) {
		throw new Error(
			"useDashboardContext must be used within a DashboardContextProvider"
		);
	}
	return dashboardContext;
};

export const DashboardContextProvider = ({ children }) => {
	//

	const { currentUser, loading } = useAuthContext();
	const router = useRouter();

	const [members, setMembers] = useState([]);
	const [filtered, setFiltered] = useState([]);
	const [genderFilter, setGenderFilter] = useState("");
	const [ageRange, setAgeRange] = useState({ min: null, max: null });
	const [heightRange, setHeightRange] = useState({ min: null, max: null });
	const [weightRange, setWeightRange] = useState({ min: null, max: null });
	const [name, setName] = useState("");
	const [language, setLanguage] = useState("");

	const FormatUsersByDate = (users = []) => {
		users.sort((a, b) => {
			try {
				const dateAParts = a.creationDate
					? a.creationDate.split("/")
					: ["Invalid"];
				const dateBParts = b.creationDate
					? b.creationDate.split("/")
					: ["Invalid"];

				const yearA = parseInt(dateAParts[2], 10) + 2000;
				const yearB = parseInt(dateBParts[2], 10) + 2000;
				const dateA = new Date(yearA, dateAParts[1] - 1, dateAParts[0]);
				const dateB = new Date(yearB, dateBParts[1] - 1, dateBParts[0]);

				return dateB - dateA;
			} catch (error) {
				console.log(error);
			}
		});
		return users;
	};
	const FormatUsersByAuthDate = (users = []) => {
		users.sort((a, b) => {
			if (
				a.auth_timestamp == null ||
				b.auth_timestamp == null ||
				a.auth_timestamp === undefined ||
				b.auth_timestamp === undefined
			) {
				return 0;
			} else return b.auth_timestamp - a.auth_timestamp;
		});

		return users;
	};

	const getMembersData = async () => {
		const arr = [];
		const querySnapshot = await getDocs(collection(db, "users"));
		querySnapshot.forEach((doc) => {
			arr.push(doc.data());
		});

		return arr;
	};

	const resetAllFilters = () => {
		setGenderFilter("");
		setAgeRange({ min: null, max: null });
		setHeightRange({ min: null, max: null });
		setWeightRange({ min: null, max: null });
		setName("");
		setLanguage("");
	};

	useEffect(() => {
		const checkAdminAndFetchMembers = async () => {
			if (!currentUser || loading) {
				return;
			}

			try {
				const isAdminUser = await checkIfAdmin(currentUser.uid);
				if (isAdminUser) {
					const membersData = await getMembersData();
					const actualMembersData = membersData.filter(
						(member) => member.varsta !== null
					);
					setMembers(actualMembersData);
					setMembers(FormatUsersByAuthDate(membersData));
				} else {
					router.push("/profile/[uid]", `/profile/${currentUser.uid}`);
				}
			} catch (error) {
				console.error("Error in Dashboard: ", error);
			}
		};

		checkAdminAndFetchMembers();
	}, [currentUser, loading]);

	const options = {
		includeScore: true,
		threshold: 0.2, // Adjust the threshold as needed (lower is more strict)
		keys: ["name"]
	};

	const knownLanguages = [
		"English",
		"Engleză",
		"French",
		"Franceză",
		"German",
		"Germană",
		"Spanish",
		"Spaniolă",
		"Romanian",
		"Română",
		"Italian",
		"Italiană",
		"Russian",
		"Rusă",
		"Hungarian",
		"Maghiară",
		"Arabic",
		"Arabă",
		"Chinese",
		"Chineză",
		"Greek",
		"Greacă",
		"Portuguese",
		"Portugheză",
		"Bulgarian",
		"Bulgară",
		"Hindi",
		"Hindi",
		"Korean",
		"Coreeană",
		"Turkish",
		"Turcă",
		"Ukrainian",
		"Ucraineană",
		"Persian",
		"Persană",
		"Punjabi",
		"Punjabi",
		"Urdu",
		"Urdu"
	];
	const isSpecificLanguage = (words, targetLanguage, threshold = 80) => {
		// Pair known languages into objects with English and Romanian names
		const pairedLanguages = [];
		for (let i = 0; i < knownLanguages.length; i += 2) {
			pairedLanguages.push({
				english: knownLanguages[i],
				romanian: knownLanguages[i + 1]
			});
		}

		// Filter the paired languages for the target language
		const targetLanguages = pairedLanguages
			.filter(
				(pair) =>
					pair.english.toLowerCase() === targetLanguage.toLowerCase() ||
					pair.romanian.toLowerCase() === targetLanguage.toLowerCase()
			)
			.flatMap((pair) => [pair.english, pair.romanian]);

		// Initialize Fuse with the filtered list
		const fuse = new Fuse(
			targetLanguages.map((lang) => ({ name: lang })),
			options
		);

		// Preprocess the input words to split them into individual words
		const splitWords = words.flatMap((word) => word.split(/\s+/));

		// Check each word in the array
		for (const word of splitWords) {
			const result = fuse.search(word);
			if (result.length > 0 && (1 - result[0].score) * 100 >= threshold) {
				return true;
			}
		}
		return false;
	};
	useEffect(() => {
		resetAllFilters();
	}, [router]);

	useEffect(() => {
		let filteredMembers = FormatUsersByAuthDate([...members]);

		if (genderFilter) {
			filteredMembers = filteredMembers.filter(
				(member) => member.gender === genderFilter
			);
		}

		if (language !== "") {
			filteredMembers = filteredMembers.filter((member) =>
				isSpecificLanguage(member.spokenLanguages, language)
			);
		}

		filteredMembers = filteredMembers.filter((member) => {
			return (
				(!ageRange.min ||
					ComputeAge(member.dateOfBirth) >= Number(ageRange.min)) &&
				(!ageRange.max ||
					ComputeAge(member.dateOfBirth) <= Number(ageRange.max))
			);
		});

		filteredMembers = filteredMembers.filter((member) => {
			return (
				(!heightRange.min || member.height >= heightRange.min) &&
				(!heightRange.max || member.height <= heightRange.max)
			);
		});

		filteredMembers = filteredMembers.filter((member) => {
			return (
				(!weightRange.min || member.weight >= weightRange.min) &&
				(!weightRange.max || member.weight <= weightRange.max)
			);
		});

		filteredMembers = filteredMembers.filter((member) => {
			return !name || member.name.toLowerCase().includes(name.toLowerCase());
		});

		setFiltered(filteredMembers);
	}, [
		genderFilter,
		ageRange,
		heightRange,
		weightRange,
		members,
		members,
		name,
		language
	]);

	const ComputeAge = (dateString) => {
		const today = new Date();
		const birthDate = new Date(dateString);
		let age = today.getFullYear() - birthDate.getFullYear();
		const month = today.getMonth() - birthDate.getMonth();
		if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
			age--;
		}
		return age;
	};

	const contextValue = {
		members,
		setMembers,
		filtered,
		setFiltered,
		genderFilter,
		setGenderFilter,
		ageRange,
		setAgeRange,
		heightRange,
		setHeightRange,
		weightRange,
		setWeightRange,
		ComputeAge,
		resetAllFilters,
		name,
		setName,
		FormatUsersByDate,
		FormatUsersByAuthDate,
		setLanguage
	};

	return (
		<DashboardContext.Provider value={contextValue}>
			{children}
		</DashboardContext.Provider>
	);
};
