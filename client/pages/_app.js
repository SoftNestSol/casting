import "../styles/globals.css";
import Test from "./test/test";


function MyApp({ Component, pageProps }) {
	return (
		<>
			<Component {...pageProps} />
		</>
	);
}

export default MyApp;
