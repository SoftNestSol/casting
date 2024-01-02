import Image from "next/image";
import styles from "../../styles/dashboard/member-card.module.scss";

const MemberCard = ({ member }) => {
	if (!member || !member.photos || member.photos.length === 0) {
		
		return <div>No member data available</div>;
	}
	const imgSrc = member.photos[0];
	return (
		<div className={styles.memberCard}>
			<Image
				src={imgSrc}
				className={styles.profilePhoto}
				alt="Profile"
				width={200}
				height={200}
			/>
			<div className={styles.memberDetail}>{`Sex: ${member.gender}`}</div>
			<div className={styles.memberDetail}>{`Varsta: ${member.dateOfBirth}`}</div>
			<div className={styles.memberDetail}>{`Inaltime: ${member.height}`}</div>
			<div className={styles.memberDetail}>{`Greutate: ${member.weight}`}</div>
		</div>
	);
};

export default MemberCard;
