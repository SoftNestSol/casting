import React, { useState } from "react";
import styles from "../styles/landing-page/Carousel.module.scss";
import Image from "next/image";

const slides = [
	{
		title: "Casdasdadsd",
		description:
			"Găsește talentul perfect pentru proiectul tău! Echipa noastră specializată în casting te ajută să selectezi actorii și modelele ideale pentru orice tip de producție, fie că este vorba de film, reclame sau proiecte fotografice. Avem o bază de date extinsă și variată, garantând potrivirea perfectă pentru viziunea ta artistică.",
		image: "/images/carousel/Carousel1.jpg"
	},
	{
		title: "Casdasdadsd",
		description:
			"Găsește talentul perfect pentru proiectul tău! Echipa noastră specializată în casting te ajută să selectezi actorii și modelele ideale pentru orice tip de producție, fie că este vorba de film, reclame sau proiecte fotografice. Avem o bază de date extinsă și variată, garantând potrivirea perfectă pentru viziunea ta artistică.",
		image: "/images/carousel/Carousel1.jpg"
	}
	// ...other slides
];

const Carousel = () => {
	const [activeIndex, setActiveIndex] = useState(0);

	const goToPrevSlide = () => {
		setActiveIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
	};

	const goToNextSlide = () => {
		setActiveIndex((prevIndex) => (prevIndex + 1) % slides.length);
	};

	return (
		<div className={styles.carousel}>
			<div
				className={styles.carouselInner}
				style={{ transform: `translateX(-${activeIndex * 100}%)` }}
			>
				{slides.map((slide, index) => (
					<div
						className={styles.carouselItem}
						key={index}
					>
						<div className={styles.card}>
							<div className={styles.text}>
								<h2 className={styles.title}>{slide.title}</h2>
								<p className={styles.description}>{slide.description}</p>
							</div>
							<div className={styles.imageWrapper}>
								{/* You may need to add this wrapper */}
								<Image
									className={styles.image}
									src={slide.image}
									alt="Description"
									layout="fill"
									objectFit="cover" // This will cover the area without stretching the image
								/>
							</div>
						</div>
					</div>
				))}
			</div>
			<div className={styles.carouselControls}>
				<button
					className={styles.prevButton}
					onClick={goToPrevSlide}
				>
					&lt;
				</button>
				<button
					className={styles.nextButton}
					onClick={goToNextSlide}
				>
					&gt;
				</button>
			</div>
			<div className={styles.carouselIndicators}>
				{slides.map((_, index) => (
					<span
						key={index}
						className={`${styles.indicator} ${index === activeIndex ? styles.active : ""}`}
						onClick={() => setActiveIndex(index)}
					></span>
				))}
			</div>
		</div>
	);
};

export default Carousel;
