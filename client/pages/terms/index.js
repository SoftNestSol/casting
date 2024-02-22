import Head from "next/head";
import { useRouter } from "next/router";
import styles from "../../styles/PrivacyPolicy.module.scss";

const PrivacyPolicy = () => {
	const { locale } = useRouter();

	const content = {
		title: {
			en: "Privacy Policy - MyCasting",
			ro: "Politica de Confidențialitate - MyCasting"
		},
		heading: {
			en: "Privacy Policy",
			ro: "Politica de Confidențialitate"
		},
		updateDate: {
			en: "Last updated: January 15, 2024",
			ro: "Data ultimei actualizări: 15 Ianuarie 2024"
		},
		paragraph1: {
			en: "At MyCasting SRL, we respect and protect the privacy of our visitors and users. This privacy policy explains how we collect, use, disclose, and protect the information you provide to us when you use our website, especially in the context of registering with our casting agency.",
			ro: "La MyCasting SRL, respectăm și protejăm confidențialitatea vizitatorilor și utilizatorilor noștri. Această politică de confidențialitate explică modul în care colectăm, utilizăm, divulgăm și protejăm informațiile pe care ni le furnizați atunci când utilizați site-ul nostru web, în special în contextul inscrierii in baza de date a agenției noastre de casting."
		},
		heading2: {
			en: "Collected information ",
			ro: "Informații colectate"
		},
		paragraph2: {
			en: "When you register on our website, we collect the information necessary to process your registration, such as your name, email address, and any other details to be able to select and contact you in the future for various castings.",
			ro: "Când vă înscrieți pe site-ul nostru, colectăm informațiile necesare pentru a procesa înscrierea dumneavoastră, cum ar fi numele, adresa de email și orice alte detalii pentru a vă putea selecta și contacta pe viitor în vederea selecției pentru diverse castinguri."
		},
		heading3: {
			en: "Use of information",
			ro: "Utilizarea informațiilor"
		},
		paragraph3: {
			en: "We use the collected information to:",
			ro: "Utilizăm informațiile colectate pentru a:"
		},
		list: {
			en: [
				"Find you in our database to be able to select you for castings",
				"Communicate with you about possible collaborations, castings, etc.",
				"Improve the quality of our services.",
				"Prevent or detect fraud or abuse on our website."
			],
			ro: [
				"Vă afla în baza noastră de date pentru a putea fi selectat pentru castinguri",
				"Comunica cu dumneavoastră despre posibile colaborari, castinguri, etc.",
				"Îmbunătăți calitatea serviciilor noastre.",
				"Preveni sau detecta fraudele sau abuzurile pe site-ul nostru web."
			]
		},
		heading4: {
			en: "Sharing information",
			ro: "Partajarea informațiilor"
		},
		paragraph4: {
			en: "We do not sell, trade, or rent users' personal information to third parties. We may disclose general, non-personal information related to visits and uses of our website, such as the number of visits and general demographic information, to trusted partners.",
			ro: "Nu vindem, nu comercializăm și nu închiriem informațiile personale ale utilizatorilor unor terți. Putem dezvălui informații generale, ne-personale, legate de vizitele și utilizările site-ului nostru, cum ar fi numărul de vizite și informații demografice generale, unor parteneri de încredere."
		},
		heading5: {
			en: "Data security",
			ro: "Securitatea datelor"
		},
		paragraph5: {
			en: "We are committed to protecting the security of personal data. We implement various security measures to maintain the security of your personal information.",
			ro: "Ne angajăm să protejăm securitatea datelor personale. Implementăm diverse măsuri de securitate pentru a menține siguranța informațiilor dumneavoastră personale."
		},
		heading6: {
			en: "Your rights",
			ro: "Drepturile dumneavoastră"
		},
		paragraph6: {
			en: "In accordance with the General Data Protection Regulation (GDPR) of the European Commission, you have the right to access, rectify, delete, and restrict the processing of personal data. You also have the right to object to processing and the right to data portability.",
			ro: "În conformitate cu Regulamentul General privind Protecția Datelor (GDPR) al Comisiei Europene, aveți dreptul la acces, rectificare, ștergere și restricționarea prelucrării datelor personale. De asemenea, aveți dreptul de a vă opune prelucrării și dreptul la portabilitatea datelor."
		},
		heading7: {
			en: "Changes to the Privacy Policy",
			ro: "Modificări ale Politicii de Confidențialitate"
		},
		paragraph7: {
			en: "MyCasting SRL reserves the right to modify this privacy policy at certain intervals, without prior notice, except for the publication of such modifications on our website.",
			ro: "MyCasting SRL își rezervă dreptul de a modifica această politică de confidențialitate la anumite intervale de timp, fără notificare prealabilă, cu excepția publicării unei astfel de modificări pe site-ul nostru web."
		},
		paragraph8: {
			en: "For any questions or concerns about this policy or your personal data, please contact us at contact@mycasting.ro",
			ro: "Pentru orice întrebări sau nelămuriri legate de această politică sau de datele dumneavoastră personale, vă rugăm să ne contactați la contact@mycasting.ro"
		},
	  paragraph9: {
			en: "By using our website and/or registering in our database (register section) you agree with this policy and the processing of your personal data. If you have any questions or concerns, please contact us at contact@mycasting.ro",
			ro: "Prin utilizarea site-ului nostru web, si/sau inscrierea in baza noastra de date (sectiunea register) sunteți de acord cu această politică si cu prelucrarea datelor dumneavoastră personale. Daca aveti intrebari sau nelamuriri, va rugam sa ne contactati la adresa de e-mail contact@mycasting.ro"
		},
	};

	const getText = (key) => content[key][locale] || content[key].en;

	return (
		<>
				<Head>
						<title>{getText('title')}</title>
				</Head>
				<div className={styles.head}>
						<div className={styles.PrivacyPolicyContainer}>
								<h1 className={styles.h1}>{getText('heading')}</h1>
								<p className={styles.p}>{getText('updateDate')}</p>
								<p className={styles.p}>{getText('paragraph1')}</p>
								
								<h2 className={styles.h2}>{getText('heading2')}</h2>
								<p className={styles.p}>{getText('paragraph2')}</p>

								<h2 className={styles.h2}>{getText('heading3')}</h2>
								<p className={styles.p}>{getText('paragraph3')}</p>
								<ul className={styles.ul}>
										{getText('list').map((item, index) => (
												<li key={index} className={styles.li}>{item}</li>
										))}
								</ul>

								<h2 className={styles.h2}>{getText('heading4')}</h2>
								<p className={styles.p}>{getText('paragraph4')}</p>

								<h2 className={styles.h2}>{getText('heading5')}</h2>
								<p className={styles.p}>{getText('paragraph5')}</p>

								<h2 className={styles.h2}>{getText('heading6')}</h2>
								<p className={styles.p}>{getText('paragraph6')}</p>

								<h2 className={styles.h2}>{getText('heading7')}</h2>
								<p className={styles.p}>{getText('paragraph7')}</p>

								<p className={styles.p}>{getText('paragraph8')}</p>
								<p className={styles.p}>{getText('paragraph9')}</p>
						</div>
				</div>
		</>
);
};

export default PrivacyPolicy;
