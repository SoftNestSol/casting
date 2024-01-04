import React from "react";
import styles from "../../styles/projects/ProjectCard.module.scss";
import Image from "next/image";
import Frame from "../../public/images/projects/Frame.svg";

const ProjectCard = ({ title, description, type, imageUrl, reverse }) => {
	const cardClasses = reverse
		? `${styles.projectCard} ${styles.projectCardReverse}`
		: styles.projectCard;

	return (
		<div className={cardClasses}>
			<div className={styles.imageWrapper}>
				<Image
					alt={title}
					src={Frame}
					className={styles.decoration}
					width={100}
					height={100}
				/>
				<Image
					src={imageUrl}
					alt={title}
					className={styles.projectImage}
					width={500}
					height={500}
				/>
			</div>
			<div className={styles.textContent}>
				<h2 className={styles.projectTitle}>{title}</h2>
				<p className={styles.projectDescription}>{description}</p>
				<h3 className={styles.projectType}>{type}</h3>
			</div>
		</div>
	);
};

export default ProjectCard;
