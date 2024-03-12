import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import MemberCard from "./member-card";
import styles from "../../styles/dashboard/member-card.module.scss";
import { useAuthContext } from "../../contexts/auth.context";
import { useDashboardContext } from "../../contexts/dashboard.context";
import { db, aggregationsCollection } from "../../config/firebase";
import { doc, getDoc } from "firebase/firestore";

const Dashboard = () => {
	const { currentUser, logout, loading } = useAuthContext();
	const router = useRouter();

	const getNumberOfMembers = async () => {
		const docRef = doc(db, "aggregates", "100");
		const docSnap = await getDoc(docRef);

		const numberOfMembers = await docSnap.data().userCounter;

		return numberOfMembers;
	};

	const [numberOfMembers, setNumberOfMembers] = useState(0);

	useEffect(() => {
		getNumberOfMembers().then((numberOfMembers) => {
			setNumberOfMembers(numberOfMembers);
		});
	}, []);

	const {
		filtered,
		setGenderFilter,
		setAgeRange,
		setHeightRange,
		setWeightRange,
		resetAllFilters,
		name,
		setName
	} = useDashboardContext();

	if (loading) {
		return <div>Loading...</div>;
	}

	const handleGenderChange = (e) => {
		setGenderFilter(e.target.value);
	};

	const handleNameChange = (e) => {
		setName(e.target.value);
	};

	const handleAgeChange = (e) => {
		const [min, max] = e.target.value.split("-").map(Number);
		setAgeRange({ min, max });
	};

	const handleHeightChange = (e) => {
		const [min, max] = e.target.value.split("-").map(Number);
		setHeightRange({ min, max });
	};

	const handleWeightChange = (e) => {
		const [min, max] = e.target.value.split("-").map(Number);
		setWeightRange({ min, max });
	};

	return (
		<>
			<div className={styles.container}>
				<div className={styles.selection}>
					<select onChange={handleGenderChange}>
						<option value="">Select Gender</option>
						<option value="male">Male</option>
						<option value="female">Female</option>
					</select>

					<select onChange={handleAgeChange}>
						<option value="">Select Age</option>
						<option value="1-18">1-18</option>
						<option value="18-25">18-25</option>
						<option value="25-30">25-30</option>
						<option value="35-40">35-40</option>
						<option value="40-50">40-50</option>
						<option value="50-100">50-100</option>
					</select>

					<select onChange={handleHeightChange}>
						<option value="">Select Height</option>
						<option value="130-140">130-140</option>
						<option value="140-150">140-150</option>
						<option value="150-160">150-160</option>
						<option value="160-170">160-170</option>
						<option value="170-180">170-180</option>
						<option value="180-190">180-190</option>
						<option value="190-200">190-200</option>
					</select>

					<select onChange={handleWeightChange}>
						<option value="">Select Weight</option>
						<option value="50-60">50-60</option>
						<option value="60-70">60-70</option>
						<option value="70-80">70-80</option>
						<option value="80-90">80-90</option>
						<option value="90-100">90-100</option>
						<option value="100-110">100-110</option>
						<option value="110-120">110-120</option>
						<option value="120-200">120-200</option>
					</select>

					<button
						className={styles.button}
						onClick={() => resetAllFilters()}
					>
						Reset Filters
					</button>
				</div>

				<div className={styles.search}>
					<input
						type="text"
						placeholder="Search by name"
						onChange={handleNameChange}
					/>
				</div>

				<div className={styles.container}>
					<h1 className={styles.header}>
						Membrii Inscrisi :{numberOfMembers}{" "}
					</h1>
					<div className={styles.tableHeader}>
						<div>Index</div>
						<div>Poza</div>
						<div>Nume</div>
						<div>Sex</div>
						<div>Varsta</div>
						<div>Inaltime</div>
						<div>Greutate</div>
					</div>
					{filtered
						.filter((member) => member.name !== "")
						.map((member, index) => (
							<div
								key={member.uid}
								className={styles.memberCard}
							>
								<Link href={`/dashboard/member/${member.uid}`}>
									<MemberCard
										member={member}
										index={Math.abs(index - filtered.filter((member => member.name  !== "")).length)}
									/>
								</Link>
							</div>
						))}
					{console.log("filtered", filtered)}
				</div>
			</div>
		</>
	);
};

export default Dashboard;
