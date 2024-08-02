import React, { useEffect, useState } from "react";
import styles from "../styles/landing-page/landing-page.module.scss";
import secondStyles from "../styles/home/home.module.scss";
import Link from "next/link";
import { FormattedMessage } from "react-intl";

const HeroSection = () => {
	const [word, setWord] = useState("Popularity");

	const words = ["Moments", "Exposure", "Popularity"];

	useEffect(() => {
		const interval = setInterval(() => {
			const index = words.indexOf(word);
			setWord(words[(index + 1) % words.length]);
		}, 2000);

		return () => clearInterval(interval);
	}, [word]);

	return (
		<div className={secondStyles.heroSection}>
			<img
				src="/HeroBackground.png"
				alt="Desktop Image"
				className={secondStyles.heroBackground}
			/>
			<div className={secondStyles.heroContent}>
				Your Chance to{" "}
				<div className={secondStyles.achieveText}>
					Achieve
					<span className={secondStyles.highlightWord}> {word}</span>
					<p className={secondStyles.description}>
						Găsește talentul perfect pentru tine! Echipa noastră te
						<span className={secondStyles.subDescription}>
							{" "}
							ajută să iti descoperi cele mai bune capabilități și să le pui în
							valoare.
						</span>
					</p>
				</div>
				<div className={styles.button_container}>
					<Link
						className={styles.button}
						href="/register"
					>
						<FormattedMessage id="apply_now" />
					</Link>
				</div>
			</div>
		</div>
	);
};

export default HeroSection;
