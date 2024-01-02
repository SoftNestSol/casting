import React, { useState, useEffect } from "react";
import { AuthContextProvider } from "../contexts/auth.context";
import { CastingsContextProvider } from "../contexts/castings.context";
import Navbar from "../components/navbar";
import Spline from "@splinetool/react-spline";
import { useRouter } from "next/router";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.scss";

const App = ({ Component, pageProps }) => {
	const router = useRouter();
	const [showLoading, setShowLoading] = useState(true);
	const isLandingPage = router.pathname === "/";

	useEffect(() => {
		const timer = setTimeout(() => {
			setShowLoading(false);
		}, 2500); // Set this to your desired loading message display time

		return () => clearTimeout(timer);
	}, []);

	return (
		<AuthContextProvider>
			<CastingsContextProvider>
				<Navbar />
				<div className="main-content">
					<div className={`spline ${isLandingPage ? "" : "hidden"}`}>
						{showLoading && <div className="loader"></div>}
						{/* Spline component is always rendered */}
						<Spline scene="https://prod.spline.design/r0ZUySqcJPwMFSGy/scene.splinecode" />
					</div>
					<Component {...pageProps} />
				</div>
			</CastingsContextProvider>
		</AuthContextProvider>
	);
};

export default App;
