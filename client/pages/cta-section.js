// React component
import React from "react";
import styles from "../styles/landing-page/cta.module.scss";
import Frame from "../public/frame.svg";
import MyImage from "../public/images/CTAimage.jpg";
import Image from "next/image";
import Link from "next/link";
const CTA = () => {
	return (
		<div className={styles.sectionContainer}>
			<h1>ÎNSCRIE-TE ÎN BAZA DE DATE</h1>
			<div className={styles.wrapper}>
				<div className={styles.textContent}>
					<p className={styles.description}>
						Suntem o agenție proaspătă și ne dorim să ne diferențiem prin
						comunicarea deschisă cu viitorii noștri actori. Aici găsești
						proiectele perfecte pentru tine și poți discuta liber despre nevoile
						și dorințele tale.
					</p>
					<Link
						className={styles.applyButton}
						href="/register"
					>
						APLICĂ ACUM
					</Link>
				</div>
				<div className={styles.imageContainer}>
					<Image
						alt="frame"
						src={Frame}
					/>
					<Image
						className={styles.CTAimage}
						alt="Your Image Description"
						src={MyImage}
					/>
				</div>
			</div>
		</div>
	);
};

export default CTA;
