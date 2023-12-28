import React from "react";
import styles from "../../styles/projects/projects.module.scss";
import ProjectCard from "./project-card";
function ProjectsPage() {
	const projects = [
		{
			title: "Project 1",
			description:
				"Găsește talentul perfect pentru proiectul tău! Echipa noastră specializată în casting te ajută să selectezi actorii și modelele ideale pentru orice tip de producție, fie că este vorba de filme, reclame sau proiecte fotografice. Avem o bază de date extinsă și variată, garantând potrivirea perfectă pentru viziunea ta artistică.",
			type: "comercial",
			imageUrl: "/images/projects/projects.jpg"
		},
		{
			title: "Project 2",
			description:
				"Găsește talentul perfect pentru proiectul tău! Echipa noastră specializată în casting te ajută să selectezi actorii și modelele ideale pentru orice tip de producție, fie că este vorba de filme, reclame sau proiecte fotografice. Avem o bază de date extinsă și variată, garantând potrivirea perfectă pentru viziunea ta artistică.",
			type: "comercial",
			imageUrl: "/images/projects/projects.jpg"
		},
		{
			title: "Project 3",
			description:
				"Găsește talentul perfect pentru proiectul tău! Echipa noastră specializată în casting te ajută să selectezi actorii și modelele ideale pentru orice tip de producție, fie că este vorba de filme, reclame sau proiecte fotografice. Avem o bază de date extinsă și variată, garantând potrivirea perfectă pentru viziunea ta artistică.",
			type: "comercial",
			imageUrl: "/images/projects/projects.jpg"
		}
	];

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
			{projects.map((project, index) => (
				<ProjectCard
					className={styles.project}
					key={project.id}
					title={project.title}
					description={project.description}
					type={project.type}
					imageUrl={project.imageUrl}
					reverse={index % 2 !== 0} // Pass a prop to determine orientation
				/>
			))}
		</>
	);
}

export default ProjectsPage;
