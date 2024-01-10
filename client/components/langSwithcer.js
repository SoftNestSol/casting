import React from "react";
import { useRouter } from "next/router";
import { GrLanguage } from "react-icons/gr";

import styles from "../styles/navbar.module.scss";

export default function LanguageSwitcher() {
	const router = useRouter();
	const { locale, asPath } = router;

	const changeLanguage = () => {
		const newLocale = locale === "ro" ? "en" : "ro";
		router.push(asPath, asPath, { locale: newLocale });
	};

	return (
		<div
			className={styles.language_switcher}
			onClick={changeLanguage}
		>
			<span>
				<GrLanguage />
			</span>
		</div>
	);
}
