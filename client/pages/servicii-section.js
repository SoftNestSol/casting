import React, { useState } from "react";
import styles from "../styles/landing-page/Carousel.module.scss";
import Image from "next/image";

const slides = [
	{
		title: "Casting Actori",
		description:
			"Filme de ficțiune, documentare, videoclipuri muzicale, reclame - numiți-le! Cele mai multe genuri de media cinematografică creativă își transmit mesajele prin personajele poveștilor lor. Personaje care trebuie să prindă viață în voi, actori talentați. Indiferent dacă sunteți un actor aspirant sau un profesionist cu ani de experiență, puteți găsi proiectul potrivit pentru voi aici!",
		image: "/images/carousel/Carousel1.jpg"
	},
	{
		title: "Casting figurație",
		description:
			"Categoria de figurație este esențială pentru filmarea în fiecare producție cinematografică.Ce înseamnă ? -înseamnă că veți face parte din acțiunea filmului și din echipa actorilor, dar fără replici sau nevoie de vreo pregătire specifică.Dacă doriți să experimentați să faceți parte dintr-o producție cinematografică sau să vă începeți cariera de actor dintr-un loc sigur, atunci haideți să ne cunoaștem ca să înțelegem mai bine dorințele tale.",
		image: "/images/carousel/Carousel1.jpg"
	},
	{
		title: "Casting Modele",
		description:
			"Filmele, videoclipurile muzicale, reclamele, campaniile foto și multe alte producții creative caută persoane cu experiență în modelling. Lumea frumuseții devine din ce în ce mai incluzivă, iar apelurile pentru apariții diverse se extind în cele din urmă! Prin urmare, vă invităm pe toți cei care aveți ambiții și experiențe în modelling să vă depuneți candidaturile și să creșteți alături de noi la MyCasting!",
		image: "/images/carousel/Carousel1.jpg"
	},
	{
		title: "Casting Muzicieni/Cântăreți",
		description:
			"Producțiile de film și videoclipurile muzicale oferă numeroase oportunități pentru muzicieni, cântăreți și compozitori talentați. Indiferent de experiența sau stilul muzical, puteți contribui la filme sau muzică, crescând astfel notorietatea și avansând în cariera muzicală. Participarea la astfel de proiecte poate fi un pas semnificativ în dezvoltarea profesională a oricărui artist.",
		image: "/images/carousel/Carousel1.jpg"
	},
	{
		title: "Casting copii ",
		description:
			"Copiii au un farmec și o autenticitate  care sunt inexplicabile și inaccesibile pentru actorii maturi și profesioniști. Înțeleg mai bine natura jocului decât o facem noi, prin urmare pot fi autentici în timp ce sunt în pielea unui personaj.La MyCasting, prioritizăm siguranța fizică, mentală și emoțională a tuturor actorilor și în primul rând a copiilor.Cu noi, ei pot experimenta proiectele ca pe jocuri, să se distreze și să învețe despre producția de film într-un mediu sigur. ",
		image: "/images/carousel/Carousel1.jpg"
	},
	{
		title: "Portofolii profesionale",
		description:
			"Indiferent dacă sunteți actor, model, muzician sau aspirant în industria filmului, vă așteptăm la studio-ul nostru pentru fotografii profesionale gratuite. Ideal pentru cei fără portrete profesionale sau care doresc să le reîmprospăteze. Contactați-ne pentru o programare și veniți să ne cunoașteți la sediu, îmbunătățind astfel portofoliul vostru.",
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
						className={`${styles.carouselItem} ${index === activeIndex ? styles.active : ""}`}
						key={index}
					>
						<div className={styles.card}>
							<div className={styles.text}>
								<h2 className={styles.title}>{slide.title}</h2>
								<p className={styles.description}>{slide.description}</p>
							</div>
							<div className={styles.imageWrapper}>
								<Image
									className={styles.image}
									src={slide.image}
									alt="Description"
									width={500}
									height={500}
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
