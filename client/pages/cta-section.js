// React component
import React from "react";
import styles from "../styles/landing-page/cta.module.scss";
import Frame from "../public/frame.svg";
import Image from "next/image";
const CTA = () => {
	return (
		<div className={styles.sectionContainer}>
			<div className={styles.textContent}>
				<p className={styles.description}>
					Suntem o agenție proaspătă și ne dorim să ne diferențiem prin comunicarea deschisă cu
					viitorii noștri actori. Aici găsești proiectele perfecte pentru tine și poți discuta liber
					despre nevoile și dorințele tale.
				</p>
				<div className={styles.applyButton}>APLICĂ ACUM</div>
			</div>
			<div className={styles.imageContainer}>
				<div className={styles.imageFrame}>
					<Image
						alt="frame"
						src={Frame}
					/>
				</div>
			</div>
		</div>
	);
};

export default CTA;
