// React component
import React from "react";
import styles from "../styles/landing-page/cta.module.scss";
import Frame from "../public/frame.svg";
import MyImage from "../public/images/CTAimage.jpg";
import Image from "next/image";
import Link from "next/link";
import { FormattedMessage } from "react-intl";

const CTA = () => {
	return (
		<div className={styles.sectionContainer}>
			<h1>
				<FormattedMessage id="cta_title" />
			</h1>
			<div className={styles.wrapper}>
				<div className={styles.textContent}>
					<p className={styles.description}>
						<FormattedMessage id="cta_description" />
					</p>
					<Link
						className={styles.applyButton}
						href="/register"
					>
						<FormattedMessage id="apply_now" />
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
