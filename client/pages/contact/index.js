import Image from "next/image";
import styles from "../../styles/contact/contact.module.scss";
import Link from "next/link";
import { FormattedMessage } from "react-intl";

import { useState } from "react";

const Contact = () => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		message: ""
	});

	const handleInputChange = (event) => {
		const { name, value } = event.target;

		setFormData({
			...formData,
			[name]: value
		});
	};

	const handleFormSubmit = async (event) => {
		event.preventDefault();

		const { name, email, message } = event.target;

		if (termsAccepted === true) {
			try {
				const response = await fetch(
					"https://europe-west1-mycasting-c5275.cloudfunctions.net/api/contact",
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify(formData)
					}
				);

				const data = await response.json();
				console.log(data);
			} catch (error) {
				console.log(error);
			}
		} else {
			alert("Trebuie sa acceptati termenii si conditiile");
		}
	};

	const [termsAccepted, setTermsAccepted] = useState(false);

	return (
		<>
			<h2 className={styles.heading2}>
				<FormattedMessage id="contact title" />
			</h2>
			<div className={styles.container}>
				<div className={styles.detailsContainer}>
					<div className={styles.address}>
						<h1>
							<FormattedMessage id="contact address" />
						</h1>
						<p className={styles.text}>
							Strada Splaiul Unirii nr. 80-82 <span>Etaj 1, Bucuresti</span>{" "}
						</p>
					</div>

					<div className={styles.schendule}>
						<h2>
							<FormattedMessage id="contact schendule" />
						</h2>
						<p className={styles.text}>
							<FormattedMessage id="contact schendule text" />
							<span> 10:00 - 17:00 </span>{" "}
							<span>
								<FormattedMessage id="contact schendule text 2" />
							</span>{" "}
						</p>
					</div>
				</div>

				<div className={styles.mapContainer}>
					<iframe
						src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1424.8181656663737!2d26.10977102591637!3d44.420107797960355!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b1ff1b82584185%3A0xe45711d9b408a16e!2sSplaiul%20Unirii%2080%2C%20Bucure%C8%99ti!5e0!3m2!1sro!2sro!4v1704497593509!5m2!1sro!2sro"
						referrerPolicy="no-referrer-when-downgrade"
						className={styles.map}
						allowFullScreen=""
						loading="lazy"
					></iframe>
				</div>
			</div>

			<div className={styles.secondContainer}>
				<div className={styles.containerFormular}>
					<form className={styles.contactForm}>
						<h2 className={styles.heading}>
							<FormattedMessage id="contact form" />
						</h2>

						<label
							htmlFor="name"
							className={styles.formLabel}
						>
							<FormattedMessage id="name" />
						</label>
						<input
							onChange={handleInputChange}
							type="text"
							id="name"
							name="name"
							required
							value={formData.name}
							className={styles.formInput}
						/>

						<label
							htmlFor="email"
							className={styles.formLabel}
						>
							<FormattedMessage id="email" />
						</label>
						<input
							onChange={handleInputChange}
							type="email"
							id="email"
							name="email"
							required
							value={formData.email}
							className={styles.formInput}
						/>

						<label
							htmlFor="message"
							className={styles.formLabel}
						>
							<FormattedMessage id="Message" />
						</label>
						<textarea
							onChange={handleInputChange}
							id="message"
							name="message"
							rows="4"
							required
							value={formData.message}
							className={styles.formTextarea}
						></textarea>

						<label className={styles.formLabelChecked}>
							<input
								type="checkbox"
								name="terms"
								className={styles.formCheckbox}
								onChange={() => setTermsAccepted(!termsAccepted)}
							/>
							<FormattedMessage id="contact terms" />{" "}
							<Link
								href="/terms"
								className={styles.formLink}
							>
								<FormattedMessage id="contact terms link" />
							</Link>
						</label>

						<button
							type="submit"
							className={styles.formButton}
							onClick={handleFormSubmit}
						>
							<FormattedMessage id="contact send" />
						</button>
					</form>
				</div>
				<div className={styles.contactInfo}>
					<h2 className={styles.heading}>
						<FormattedMessage id="contact phone" />
					</h2>
					<p className={styles.textContact}>
						<Image
							className={styles.Image}
							src="/images/carousel/2.jpg"
							alt="text"
							width={70}
							height={70}
						/>
						David - <span> 0755 266 278 </span>{" "}
					</p>
					<p className={styles.textContact}>
						<Image
							className={styles.Image}
							src="/images/carousel/6.jpg"
							alt="text"
							width={70}
							height={70}
						/>
						Dana - <span> 0750 429 949 </span>{" "}
					</p>
				</div>
			</div>
		</>
	);
};

export default Contact;
