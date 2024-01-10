import React from "react";
import { useRouter } from "next/router";
import styles from "../styles/navbar.module.scss"; // Schimbă cu calea către fișierul tău SCSS

export default function LanguageSwitcher() {
	const router = useRouter();
	const { locale, locales, asPath } = router;

	const changeLanguage = (newLocale) => {
		router.push(asPath, asPath, { locale: newLocale });
	};

	return (
		<div className={styles.languageSwitcher}>
			{locales.map((lang) => (
				<button
					key={lang}
					onClick={() => changeLanguage(lang)}
					className={locale === lang ? styles.active : ""}
				>
					{lang.toUpperCase()}
				</button>
			))}
		</div>
	);
}
