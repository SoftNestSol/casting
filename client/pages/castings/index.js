import { useCastingsContext } from "../../contexts/castings.context";
import Head from "next/head";
import { useRouter } from "next/router";
import styles from "../../styles/castings/castings.module.scss";
import { FormattedMessage } from "react-intl";

const articleEN = `
<div style="text-align:center; max-width: 800px; margin: auto; padding-top: 100px;">
  
  <p>The world of casting is both exciting and daunting. Whether you're an aspiring actor, a seasoned performer, or a talent scout, understanding the ins and outs of the casting process is crucial for success in the entertainment industry. In the following lines, we'll dive into the essential aspects of casting, offering a comprehensive guide to navigating auditions, preparation tips, and how MyCasting.ro can be your gateway to discovering opportunities.</p>

  <h2>Understanding the Casting Process</h2>
  <p>Casting is the cornerstone of any production, be it a film, television show, theater production, or commercial. It involves selecting the right talent who can bring characters to life and resonate with the audience. The process begins with casting calls or auditions, where actors perform in front of casting directors or a panel, showcasing their ability to embody different roles.</p>

  <h2>Preparation is Key</h2>
  <p>Before you step into the audition room, thorough preparation is your best ally. This includes having a professional headshot that captures your essence, a resume detailing your acting experience, and prepared monologues that highlight your range. Understanding the character and the production you're auditioning for will also give you a competitive edge.</p>

  <h2>The Audition</h2>
  <p>Auditions can vary widely, but they often involve performing a prepared piece, cold reading from the script, and sometimes improvisation. This is your moment to shine and demonstrate not just your acting skills but also your ability to take direction and adapt.</p>

  <h2>Post-Audition Strategies</h2>
  <p>After the audition, it's important to follow up with a thank-you note to the casting team, showing your appreciation for the opportunity. Equally, dealing with the outcomes—whether you land the role or not—is a learning experience. Rejection can be disheartening, but it's part of the industry and a chance to grow.</p>

  <h2>Creating an Account on MyCasting.ro</h2>
  <p>For those looking to dive into the casting world, MyCasting.ro is a platform to connect with casting opportunities. Creating an account is a straightforward process that opens the door to numerous casting calls, industry contacts, and resources to further your acting career.</p>
	<br>
  <p>By understanding the casting process and leveraging platforms like MyCasting.ro, actors can navigate the entertainment industry with confidence and grace. Stay prepared, embrace every opportunity, and remember, every audition is a step closer to your next big role.</p>
</div>`;

const articleRO = `<div style="text-align:center; max-width: 800px; margin: auto; padding-top: 100px;">

<p>Pe cât de captivantă este lumea castingului, pe atât de descurajantă poate fi de asemenea. Fie că ești un actor aspirant, un interpret experimentat sau un scouter de talente, înțelegerea procesului de casting este un element crucial pentru succesul în industria divertismentului. În rândurile care urmează, vom explora aspectele esențiale ale castingului, oferind un ghid complet ce implică sfaturi de pregătire, dar și cum MyCasting.ro poate fi portalul tău spre descoperirea oportunităților.</p>

<h2>Înțelegerea procesului de casting</h2>
<p>Castingul este piatra de temelie a oricărei producții, fie că este vorba de un film, un show de televiziune, un spectacol de teatru sau o reclamă. Acesta implică selecția talentului potrivit care poate aduce personajele la viață și poate rezona cu publicul. Procesul începe cu apeluri pentru casting sau audiții, unde actorii performează în fața directorilor de casting sau a unui panel, demonstrându-și astfel capacitatea de a interpreta diferite roluri.</p>

<h2>Pregătirea este cheia succesului</h2>
<p>Înainte de a intra în sala de audiție, o pregătire temeinică este cel mai bun aliat al tău. Aceasta include aducerea unei fotografii de profil profesională care îți captează esența, un CV care detaliază experiența ta în actorie și monologuri pregătite care să-ți pună în evidență diversitatea de personaje pe care le poți interpreta. Înțelegerea producției, dar și a rolului pentru care susții audiția îți vor oferi, de asemenea, un avantaj.</p>

<h2>Audiția</h2>
<p>Audițiile pot varia, dar adesea implică interpretarea unei piese pregătite, citirea pe loc din scenariu și uneori improvizație. Acesta este momentul tău să strălucești și să demonstrezi nu doar abilitățile tale actoricești, dar și capacitatea ta de a urma direcții și de a te adapta neprevăzutului.</p>

<h2>Strategii post-audiție</h2>
<p>După audiție, este important să arăți apreciere echipei de casting, mulțumind pentru oportunitate. De asemenea, gestionarea rezultatelor – indiferent dacă ai obținut rolul sau nu – este o experiență din care se învață. Respingerea poate fi descurajantă, dar face parte din industrie și este o șansă de a crește.</p>

<h2>Crearea unui cont pe MyCasting.ro</h2>
<p>Pentru cei care doresc să se avânte în lumea castingului, MyCasting.ro este o platformă menită să te conecteze cu oportunități de casting. Crearea unui cont este un proces simplu, care deschide ușa către numeroase apeluri pentru casting, contacte din industrie și resurse pentru a-ți avansa cariera actoricească.</p>

<p>Prin înțelegerea procesului de casting și valorificarea platformelor precum MyCasting.ro, actorii pot naviga prin industria divertismentului cu încredere. Rămâi pregătit, valorifică fiecare oportunitate și amintește-ți că fiecare audiție este un pas mai aproape de următorul tău rol.</p>
</div>`;

