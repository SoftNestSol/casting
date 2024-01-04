import React, { useEffect, useState } from "react";
import styles from "../styles/landing-page/TextRain.module.scss";

const predefinedTexts = [
	{ content: "MYCASTING MYCASTING MYCASTING", speed: 46, size: 10, left: 10 },
	{ content: "MYCASTING MYCASTING MYCASTING", speed: 42, size: 4, left: 30 },
	{ content: "MYCASTING MYCASTING MYCASTING", speed: 60, size: 8, left: 60 },
	{ content: "MYCASTING MYCASTING MYCASTING", speed: 100, size: 16, left: 80 }
];

const TextRain = () => {
	const [texts, setTexts] = useState([]);
	const [isMobile, setIsMobile] = useState(false);

	const updateScreenSize = () => {
		setIsMobile(window.innerWidth < 768);
	};

	useEffect(() => {
		window.addEventListener("resize", updateScreenSize);
		updateScreenSize();

		return () => {
			window.removeEventListener("resize", updateScreenSize);
		};
	}, []);

	useEffect(() => {
		const activeTexts = isMobile
			? predefinedTexts.filter((_, index) => index % 2 === 0)
			: predefinedTexts;

		setTexts(
			activeTexts.map((text) => ({
				...text,
				content: text.content.split("")
			}))
		);
	}, [isMobile]);

	const getBlurClass = (size) => {
		if (size <= 8) return styles.blurSmaller;
		if (size >= 12) return styles.blurLarger;
		return styles.blurMiddle;
	};

	return (
		<div className={styles.textRain}>
			{texts.map((text, index) => (
				<div
					key={index}
					className={`${styles.rainText} ${getBlurClass(text.size)}`}
					style={{
						animationDuration: `${text.speed}s`,
						fontSize: `${text.size}rem`,
						left: `${text.left}%`
					}}
				>
					{text.content.map((letter, index) => (
						<span
							key={index}
							dangerouslySetInnerHTML={{ __html: letter }}
							style={{
								height: `calc(${text.size}rem - 1rem)`
							}}
						/>
					))}
				</div>
			))}
		</div>
	);
};

export default TextRain;
