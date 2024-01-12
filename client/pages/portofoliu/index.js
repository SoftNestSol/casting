import React from "react";

import styles from "../../styles/projects/projects.module.scss";
import ProjectCard from "./project-card";
import { FormattedMessage } from "react-intl";

const projects = [
	{
		title: "Capcana Diavolului Miliardar",
		description:
			"O mini-serie captivantă, filmată în colaborare cu o companie din China. Povestea explorează relațiile între două familii ale căror băieți au crescut împreună în copilărie și care se află acum într-un triunghi amoros complicat. Îndrăgostiți de aceeași fată, relația devine și mai tensionată odată ce o crimă are loc, aducând un element surprinzător în acest triunghi amoros clasic.Este rezultatul unei colaborări fascinante cu o firmă din China, aducând în fața publicului o producție cinematografică ce traversează granițele culturale și aduce laolaltă elemente dramatice și misterioase.",
		type: "Serial",
		imageUrls: [
			"/images/projects/1/1.jpg",
			"/images/projects/1/2.jpg",
			"/images/projects/1/3.jpg",
			"/images/projects/1/4.jpg"
		]
	},
	{
		title: "Insărcinată după respingerea masculului Alfa",
		description:
			"Povestea se învârte în jurul personajului feminin principal, cea mai tânără dintr-o familie de vârcolaci, având o sora mai mare iubită de toți. Simțindu-se marginalizată deoarece nu se poate transforma în vârcolac ca ceilalți membri ai familiei, ea călătorește într-o lume mistică.Această poveste SF complexă este transpusă într-o miniserie captivantă, filmată într-un timp scurt, unde creativitatea și improvizația decorului au fost realizate în echipă, atât de actori, cât și de echipa de producție. Este o poveste cu adevărat provocatoare, care explorează elemente fantastice și umane într-un mod captivant.",
		type: "Serial",
		imageUrls: [
			"/images/projects/2/1.jpg",
			"/images/projects/2/2.jpg",
			"/images/projects/2/3.jpg",
			"/images/projects/2/4.jpg"
		]
	}
];

const Projects = () => {
	return (
		<>
			<div className={styles.heading_text}>
				<h1>
					<FormattedMessage id="projects_title" />
				</h1>
				<h1>
					<FormattedMessage id="projects_title_2" />
				</h1>
				<p>
					<FormattedMessage id="projects_description" />
				</p>
			</div>

			{projects.map((project, index) => (
				<div key={index}>
					<ProjectCard
						className={styles.project}
						title={project.title}
						description={project.description}
						type={project.type}
						imageUrls={project.imageUrls}
						reverse={index % 2 !== 0}
					/>
				</div>
			))}
		</>
	);
};

export default Projects;
