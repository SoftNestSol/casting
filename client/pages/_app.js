import "../styles/globals.css";
import Test from "./test/test";

import { useState } from "react";

function MyApp({ Component, pageProps }) {
	return (
		<>
			<Test />
			<Component {...pageProps} />
		</>
	);
}

export default MyApp;
