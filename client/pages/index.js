import Head from "next/head";
// import Scene from "../components/spline";
import Carousel from "./servicii-section";
import CTA from "./cta-section";
import TextRain from "./text-overlay";
import styles from "../styles/landing-page/landing-page.module.scss";
import React, { Suspense } from "react";
import Link from "next/link";

import { useRouter } from "next/router";
import { FormattedMessage, useIntl } from "react-intl";

export default function LandingPage({ dir }) {
	const { locale } = useRouter();
	const intl = useIntl();

	const metadata = {
		title: {
			en: "MyCasting - Discover your chance with us! | Casting Bucharest",
			ro: "MyCasting - Descoperă șansa ta cu noi! | Casting Bucuresti"
		},
		description:
			"Agentia MyCasting este o platforma de casting din Bucuresti pentru actori, modele, cantareti si figuratie. Acum e sansa ta sa fii descoperit.",

		twitter: {
			card: "summary_large_image"
		}
	};

	const title = metadata.title[locale] || metadata.title["ro"];

	const test = intl.formatMessage({ id: "test" });
	return (
		<div>
			<Head>
				<title>{title}</title>
				<meta
					name="description"
					content={metadata.description}
				/>

				<link
					rel="icon"
					href="/favicon.ico"
				/>
			</Head>

			<main>
				<div className={styles.pagecontainer}>
					<TextRain />

					<div className={styles.button_container}>
						<Link
							className={styles.button}
							href="/register"
						>
							<FormattedMessage id="apply_now" />
						</Link>
						<div></div>
					</div>
					<div className={styles.hero_text}>
						<h1>
							<FormattedMessage id="your_chance" />
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
