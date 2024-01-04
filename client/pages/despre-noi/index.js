import Image from "next/image";

import styles from "../../styles/about-us/about-us.module.scss";

const AboutUs = () => {
	return (
		<>
			<div className={styles.container}>
				<Image
					alt={"About us"}
					src="/images/about-us.jpeg"
					width={1000}
					height={1000}
				/>
				<div className={styles.gradient} />
				<h1 className={styles.heading}>
					Despre <span className={styles.accent}>Noi</span>
				</h1>
				<p className={styles.subtitle}>O agentie pentru tine</p>
				<p className={styles.verticalText}>MyCasting</p>
			</div>

			<div className={styles.secondContainer}>
				<Image
					alt={"About us"}
					src="/images/about_second.jpeg"
					width={1000}
					height={1000}
				/>
				<div className={styles.gradient} />
				<p className={styles.text}>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
					euismod, nisl eget aliquam ultricies, nunc nisl ultricies nunc, nec
					aliquam nisl nisl nec nisl. Donec euismod, nisl eget aliquam
					ultricies, nunc nisl ultricies nunc, nec aliquam nisl nisl nec nisl.
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
					euismod, nisl eget aliquam ultricies, nunc nisl ultricies nunc, nec
					aliquam nisl nisl nec nisl. Donec euismod, nisl eget aliquam
					ultricies, nunc nisl ultricies nunc, nec aliquam nisl nisl nec nisl
				</p>
			</div>

			<div className={styles.thirdContainer}>
				<Image
					alt={"About us"}
					src="/images/about_third.jpeg"
					width={1000}
					height={1000}
				/>
				<div className={styles.gradient} />
				<p className={styles.text}>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
					euismod, nisl eget aliquam ultricies, nunc nisl ultricies nunc, nec
					aliquam nisl nisl nec nisl. Donec euismod, nisl eget aliquam
					ultricies, nunc nisl ultricies nunc, nec aliquam nisl nisl nec nisl.
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
					euismod, nisl eget aliquam ultricies, nunc nisl ultricies nunc, nec
					aliquam nisl nisl nec nisl. Donec euismod, nisl eget aliquam
					ultricies, nunc nisl ultricies nunc, nec aliquam nisl nisl nec nisl
				</p>
			</div>

			<div className={styles.fourthContainer}>
				<Image
					alt={"About us"}
					src="/images/about_fourth.jpeg"
					width={1000}
					height={1000}
				/>
				<div className={styles.gradient} />
				<p className={styles.text}>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
					euismod, nisl eget aliquam ultricies, nunc nisl ultricies nunc, nec
					aliquam nisl nisl nec nisl. Donec euismod, nisl eget aliquam
					ultricies, nunc nisl ultricies nunc, nec aliquam nisl nisl nec nisl.
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
					euismod, nisl eget aliquam ultricies, nunc nisl ultricies nunc, nec
					aliquam nisl nisl nec nisl. Donec euismod, nisl eget aliquam
					ultricies, nunc nisl ultricies nunc, nec aliquam nisl nisl nec nisl
				</p>
			</div>
		</>
	);
};

export default AboutUs;
