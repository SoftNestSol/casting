import React, { useEffect, useState } from "react";
import styles from "../styles/landing-page/TextRain.module.scss";

const TextRain = () => {
	const [texts, setTexts] = useState([]);

	useEffect(() => {
		const numberOfTexts = 6; // Example number
		const exclusionZone = 29; // Percentage of the central area to avoid, 15% on each side of the center

		// Generate an array of texts with unique styles (speed, size, and horizontal position)
		const tempTexts = Array.from({ length: numberOfTexts }).map((_, index) => {
			// Calculate the horizontal position, excluding the center of the screen
			let left;
			if (index % 2 === 0) {
				// Even indices on the left
				left = Math.random() * ((50 - exclusionZone / 2) / 2);
			} else {
				// Odd indices on the right
				left = Math.random() * ((50 - exclusionZone / 2) / 2) + (50 + 30 / 2);
			}

			return {
				content: "MY CASTING MY CASTING MY CASTING", // The text to rain down
				speed: Math.random() * (400 - 300) + 300, // Random speed between 300 and 400 seconds
				size: Math.random() * (15 - 5) + 5, // Random size between 5em and 15em
				delay: Math.random() * 10, // Random delay to stagger the animation start
				left: left // Horizontal position, avoiding the center
			};
		});

		setTexts(tempTexts);
	}, []);
	// Function to determine the appropriate blur class
	const getBlurClass = (size) => {
		if (size < 8) return styles.blurSmaller; // If font size is small
		if (size > 12) return styles.blurLarger; // If font size is large
		return styles.blurMiddle; // Middle size
	};
	return (
		<div className={styles.textRain}>
			{texts.map((text, index) => (
				<div
					key={index}
					className={`${styles.rainText} ${getBlurClass(text.size)}`}
					style={{
						animationDuration: `${text.speed}s`,
						animationDelay: `-${text.delay}s`,
						fontSize: `${text.size}em`,
						left: `${text.left}%`
					}}
				>
					{text.content}
				</div>
			))}
		</div>
	);
};

export default TextRain;
