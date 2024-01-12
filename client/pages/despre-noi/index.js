import Image from "next/image";

import styles from "../../styles/about-us/about-us.module.scss";

const AboutUs = () => {
	return (
		<>
			<div className={styles.container}>
				<Image
					alt={"About us"}
					src="/images/about-us.jpg"
					width={1000}
					height={1000}
				/>
				<div className={styles.gradient} />
				<h1 className={styles.heading}>
					Despre <span className={styles.accent}>Noi</span>
				</h1>
				<p className={styles.subtitle}>O agentie pentru tine</p>
				<p className={styles.verticalText}>MyCasting</p>
			</div>

			<div className={styles.secondContainer}>
				<Image
					alt={"About us"}
					src="/images/about_second.jpg"
					width={1000}
					height={1000}
				/>
				<div className={styles.gradient} />
				<p className={styles.text}>
					Compania noastră se distinge pe piața castingului prin abordarea
					inovatoae și dedicarea față de artiști. Ne dorim ca această colaborare
					internațională să vă ofere șansa unor experiențe unice și diferite în
					carierele voastre ca actori. Unicitatea noastră nu constă doar în
					această conexiune internațională pe care o avem cu echipele din China
					, ci și în modul în care comunicăm și ascultăm fiecare actor.
				</p>
			</div>

			<div className={styles.thirdContainer}>
				<Image
					alt={"About us"}
					src="/images/about_third.jpg"
					width={1000}
					height={1000}
				/>
				<div className={styles.gradient} />
				<p className={styles.text}>
					Istoricul companiei noastre, myCasting, este marcat de momente cheie
					care reflectă angajamentul nostru față de inovație și creativitate.
					Compania a fost fondată din dorința de a crea un spațiu unde
					creativitatea poate fi celebrată și transformată în realitate, pe
					micile sau marile ecrane. Am vrut să oferim fiecărui individ - fie că
					este actor experimentat sau un entuziast al artei - oportunitatea de
					a-și pune în valoare talentul și ideile.
				</p>
			</div>

			<div className={styles.fourthContainer}>
				<Image
					alt={"About us"}
					src="/images/about_fourth.jpg"
					width={1000}
					height={1000}
				/>
				<div className={styles.gradient} />
				<p className={styles.text}>
					Ne angajăm să educăm artiștii, subliniind importanța exprimării libere
					și a dialogului deschis, mai ales în situațiile dificile întâmpinate
					în timpul filmărilor. Aceasta abordare centrată pe actor ne-a adus
					aprecierea profundă din partea acestora în cele două proiecte majore
					pe care le-am realizat, evidențiindu-ne ca o companie care pune cu
					adevărat valoare pe bunăstarea și dezvoltarea profesională a
					clienților noștri.
				</p>
			</div>

			<div className={styles.fifthContainer}>
				<Image
					alt={"About us"}
					src="/images/carousel/6.jpg"
					width={1000}
					height={1000}
				/>
				<div className={styles.gradient} />
				<p className={styles.text}>
					Un aspect distinctiv al companiei noastre este colaborarea cu China.
					Această decizie a fost animată de dorința de a explora noi frontiere
					în industria de entertainment și de a construi un pod cultural între
					Est și Vest. Prin această colaborare unică, am reușit să aducem o nouă
					perspectivă în cadrul proiectelor noastre și să oferim oportunități
					unice actorilor noștri.
				</p>
			</div>
		</>
	);
};

export default AboutUs;
