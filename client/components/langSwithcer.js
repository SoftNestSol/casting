import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";

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
				{locale === "ro" ? (
					<Image
						alt="RO"
						src="/romania-flag.png"
						width={30}
						height={30}
					/>
				) : (
					<Image
						alt="EN"
						src="/usa-flag.png"
						width={30}
						height={30}
					/>
				)}
			</span>
		</div>
	);
}
