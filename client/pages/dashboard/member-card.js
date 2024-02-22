import styles from "../../styles/dashboard/member-card.module.scss";
import { useDashboardContext } from "../../contexts/dashboard.context";

const MemberCard = ({ member }) => {

	const { ComputeAge } = useDashboardContext();

	if (!member || !member.photos || member.photos.length === 0) {
		
		return <div>No member data available</div>;
	}
	const imgSrc = member.photos[1];
	return (
		<div className={styles.memberCard}>
			<img
				src={imgSrc}
				className={styles.profilePhoto}
				alt="Profile"
				
			/>
			<div className={styles.memberDetail}>{`Sex: ${member.gender}`}</div>
			<div className={styles.memberDetail}>{`Varsta: ${ComputeAge(member.dateOfBirth)}`}</div>
			<div className={styles.memberDetail}>{`Inaltime: ${member.height}`}</div>
			<div className={styles.memberDetail}>{`Greutate: ${member.weight}`}</div>
		</div>
	);
};

export default MemberCard;
