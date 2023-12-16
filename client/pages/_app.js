import { AuthContextProvider } from "../contexts/auth.context";
import { CastingsContextProvider } from "../contexts/castings.context";

import "../styles/globals.scss";

const App = ({ Component, pageProps }) => {
	return (
		<AuthContextProvider>
			<CastingsContextProvider>
				<Component {...pageProps} />
			</CastingsContextProvider>
		</AuthContextProvider>
	);
};

export default App;
