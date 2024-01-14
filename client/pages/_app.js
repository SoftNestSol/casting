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

	const { locale } = useRouter();

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
									<Spline scene="https://prod.spline.design/r0ZUySqcJPwMFSGy/scene.splinecode" />
								</div>
								<div
									className={`spline-mobile ${isLandingPage ? "" : "hidden"}`}
								>
									<Image
										className="splineImage"
										src="/images/splineImg.jpg"
										alt="Mobile Image"
										width={800} // Adjust as needed
										height={800} // Adjust as needed
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
