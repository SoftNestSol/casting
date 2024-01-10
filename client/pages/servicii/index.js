import Image from "next/image";

import styles from "../../styles/servicii/servicii.module.scss";

const services = [
	{
		title: "Casting Actori",
		description:
			"Filme de ficțiune, documentare, videoclipuri muzicale, reclame - numiți-le! Cele mai multe genuri de media cinematografică creativă își transmit mesajele prin personajele poveștilor lor. Personaje care trebuie să prindă viață în voi, actori talentați. Indiferent dacă sunteți un actor aspirant sau un profesionist cu ani de experiență, puteți găsi proiectul potrivit pentru voi aici!",
		image: "/images/carousel/1.jpg"
	},
	{
		title: "Casting figurație",
		description:
			"Categoria de figurație este esențială pentru filmarea în fiecare producție cinematografică.Ce înseamnă ? -înseamnă că veți face parte din acțiunea filmului și din echipa actorilor, dar fără replici sau nevoie de vreo pregătire specifică.Dacă doriți să experimentați să faceți parte dintr-o producție cinematografică sau să vă începeți cariera de actor dintr-un loc sigur, atunci haideți să ne cunoaștem ca să înțelegem mai bine dorințele tale.",
		image: "/images/carousel/2.jpg"
	},
	{
		title: "Casting Modele",
		description:
			"Filmele, videoclipurile muzicale, reclamele, campaniile foto și multe alte producții creative caută persoane cu experiență în modelling. Lumea frumuseții devine din ce în ce mai incluzivă, iar apelurile pentru apariții diverse se extind în cele din urmă! Prin urmare, vă invităm pe toți cei care aveți ambiții și experiențe în modelling să vă alăturați echipei noastre și să creșteți alături de noi la MyCasting!",
		image: "/images/carousel/3.jpg"
	},
	{
		title: "Casting Muzicieni/Cântăreți",
		description:
			"Producțiile de film și videoclipurile muzicale oferă numeroase oportunități pentru muzicieni, cântăreți și compozitori talentați. Indiferent de experiența sau stilul muzical, puteți contribui la filme sau muzică, crescând astfel notorietatea și avansând în cariera muzicală. Participarea la astfel de proiecte poate fi un pas semnificativ în dezvoltarea profesională a oricărui artist.",
		image: "/images/carousel/4.jpg"
	},
	{
		title: "Casting copii ",
		description:
			"Copiii au un farmec și o autenticitate  care sunt inexplicabile și inaccesibile pentru actorii maturi și profesioniști. Înțeleg mai bine natura jocului decât o facem noi, prin urmare pot fi autentici în timp ce sunt în pielea unui personaj.La MyCasting, prioritizăm siguranța fizică, mentală și emoțională a tuturor actorilor și în primul rând a copiilor.Cu noi, ei pot experimenta proiectele ca pe jocuri, să se distreze și să învețe despre producția de film într-un mediu sigur. ",
		image: "/images/carousel/5.jpg"
	},
	{
		title: "Portofolii profesionale",
		description:
			"Indiferent dacă sunteți actor, model, muzician sau aspirant în industria filmului, vă așteptăm la studio-ul nostru pentru fotografii profesionale. Ideal pentru cei fără portrete profesionale sau care doresc să le reîmprospăteze. Contactați-ne pentru o programare și veniți să ne cunoașteți la sediu, îmbunătățind astfel portofoliul vostru.",
		image: "/images/carousel/6.jpg"
	}
	// ...other slides
];

const Services = () => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.top_section}>
				<h1>Serviciile</h1>
				<h1>Noastre</h1>
			</div>

			<div className={styles.services}>
				{services.map((service, index) => (
					<div
						className={styles.service}
						key={index}
					>
						<div className={styles.service_image}>
							<Image
								alt={service.title}
								src={service.image}
								layout="fill"
							/>
						</div>
						<div className={styles.service_text}>
							<h2>{service.title}</h2>
							<p>{service.description}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Services;
