import { useCastingsContext } from "../../contexts/castings.context";

import styles from "../../styles/castings/castings.module.scss";
import { FormattedMessage } from "react-intl";

const Castings = () => {
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
		</div>
	);
};

export default Castings;
