import React from "react";
import styles from "../../styles/projects/ProjectCard.module.scss";
import Image from "next/image";
import Frame from "../../public/images/projects/Frame.svg";

const ProjectCard = ({ title, description, imageUrl }) => {
	return (
		<div className={styles.projectCard}>
			<div className={styles.imageWrapper}>
				<Image
					src={Frame}
					className={styles.decoration}
				/>
				<img
					src={imageUrl}
					alt={title}
				/>
			</div>
			<div className={styles.textContent}>
				<h2 className={styles.projectTitle}>{title}</h2>
				<p className={styles.projectDescription}>{description}</p>
			</div>
		</div>
	);
};

export default ProjectCard;
