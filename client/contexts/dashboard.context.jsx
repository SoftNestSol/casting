import { createContext, useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import { useAuthContext, checkIfAdmin } from "../contexts/auth.context";
import { format } from "path";

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
        // Sort in descending order based on auth_timestamp
        return b.auth_timestamp - a.auth_timestamp;
    });

    for (let i = 0; i < users.length; i++) {
        console.log(users[i].auth_timestamp);
    }

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
					const actualMembersData = membersData.filter(member => member.varsta !== null);
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
		name
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
	};

	return (
		<DashboardContext.Provider value={contextValue}>
			{children}
		</DashboardContext.Provider>
	);
};
