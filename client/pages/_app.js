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
const App = ({ Component, pageProps }) => {
	const router = useRouter();
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
				<title>MyCasting - Your Chance</title>
				<meta
					name="viewport"
					content="initial-scale=1.0, width=device-width"
				/>
				<meta
					property="og:title"
					content="MyCasting - Your Chance"
				/>
				<meta
					property="og:description"
					content="MyCasting - Your Chance"
				></meta>
				<meta
					property="og:image"
					content="https://70bb-46-214-10-153.ngrok-free.app//opengraph-image.png"
				/>
				<meta
					property="og:url"
					content="https://70bb-46-214-10-153.ngrok-free.app/"
				/>
				<meta
					property="og:image:type"
					content="<article>"
				/>
				<meta
					property="og:image:width"
					content="1200"
				/>
				<meta
					property="og:image:height"
					content="630"
				/>

				<link
					rel="icon"
					href="/favicon.ico?"
					type="image/x-icon"
				/>
				<link
					rel="stylesheet"
					href="https://fonts.googleapis.com/css2?family=Poppins:wght@200;400;600&display=swap"
				/>
			</Head>

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
							<div className={`spline-mobile ${isLandingPage ? "" : "hidden"}`}>
								<img
									className="splineImage"
									src="/images/splineImg.png"
									alt="Mobile Image"
									// layout="responsive"
									// width={800} // Adjust as needed
									// height={800} // Adjust as needed
								/>
							</div>

							<Component {...pageProps} />
						</div>
						<Footer />
					</DashboardContextProvider>
				</CastingsContextProvider>
			</AuthContextProvider>
		</>
	);
};

export default App;
