import React, { useState, useEffect, use } from "react";
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

function getDirection(locale) {
	return "itr";
}

const App = ({ Component, pageProps }) => {
	const router = useRouter();
	const [showLoading, setShowLoading] = useState(true);
	const [isMobile, setIsMobile] = useState(false);
	const isLandingPage = router.pathname === "/";

	const [word, setWord] = useState("Popularity");

	const words = ["Moments", "Exposure", "Popularity"];

	const { locale } = useRouter();

	useEffect(() => {
		const timer = setTimeout(() => {
			setShowLoading(false);
		}, 2500);

		return () => {
			clearTimeout(timer);
		};
	}, []);

	useEffect(() => {
		const interval = setInterval(() => {
			const index = words.indexOf(word);
			setWord(words[(index + 1) % words.length]);
		}, 2000);

		return () => clearInterval(interval);
	}, [word]);

	return (
		<>
			<Head>
				<title>MyCasting - Your Chance</title>

				<meta
					name="viewport"
					content="initial-scale=1.0, width=device-width"
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
									<img
										src="/HeroBackground.png"
										alt="Desktop Image"
										style={{
											position: "relative",
											top: "0",
											left: "0",
											width: "100%",
											height: "100%"
										}}
									/>
									<div
										style={{
											position: "absolute",
											top: "20%",
											left: "25vw",
											width: "100%",
											height: "100%",
											fontSize: "7vw"
										}}
									>
										Your Chance to{" "}
										<div
											style={{
												marginLeft: "-5%"
											}}
										>
											Achieve
											<span
												style={{
													color: "hsl(45, 43%, 56%)",
													animation: "colorChange 2s infinite"

												}}
											>
												{" "}
												{word}
											</span>
											<p
												style={{
													marginTop: "2rem",
													marginLeft: "5%",
													fontSize: "1.8vw",
													marginBottom: "2vh"
												}}
											>
												Găsește talentul perfect pentru proiectul tău! Echipa
												<span
													style={{
														display: "block",
														fontSize: "1.8vw"
													}}
												>
													{" "}
													noastră te ajută să selectezi actorii și modelele
													ideale.
												</span>
											</p>
										</div>
									</div>
								</div>
								<div
									className={`spline-mobile ${isLandingPage ? "" : "hidden"}`}
								>
									<Image
										className="splineImage"
										src="/images/spline-image.jpg"
										alt="Mobile Image"
										width={3200} // Adjust as needed
										height={3200} // Adjust as needed
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
