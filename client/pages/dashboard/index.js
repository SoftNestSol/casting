// Dashboard.js
import Link from "next/link";
import { useEffect, useState } from "react";
import MemberCard from "./member-card";

import styles from "../../styles/dashboard/member-card.module.scss";

const Dashboard = () => {
	const [members, setMembers] = useState([]);

	useEffect(() => {
		fetch("http://localhost:4000/getMembers", {
			method: "GET",
			credentials: "include"
		})
			.then((res) => res.json())
			.then((data) => {
				setMembers(data);
			});
	}, []);

	return (
		<div className={styles.container}>
			<h1 className={styles.header}>Membrii Inscrisi</h1>
			<div className={styles.tableHeader}>
				<div>Poza</div>
				<div>Sex</div>
				<div>Varsta</div>
				<div>Inaltime</div>
				<div>Greutate</div>
			</div>
			{members.map((member) => (
				<div
					key={member.id}
					className={styles.memberCard}
				>
					<Link href={`/dashboard/member/${member.id}`}>
						<MemberCard member={member} />
					</Link>
				</div>
			))}
		</div>
	);
};

export default Dashboard;
