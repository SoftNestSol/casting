const { writeFileSync } = require("fs");

const SITEMAP_PATH = './sitemap.xml';
const BASE_URL = "https://mycasting.ro";

const staticPages = [
	"",
	"about",
	"contact",
	"servicii",
	"castings",
	"portofoliu",
	"despre-noi",
	"en/despre-noi",
	"en/servicii",
	"en/castings",
	"en/portofoliu",
	"en/contact",
	"en",
	"login",
	"register",
	"login/reset-password",
	"en/login",
	"en/register",
	"en/login/reset-password"
];

const generateSitemap = async () => {
	const allPages = [...staticPages];

	const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
	.map(
		(page) => `
    <url>
        <loc>${BASE_URL}/${page}</loc>
    </url>`
	)
	.join("")}
</urlset>`;

	writeFileSync(SITEMAP_PATH, sitemapContent);
};

generateSitemap();
