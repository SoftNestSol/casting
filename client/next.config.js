/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				hostname: "firebasestorage.googleapis.com",
				pathname: "**",
				protocol: "https"
			}
		]
	},
	reactStrictMode: true
};

module.exports = { nextConfig, output: "standalone" };
