import React, { useState, useEffect, useRef } from "react";
import { AuthContextProvider } from "../contexts/auth.context";
import { CastingsContextProvider } from "../contexts/castings.context";
import Navbar from "../components/navbar";
import Spline from "@splinetool/react-spline";
import { useRouter } from "next/router";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.scss";

const App = ({ Component, pageProps }) => {
	const router = useRouter();
	const [isSplineLoaded, setSplineLoaded] = useState(false);
	const onLoadCalled = useRef(false);
	const isLandingPage = router.pathname === "/";

	useEffect(() => {
		console.log("Mounting Spline component");
		return () => {
			console.log("Unmounting Spline component");
		};
	}, []);

	const onLoadFunction = () => {
		console.log("Spline onLoad triggered");
		if (!onLoadCalled.current) {
			setSplineLoaded(true);
			onLoadCalled.current = true;
			console.log("Spline is set to loaded");
		}
	};

	return (
		<AuthContextProvider>
			<CastingsContextProvider>
				<Navbar />
				<div className="main-content">
					<div className={`spline ${isLandingPage ? "" : "hidden"}`}>
						{!isSplineLoaded && (
							<div className="spline-loading">Loading 3D content, please wait...</div>
						)}

						<Spline
							scene="https://prod.spline.design/r0ZUySqcJPwMFSGy/scene.splinecode"
							onLoad={onLoadFunction}
						/>
					</div>
					<Component {...pageProps} />
				</div>
			</CastingsContextProvider>
		</AuthContextProvider>
	);
};

export default App;
