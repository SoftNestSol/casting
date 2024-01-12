import React, { useState, useEffect } from "react";
import Image from "next/image";
import { getCookie, hasCookie, setCookie } from "cookies-next";

const languages = [
	{ label: "English", value: "/auto/en", flag: "/usa-flag.png" },
	{ label: "Romana", value: "/ro", flag: "/romania-flag.png" }
];

const GoogleTranslate = () => {
	const [selected, setSelected] = useState(languages[0].value);

	useEffect(() => {
		var addScript = document.createElement("script");
		addScript.setAttribute(
			"src",
			"//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
		);
		document.body.appendChild(addScript);
		window.googleTranslateElementInit = googleTranslateElementInit;
	}, []);

	useEffect(() => {
		const cookieValue = getCookie("googtrans");
		if (hasCookie("googtrans") && cookieValue !== selected) {
			setSelected(cookieValue);
		}
	}, [selected]);

	

	const googleTranslateElementInit = () => {
		new window.google.translate.TranslateElement(
			{
				pageLanguage: "auto",
				autoDisplay: false,
				includedLanguages: "ro,en",
				layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
			},
			"google_translate_element"
		);
	};
	

	const langChange = () => {
		const nextLanguage =
			selected === languages[0].value ? languages[1] : languages[0];
		setCookie("googtrans", decodeURI(nextLanguage.value));
		setSelected(nextLanguage.value);
		window.location.reload();
	};

	const getCurrentLanguageFlag = () => {
		const currentLanguage = languages.find((lang) => lang.value === selected);
		return currentLanguage ? currentLanguage.flag : "/usa-flag.png";
	};

	return (
		<>
			<div
				id="google_translate_element"
				style={{
					width: "0px",
					height: "0px",
					position: "absolute",
					left: "50%",
					zIndex: -99999,
					display: "none"
				}}
			></div>
			<div style={{ display: "flex", alignItems: "center" }}>
				<button
					onClick={langChange}
					style={{ border: "none", background: "none", cursor: "pointer" }}
				>
					<Image
						src={getCurrentLanguageFlag()}
						alt="Language Flag"
						width={40}
						height={35}
					/>
				</button>
			</div>
		</>
	);
};

export default GoogleTranslate;
