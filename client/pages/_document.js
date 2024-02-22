import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
	return (
		<Html lang="en">
			<Head>
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
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
