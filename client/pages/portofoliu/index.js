import React from "react";
import styles from "../../styles/projects/projects.module.scss";
import ProjectCard from "./project-card";
function ProjectsPage() {
	return (
		<>
			<div className={styles.heading_text}>
				<h1>Proiectele</h1>
				<h1>Noastre</h1>
				<p>
					Găsește talentul perfect pentru proiectul tău! Echipa noastră specializată în casting te
					ajută să selectezi actorii și modelele ideale pentru orice tip de producție, fie că este
					vorba de filme, reclame sau proiecte fotografice. Avem o bază de date extinsă și variată,
					garantând potrivirea perfectă pentru viziunea ta artistică.
				</p>
			</div>
			<ProjectCard
				title="Project1"
				description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget"
				imageUrl="/images/carousel/Carousel1.jpg"
			/>
		</>
	);
}

export default ProjectsPage;
