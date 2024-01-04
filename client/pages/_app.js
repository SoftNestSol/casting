import React, { useState, useEffect } from "react";
import { AuthContextProvider } from "../contexts/auth.context";
import { CastingsContextProvider } from "../contexts/castings.context";
import Navbar from "../components/navbar";
import Spline from "@splinetool/react-spline";
import { useRouter } from "next/router";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.scss";
import Head from "next/head";
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

		// Check for mobile screen size
		const checkMobile = () => {
			setIsMobile(window.innerWidth < 768); // or any other width you consider as mobile
		};

		// Set initial value
		checkMobile();

		// Add resize listener
		window.addEventListener("resize", checkMobile);

		// Cleanup
		return () => {
			clearTimeout(timer);
			window.removeEventListener("resize", checkMobile);
		};
	}, []);
	return (
		<>
			<Head>
				<title>Castings</title>
				<meta
					name="viewport"
					content="initial-scale=1.0, width=device-width"
				/>
				<link
					rel="icon"
					href="/favicon.ico"
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
							{isLandingPage && (
								<div className={`spline ${isLandingPage ? "" : "hidden"}`}>
									{/* Conditional rendering based on screen size */}
									{isMobile ? (
										<img
											src="/images/splineImg.png"
											alt="Mobile Image"
										/>
									) : (
										<Spline scene="https://prod.spline.design/r0ZUySqcJPwMFSGy/scene.splinecode" />
									)}
								</div>
							)}

							<Component {...pageProps} />
						</div>
					</DashboardContextProvider>
				</CastingsContextProvider>
			</AuthContextProvider>
		</>
	);
};

export default App;
