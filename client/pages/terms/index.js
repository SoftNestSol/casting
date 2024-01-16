import styles from "../../styles/PrivacyPolicy.module.scss";

const PrivacyPolicy = () => (
	<>
	<div className={styles.head}>
	<div className={styles.PrivacyPolicyContainer}>
		<h1 className={styles.h1}>Politica de Confidențialitate</h1>
		<p className={styles.p}>Data ultimei actualizări: 15 Ianuarie 2024</p>
		<p className={styles.p}>
			La MyCasting SRL, respectăm și protejăm confidențialitatea vizitatorilor
			și utilizatorilor noștri. Această Politică de Confidențialitate explică
			modul în care colectăm, utilizăm, divulgăm și protejăm informațiile pe
			care ni le furnizați atunci când utilizați site-ul nostru web, în special
			în contextul inscrierii in baza de date a agentiei noastre de casting.
		</p>

		<h2 className={styles.h2}>Informații colectate</h2>
		<p className={styles.p}>
			Când va inscrieti pe site-ul nostru colectăm informațiile necesare pentru
			a procesa inscrierea dumneavoastră, cum ar fi numele, adresa de email si
			orice alte detalii pentru a va putea selecta si contacta pe viitor in
			vederea selectiei pentru diverse castinguri.
		</p>
		<h2 className={styles.h2}>Utilizarea informațiilor</h2>
		<p className={styles.p}>Utilizăm informațiile colectate pentru a:</p>
		<ul className={styles.ul}>
			<li className={styles.li}>Va afla in baza noastra de date pentru a putea fii selectat pentru castinguri</li>
			<li className={styles.li}>
				Comunica cu dumneavoastră despre posibile colaborari, castinguri, etc.
			</li>
			<li className={styles.li}>Îmbunătăți calitatea serviciilor noastre.</li>
			<li className={styles.li}>
				Preveni sau detecta fraudele sau abuzurile pe site-ul nostru web.
			</li>
		</ul>

		<h2 className={styles.h2}>Partajarea informațiilor</h2>
		<p className={styles.p}>
			Nu vindem, nu comercializăm și nu închiriem informațiile personale ale
			utilizatorilor unor terți. Putem dezvălui informații generale,
			ne-personale, legate de vizitele și utilizările site-ului nostru, cum ar
			fi numărul de vizite și informații demografice generale, unor parteneri de
			încredere.
		</p>

		<h2 className={styles.h2}>Securitatea datelor</h2>
		<p className={styles.p}>
			Ne angajăm să protejăm securitatea datelor personale. Implementăm diverse
			măsuri de securitate pentru a menține siguranța informațiilor
			dumneavoastră personale.
		</p>
		<h2 className={styles.h2}>Drepturile dumneavoastră</h2>
		<p className={styles.p}>
			În conformitate cu Regulamentul General privind Protecția Datelor (GDPR)
			al Comisiei Europene, aveți dreptul la acces, rectificare, ștergere și
			restricționarea prelucrării datelor personale. De asemenea, aveți dreptul
			de a vă opune prelucrării și dreptul la portabilitatea datelor.
		</p>

		<h2 className={styles.h2}>Modificări ale Politicii de Confidențialitate</h2>
		<p className={styles.p}>
			MyCasting SRL își rezervă dreptul de a modifica această politică de
			confidențialitate la anumite intervale de timp, fără notificare
			prealabilă, cu excepția publicării unei astfel de modificări pe site-ul
			nostru web.
		</p>

		<p className={styles.p}>
			Pentru orice întrebări sau nelămuriri legate de această politică sau de
			datele dumneavoastră personale, vă rugăm să ne contactați la
			contact@mycasting.ro
		</p>
		<p className={styles.p}>
			Prin utilizarea site-ului nostru web, si/sau inscrierea in baza noastra de date (sectiunea register) sunteți de acord cu această
			politică si cu prelucrarea datelor dumneavoastră personale.
			Daca aveti intrebari sau nelamuriri, va rugam sa ne contactati la adresa de e-mail contact@mycasting.ro
			</p>
	</div>
	</div>
	</>
);

export default PrivacyPolicy;