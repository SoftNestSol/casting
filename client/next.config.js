/** @type {import('next').NextConfig} */
module.exports = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "firebasestorage.googleapis.com",
				pathname: "**"
			}
		]
	},
	reactStrictMode: true,
	i18n: {
		locales: ["en", "ro"],
		defaultLocale: "ro",
		localeDetection: false
	}
};
