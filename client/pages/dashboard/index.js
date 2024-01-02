import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import MemberCard from "./member-card";
import styles from "../../styles/dashboard/member-card.module.scss";
import { useAuthContext } from "../../contexts/auth.context";
import { useDashboardContext } from "../../contexts/dashboard.context";

const Dashboard = () => {
	const { currentUser, logout, loading } = useAuthContext();
	const router = useRouter();
	const { filtered, setGenderFilter, setAgeRange, setHeightRange, setWeightRange } =
		useDashboardContext();

	if (loading) {
		return <div>Loading...</div>;
	}

	const handleGenderChange = (e) => {
		setGenderFilter(e.target.value);
	};

	const handleAgeChange = (e) => {
		const [minim, maxim] = e.target.value.split("-").map(Number);
		setAgeRange({ minim, maxim });
	};

	const handleHeightChange = (e) => {
		const [minim, maxim] = e.target.value.split("-").map(Number);
		setHeightRange({ minim, maxim });
	};

	const handleWeightChange = (e) => {
		const [min, max] = e.target.value.split("-").map(Number);
		setWeightRange({ min, max });
	};

	return (
		<>
			<div className={styles.container}>
				{/* UI controls for filters */}
				<select onChange={handleGenderChange}>
					<option value="">Select Gender</option>
					<option value="male">Male</option>
					<option value="female">Female</option>
					{/* Other gender options */}
				</select>

				<select onChange={handleAgeChange}>
					<option value="">Select Age</option>
					<option value="18-25">18-25</option>
					<option value="25-35">25-35</option>
					{/* Other age options */}
				</select>

				<select onChange={handleHeightChange}>
					<option value="">Select Height</option>
					<option value="150-160">150-160</option>
					<option value="160-170">160-170</option>
					{/* Other height options */}
				</select>

				<select onChange={handleWeightChange}>
					<option value="">Select Weight</option>
					<option value="50-60">50-60</option>
					<option value="60-70">60-70</option>
					{/* Other weight options */}
				</select>

				{/* UI controls for filters */}

				<div className={styles.container}>
					<h1 className={styles.header}>Membrii Inscrisi</h1>
					<div className={styles.tableHeader}>
						<div>Poza</div>
						<div>Sex</div>
						<div>Varsta</div>
						<div>Inaltime</div>
						<div>Greutate</div>
					</div>
					{filtered.map((member) => (
						<div
							key={member.id}
							className={styles.memberCard}
						>
							<Link href={`/dashboard/member/${member.uid}`}>
								<MemberCard member={member} />
							</Link>
						</div>
					))}
				</div>
				<button
					className={styles.logout}
					onClick={logout}
				>
					Logout
				</button>
			</div>
		</>
	);
};

export default Dashboard;
