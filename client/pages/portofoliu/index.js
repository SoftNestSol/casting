import React from "react";
import styles from "../../styles/projects/projects.module.scss";
import ProjectCard from "./project-card";
import { FormattedMessage } from "react-intl";

const projects = [
	{
		title: <FormattedMessage id="project_1_title" />,
		description: <FormattedMessage id="project_1_description" />,
		type: <FormattedMessage id="project_1_type" />,
		imageUrls: [
			"/images/projects/1/1.jpg",
			"/images/projects/1/2.jpg",
			"/images/projects/1/3.jpg",
			"/images/projects/1/4.jpg"
		]
	},
	{
		title: <FormattedMessage id="project_2_title" />,
		description: <FormattedMessage id="project_2_description" />,
		type: <FormattedMessage id="project_2_type" />,
		imageUrls: [
			"/images/projects/2/1.jpg",
			"/images/projects/2/2.jpg",
			"/images/projects/2/3.jpg",
			"/images/projects/2/4.jpg"
		]
	},
	{
		title: <FormattedMessage id="project_3_title" />,
		description: <FormattedMessage id="project_3_description" />,
		type: <FormattedMessage id="project_3_type" />,
		imageUrls: [
			"/images/projects/3/5.jpg",
			"/images/projects/3/2.jpg",
			"/images/projects/3/3.jpg",
			"/images/projects/3/4.jpg",
			"/images/projects/3/1.jpg",
			"/images/projects/3/6.jpg",
			"/images/projects/3/7.jpg"
		]
	},
	{
		title: <FormattedMessage id="project_4_title" />,
		description: <FormattedMessage id="project_4_description" />,
		type: <FormattedMessage id="project_4_type" />,
		imageUrls: [
			"/images/projects/4/6.jpg",
			"/images/projects/4/2.jpg",
			"/images/projects/4/3.jpg",
			"/images/projects/4/4.jpg",
			"/images/projects/4/1.jpg",
			"/images/projects/4/5.jpg",
			"/images/projects/4/7.jpg",
			"/images/projects/4/8.jpg"
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
			
			{projects.slice().reverse().map((project, index) => (
				<div key={index}>
					<ProjectCard
						className={styles.project}
						title={project.title}
						description={project.description}
						type={project.type}
						imageUrls={project.imageUrls}
						reverse={index % 2 === 0} // reversing the logic as well
					/>
				</div>
			))}
		</>
	);
};

export default Projects;
