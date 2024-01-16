/** @type {import('next').NextConfig} */
module.exports = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "firebasestorage.googleapis.com",
				pathname: "**"
			}
		],
		minimumCacheTTL: 60 * 60 * 24 * 365
	},
	reactStrictMode: true,
	i18n: {
		locales: ["ro", "en"],
		defaultLocale: "ro",
		localeDetection: false
	}
};
