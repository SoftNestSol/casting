import { createContext, useState, useEffect, useContext } from "react";
import { getMembersData } from "../config/firebase";
import { useAuthContext, checkIfAdmin } from "../contexts/auth.context";
import { useRouter } from "next/router";

export const DashboardContext = createContext({});

export const useDashboardContext = () => {
	const dashboardContext = useContext(DashboardContext);
	if (!dashboardContext) {
		throw new Error("useDashboardContext must be used within a DashboardContextProvider");
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

	useEffect(() => {
		const checkAdminAndFetchMembers = async () => {
			if (!currentUser || loading) {
				return;
			}

			try {
				const isAdminUser = await checkIfAdmin(currentUser.uid);
				if (isAdminUser) {
					const membersData = await getMembersData();
					setMembers(membersData);
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
		let filteredMembers = [...members];

		if (genderFilter) {
			filteredMembers = filteredMembers.filter((member) => member.gender === genderFilter);
		}

		filteredMembers = filteredMembers.filter((member) => {
			return (
				(!ageRange.min || ComputeAge(member.birthDate) >= ageRange.min) &&
				(!ageRange.max || ComputeAge(member.birthDate) <= ageRange.max)
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

		setFiltered(filteredMembers);
	}, [genderFilter, ageRange, heightRange, weightRange, members, members]);

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
		ComputeAge
	};

	return <DashboardContext.Provider value={contextValue}>{children}</DashboardContext.Provider>;
};
