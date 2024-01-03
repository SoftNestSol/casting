import React from "react";
import styles from "../../styles/projects/projects.module.scss";
import ProjectCard from "./project-card";
function ProjectsPage() {
	const projects = [
		{
			title: "Capcana Diavolului Miliardar",
			description:
				"O mini-serie captivantă, filmată în colaborare cu o companie din China. Povestea explorează relațiile între două familii ale căror băieți au crescut împreună în copilărie și care se află acum într-un triunghi amoros complicat. Îndrăgostiți de aceeași fată, relația devine și mai tensionată odată ce o crimă are loc, aducând un element surprinzător în acest triunghi amoros clasic.Este rezultatul unei colaborări fascinante cu o firmă din China, aducând în fața publicului o producție cinematografică ce traversează granițele culturale și aduce laolaltă elemente dramatice și misterioase.",
			type: "Serial",
			imageUrl: "/images/projects/1.jpg"
		},
		{
			title: "Insărcinată după respingerea masculului Alfa",
			description:
				"Povestea se învârte în jurul personajului feminin principal, cea mai tânără dintr-o familie de vârcolaci, având o sora mai mare iubită de toți. Simțindu-se marginalizată deoarece nu se poate transforma în vârcolac ca ceilalți membri ai familiei, ea călătorește într-o lume mistică.Această poveste SF complexă este transpusă într-o miniserie captivantă, filmată într-un timp scurt, unde creativitatea și improvizația decorului au fost realizate în echipă, atât de actori, cât și de echipa de producție. Este o poveste cu adevărat provocatoare, care explorează elemente fantastice și umane într-un mod captivant.",
			type: "Serial",
			imageUrl: "/images/projects/2.jpg"
		}
	];

	return (
		<>
			<div className={styles.heading_text}>
				<h1>Proiectele</h1>
				<h1>Noastre</h1>
				<p>
					Talentul apare în fiecare persoană, indiferent de vârstă, sex, etnie sau naționalitate.
					Tot ce trebuie să facem este să privim cu atenție și să-l îmbrățișăm. Asta facem la
					MyCasting. Găsim talente de orice fel pentru proiecte creative. Oferim o colaborare
					fiabilă, eficientă și de succes pentru studiouri și un spațiu creativ, sigur pentru actori
					să experimenteze, să învețe și să-și atingă obiectivele.
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
