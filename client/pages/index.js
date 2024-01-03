import Head from "next/head";
// import Scene from "../components/spline";
import Carousel from "./servicii-section";
import CTA from "./cta-section";
import TextRain from "./text-overlay";
import styles from "../styles/landing-page/landing-page.module.scss";
import React, { Suspense } from "react";
import Link from "next/link";
// const Spline = React.lazy(() => import("@splinetool/react-spline"));
import Spline from "@splinetool/react-spline";
export default function LandingPage() {
	return (
		<div>
			<Head>
				<title>My Casting - Your Chance.</title>
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

					<div className={styles.button_container}>
						<Link
							className={styles.button}
							href="/register"
						>
							APLICĂ ACUM
						</Link>
					</div>
					<div className={styles.hero_text}>
						<h1>
							<span>Your</span> <span>Chance</span>
						</h1>
						<h2>MY CASTING</h2>
						<div className={styles.hero_cards}>
							<div className={styles.card}>
								<h1>Spațiul dedicat creației și inspirației infinite.</h1>
								<p>
									Vrem ca atât tu, cât și noi, să avem o experiență plăcută și unică în fiecare
									proiect în care colaborăm.
								</p>
							</div>
							<div className={styles.card}>
								<h1>Spațiul dedicat creației și inspirației infinite.</h1>
								<p>
									Vrem ca atât tu, cât și noi, să avem o experiență plăcută și unică în fiecare
									proiect în care colaborăm.
								</p>
							</div>
							<div className={styles.card}>
								<h1>Spațiul dedicat creației și inspirației infinite.</h1>
								<p>
									Vrem ca atât tu, cât și noi, să avem o experiență plăcută și unică în fiecare
									proiect în care colaborăm.
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
