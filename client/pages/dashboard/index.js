import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import MemberCard from "./member-card";
import styles from "../../styles/dashboard/member-card.module.scss";
import { getMembersData } from "../../config/firebase";
import { useAuthContext, checkIfAdmin } from "../../contexts/auth.context";
import useAuthRedirect from "../../components/redirect-hook";

const Dashboard = () => {
	useAuthRedirect("/login", (user) => user && checkIfAdmin(user.uid));
	const [members, setMembers] = useState([]);
	const { currentUser, logout } = useAuthContext();
	const router = useRouter();

	useEffect(() => {
		const checkAdminAndFetchMembers = async () => {
			if (!currentUser) {
				router.push("/login");
				return;
			}

			try {
				const isAdminUser = await checkIfAdmin(currentUser.uid);
				if (!isAdminUser) {
					router.push("/login");
					return;
				}

				const membersData = await getMembersData();
				setMembers(membersData);
			} catch (error) {
				console.error("Error in Dashboard: ", error);
			}
		};

		checkAdminAndFetchMembers();
	}, [currentUser, router]);

	useEffect(() => {
		if (!currentUser) {
			router.push("/login");
		}
	}, [currentUser, router]);

	return (
		<>
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
		</>
	);
};

export default Dashboard;