const Castings = () => {
	const { locale } = useRouter();

	const pageTitle =
		locale === "en"
			? "Open Castings - MyCasting"
			: "Castinguri deschise - MyCasting";

	const renderArticle = () => {
		return (
			<div style={{ textAlign: "center" }}>
				{locale === "en" ? (
					<div dangerouslySetInnerHTML={{ __html: articleEN }} />
				) : (
					<div dangerouslySetInnerHTML={{ __html: articleRO }} />
				)}
			</div>
		);
	};

	const { castings } = useCastingsContext();

	const formatDate = (date, longFormat = false) => {
		date = new Date(date);

		const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
		const month =
			date.getMonth() + 1 < 10
				? "0" + (date.getMonth() + 1)
				: date.getMonth() + 1;
		const year = date.getFullYear();

		const monthNames = [
			"jan",
			"feb",
			"mar",
			"apr",
			"may",
			"jun",
			"jul",
			"aug",
			"sep",
			"oct",
			"nov",
			"dec"
		];

		if (longFormat)
			return `<span>${day}</span> ${monthNames[month - 1]} ${year}`;
		return `${day}.${month}.${year}`;
	};

	const getDuration = (startDate, endDate) => {
		startDate = new Date(startDate);
		endDate = new Date(endDate);

		return (endDate - startDate) / (1000 * 60 * 60 * 24);
	};

	return (
		<>
			<Head>
				<title>{pageTitle}</title>
			</Head>

			<div className={styles.wrapper}>
				<div className={styles.top_section}>
					<h1>
						<FormattedMessage id="casting title" />
					</h1>
					<h1>
						<FormattedMessage id="casting title 2" />
					</h1>
				</div>

				{castings.length > 0 ? (
					<div className={styles.castings}>
						{castings.map((casting, index) => (
							<div
								className={styles.casting}
								key={index}
							>
								<div className={styles.casting_head}>
									<h3
										dangerouslySetInnerHTML={{
											__html: formatDate(casting.startDate, true)
										}}
									></h3>
									<h3>
										<span>{casting.remainingDays}</span>{" "}
										<FormattedMessage id="casting days" />
									</h3>
								</div>

								<div className={styles.casting_body}>
									<h2>{casting.title}</h2>

									<div className={styles.casting_content}>
										<div className={styles.casting_field}>
											<h3>
												<FormattedMessage id="casting project" />:
											</h3>
											<h4>{casting.project}</h4>
										</div>

										<div className={styles.casting_field}>
											<h3>
												<FormattedMessage id="casting looking" />:
											</h3>
											<h4>{casting.lookingFor.join(", ")}</h4>
										</div>

										<div className={styles.casting_field}>
											<h3>
												<FormattedMessage id="casting age" />:
											</h3>
											<h4>
												{casting.ageRange[0]} - {casting.ageRange[1]}
											</h4>
										</div>

										<div className={styles.casting_field}>
											<h3>
												<FormattedMessage id="casting time" />:
											</h3>
											<h4>
												{formatDate(casting.startDate)} -{" "}
												{formatDate(casting.endDate)}
											</h4>
										</div>

										<div className={styles.casting_field}>
											<h3>
												<FormattedMessage id="casting location" />:
											</h3>
											<h4>{casting.location}</h4>
										</div>

										<div className={styles.casting_field}>
											<h3>
												<FormattedMessage id="casting duration" />:
											</h3>
											<h4>
												{getDuration(casting.startDate, casting.endDate)} zile
											</h4>
										</div>

										<div className={styles.casting_field}>
											<h3>
												<FormattedMessage id="casting compensation" />:
											</h3>
											<h4>{casting.compensation} RON</h4>
										</div>

										<div className={styles.casting_field}>
											<h3>
												<FormattedMessage id="casting country" />: :
											</h3>
											<h4>{casting.country}</h4>
										</div>
									</div>

									<h3>
										<FormattedMessage id="casting description" />:
									</h3>
									<p>{casting.description}</p>
								</div>
							</div>
						))}
					</div>
				) : (
					<div className={styles.no_castings}>
						<h2>
							<FormattedMessage id="castings-no-casting" />
						</h2>
					</div>
				)}
				{renderArticle()}
			</div>
		</>
	);
};

export default Castings;
