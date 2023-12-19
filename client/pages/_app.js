import { AuthContextProvider } from "../contexts/auth.context";
import { CastingsContextProvider } from "../contexts/castings.context";
import Navbar from "../components/Navbar";

import "bootstrap/dist/css/bootstrap.min.css";

import "../styles/globals.scss";

const App = ({ Component, pageProps }) => {
	return (
		<AuthContextProvider>
			<CastingsContextProvider>
				<Navbar />
				<div className="main-content"> 
					<Component {...pageProps} />
				</div>
			</CastingsContextProvider>
		</AuthContextProvider>
	);
};

export default App;
