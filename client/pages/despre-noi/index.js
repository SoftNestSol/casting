import styles from "../../styles/about-us/about-us.module.scss";

const AboutUs = () => {
	return (
		<>
			<div className={styles.container}>
				<h1 className={styles.heading}>
					Despre <span className={styles.accent}>Noi</span>
				</h1>
				<p className={styles.subtitle}>O agentie pentru tine</p>
				<p className={styles.verticalText}>MyCasting</p>
			</div>

			<div className={styles.secondContainer}>
				<p className={styles.text}>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget aliquam
					ultricies, nunc nisl ultricies nunc, nec aliquam nisl nisl nec nisl. Donec euismod, nisl
					eget aliquam ultricies, nunc nisl ultricies nunc, nec aliquam nisl nisl nec nisl. Lorem
					ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget aliquam
					ultricies, nunc nisl ultricies nunc, nec aliquam nisl nisl nec nisl. Donec euismod, nisl
					eget aliquam ultricies, nunc nisl ultricies nunc, nec aliquam nisl nisl nec nisl
				</p>
			</div>

			<div className={styles.thirdContainer}>
				<p className={styles.text}>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget aliquam
					ultricies, nunc nisl ultricies nunc, nec aliquam nisl nisl nec nisl. Donec euismod, nisl
					eget aliquam ultricies, nunc nisl ultricies nunc, nec aliquam nisl nisl nec nisl. Lorem
					ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget aliquam
					ultricies, nunc nisl ultricies nunc, nec aliquam nisl nisl nec nisl. Donec euismod, nisl
					eget aliquam ultricies, nunc nisl ultricies nunc, nec aliquam nisl nisl nec nisl
				</p>
			</div>

			<div className={styles.fourthContainer}>
				<p className={styles.text}>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget aliquam
					ultricies, nunc nisl ultricies nunc, nec aliquam nisl nisl nec nisl. Donec euismod, nisl
					eget aliquam ultricies, nunc nisl ultricies nunc, nec aliquam nisl nisl nec nisl. Lorem
					ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget aliquam
					ultricies, nunc nisl ultricies nunc, nec aliquam nisl nisl nec nisl. Donec euismod, nisl
					eget aliquam ultricies, nunc nisl ultricies nunc, nec aliquam nisl nisl nec nisl
				</p>
			</div>
		</>
	);
};

export default AboutUs;
