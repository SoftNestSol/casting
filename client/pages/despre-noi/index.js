import Image from "next/image";

import styles from "../../styles/about-us/about-us.module.scss";
import { FormattedMessage } from "react-intl";

const AboutUs = () => {
	return (
		<>
			<div className={styles.container}>
				<Image
					alt={"About us"}
					src="/images/about-us.jpg"
					width={1000}
					height={1000}
				/>
				<div className={styles.gradient} />
				<h1 className={styles.heading}>
					
					< FormattedMessage id="about_us" />
					  <span className={styles.accent}>
						<FormattedMessage id="about_us_2" />
					 </span>
				</h1>
				<p className={styles.subtitle}>
					<FormattedMessage id="about_us_description" />
				</p>
				<p className={styles.verticalText}>MyCasting</p>
			</div>

			<div className={styles.secondContainer}>
				<Image
					alt={"About us"}
					src="/images/about_second.jpg"
					width={1000}
					height={1000}
				/>
				<div className={styles.gradient} />
				<p className={styles.text}>
					<FormattedMessage id="about text 1" />
				</p>
			</div>

			<div className={styles.thirdContainer}>
				<Image
					alt={"About us"}
					src="/images/about_third.jpg"
					width={1000}
					height={1000}
				/>
				<div className={styles.gradient} />
				<p className={styles.text}>
					<FormattedMessage id="about text 2" />
				</p>
			</div>

			<div className={styles.fourthContainer}>
				<Image
					alt={"About us"}
					src="/images/about_fourth.jpg"
					width={1000}
					height={1000}
				/>
				<div className={styles.gradient} />
				<p className={styles.text}>
					<FormattedMessage id="about text 3" />
				</p>
			</div>

			<div className={styles.fifthContainer}>
				<Image
					alt={"About us"}
					src="/images/carousel/6.jpg"
					width={1000}
					height={1000}
				/>
				<div className={styles.gradient} />
				<p className={styles.text}>
					<FormattedMessage id="about text 4" />
				</p>
			</div>
		</>
	);
};

export default AboutUs;
