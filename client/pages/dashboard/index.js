import Link from "next/link";
import { useEffect, useState } from "react";

import MemberCard from "./member-card";

import styles from "../../styles/dashboard/member-card.module.scss";
import { getMembersData } from "../../config/firebase";

const Dashboard = () => {
	const [members, setMembers] = useState([]);

	useEffect(() => {
		getMembersData().then((data) => {
			setMembers(data);
		});
		console.log(members);
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
