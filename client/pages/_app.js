import React, { useState, useEffect } from "react";
import { AuthContextProvider } from "../contexts/auth.context";
import { CastingsContextProvider } from "../contexts/castings.context";
import Navbar from "../components/navbar";
import Spline from "@splinetool/react-spline";
import { useRouter } from "next/router";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.scss";
import Head from "next/head";
import Footer from "../components/footer";
import Image from "next/image";
import { DashboardContextProvider } from "../contexts/dashboard.context";

import { IntlProvider } from "react-intl";
import en from "../i18n/en.json";
import ro from "../i18n/ro.json";

const messages = {
	en,
	ro
};

const App = ({ Component, pageProps }) => {
	const router = useRouter();
	const { locale } = router;
	const pageTitle =
		locale === "en" ? "MyCasting - Your Chance" : "MyCasting - Șansa Ta";
	const [showLoading, setShowLoading] = useState(true);
	const [isMobile, setIsMobile] = useState(false);
	const isLandingPage = router.pathname === "/";

	useEffect(() => {
		const timer = setTimeout(() => {
			setShowLoading(false);
		}, 2500);

		return () => {
			clearTimeout(timer);
		};
	}, []);

	return (
		<>
			<Head>
				<title>{pageTitle}</title>
				<meta
					name="description"
					content="Alegeți partenerul ideal pentru castingul de actori, figuranți, muzicieni și modele"
				/>
				<meta
					property="og:url"
					content="https://mycasting.ro/"
				/>
				<meta
					property="og:type"
					content="website"
				/>
				<meta
					property="og:title"
					content={pageTitle}
				/>
				<meta
					property="og:description"
					content="Alegeți partenerul ideal pentru castingul de actori, figuranți, muzicieni și modele"
				/>
				<meta
					property="og:image"
					content="https://opengraph.b-cdn.net/production/documents/5d66cded-6857-4cff-815d-589c05ce8dd9.png?token=8zERGJOhfAoTQLWqeHBd2bqgnS6uKUe4zJKUSW8bADA&height=630&width=1200&expires=33244639108"
				/>
				<meta
					name="twitter:card"
					content="summary_large_image"
				/>
				<meta
					property="twitter:domain"
					content="mycasting.ro"
				/>
				<meta
					property="twitter:url"
					content="https://mycasting.ro/"
				/>
				<meta
					name="twitter:title"
					content={pageTitle}
				/>
				<meta
					name="twitter:description"
					content="Alegeți partenerul ideal pentru castingul de actori, figuranți, muzicieni și modele"
				/>
				<meta
					name="twitter:image"
					content="https://opengraph.b-cdn.net/production/documents/5d66cded-6857-4cff-815d-589c05ce8dd9.png?token=8zERGJOhfAoTQLWqeHBd2bqgnS6uKUe4zJKUSW8bADA&height=630&width=1200&expires=33244639108"
				/>
			</Head>

			<IntlProvider
				locale={locale}
				messages={messages[locale]}
			>
				<AuthContextProvider>
					<CastingsContextProvider>
						<DashboardContextProvider>
							{showLoading && (
								<>
									<div
										className={`loader ${showLoading ? "loader_active" : ""}`}
									></div>
									<div className="loader_background"></div>
								</>
							)}

							<Navbar />

							<div className="main-content">
								<div
									className={`spline-desktop ${isLandingPage ? "" : "hidden"}`}
								>
									<Spline scene="https://prod.spline.design/r0ZUySqcJPwMFSGy/scene.splinecode" />
								</div>
								<div
									className={`spline-mobile ${isLandingPage ? "" : "hidden"}`}
								>
									<Image
										className="splineImage"
										src="/images/spline-image.jpg"
										alt="Mobile Image"
										width={3200}
										height={3200}
									/>
								</div>

								<Component {...pageProps} />
							</div>
							<Footer />
						</DashboardContextProvider>
					</CastingsContextProvider>
				</AuthContextProvider>
			</IntlProvider>
		</>
	);
};

export default App;
