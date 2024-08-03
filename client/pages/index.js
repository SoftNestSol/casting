import Head from "next/head";
// import Scene from "../components/spline";
import Carousel from "./servicii-section";
import CTA from "./cta-section";
import TextRain from "./text-overlay";
import styles from "../styles/landing-page/landing-page.module.scss";
import React, { Suspense } from "react";
import HeroSection from "../components/hero-section.js";

import { useRouter } from "next/router";
import { FormattedMessage, useIntl } from "react-intl";

export default function LandingPage({ dir }) {
	const { locales } = useRouter();
	const intl = useIntl();

	const test = intl.formatMessage({ id: "test" });
	return (
		<div>
			<Head>
				<title>
					{intl.formatMessage({ id: "my_casting" }) +
						" - " +
						intl.formatMessage({ id: "your_chance" })}
				</title>

				<meta
					name="description"
					content="Generated by create next app"
				/>
				<link
					rel="icon"
					href="/favicon.ico"
				/>
			</Head>

			<main>
				<div className={styles.pagecontainer}>
					<TextRain />

					<HeroSection />

					<div className={styles.hero_text}>
						<h1>
							<span>Your</span> <span>Chance</span>
						</h1>
						<h2>
							<FormattedMessage id="my_casting" />
						</h2>
						<div className={styles.hero_cards}>
							<div className={styles.card}>
								<h1>
									<FormattedMessage id="creative_space" />
								</h1>
								<p>
									<FormattedMessage id="pleasant_unique_experience" />
								</p>
							</div>
							<div className={styles.card}>
								<h1>
									<FormattedMessage id="diverse_collaborations" />
								</h1>
								<p>
									<FormattedMessage id="international_national_projects" />
								</p>
							</div>
							<div className={styles.card}>
								<h1>
									<FormattedMessage id="creativity_home" />
								</h1>
								<p>
									<FormattedMessage id="implementation_help" />
								</p>
							</div>
						</div>
					</div>
					<Carousel />
					<CTA />
				</div>
			</main>
		</div>
	);
}
