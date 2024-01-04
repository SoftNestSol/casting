import Image from "next/image";
import styles from "../../styles/contact/contact.module.scss";
import Link from "next/link";

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
				console.log("am ajuns pe client");
				const response = await fetch("https://europe-west1-mycasting-c5275.cloudfunctions.net/api/contact", {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(formData)
				});

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
			<h2 className={styles.heading2}>Studioul Nostru</h2>
			<div className={styles.container}>
				<div className={styles.detailsContainer}>
					<div className={styles.address}>
						<h1>Adresa</h1>
						<p className={styles.text}>
							Strada 1 Decembrie 1918, nr. 12, <span> 550009 Sibiu, Romania </span>{" "}
						</p>
					</div>

					<div className={styles.schendule}>
						<h2>Program</h2>
						<p className={styles.text}>
							Luni - Vineri: <span> 10:00 - 18:00 </span> <span> Sambata: 10:00 - 14:00 </span>{" "}
						</p>
					</div>
				</div>

				<div className={styles.mapContainer}>
					<iframe
						src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2849.0318333092523!2d26.08833338847682!3d44.432509227112675!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b1ff41eff5cb87%3A0xbfb28c887b0e969b!2sSector%205%2C%20Bucharest%20030167!5e0!3m2!1sen!2sro!4v1703352547288!5m2!1sen!2sro"
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
						<h2 className={styles.heading}>Contacteaza-ne prin e-mail</h2>

						<label
							htmlFor="name"
							className={styles.formLabel}
						>
							Nume
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
							Email
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
							Mesaj
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
							Am citit si sunt de acord cu{" "}
							<Link
								href="/terms"
								className={styles.formLink}
							>
								termenii si conditiile
							</Link>
						</label>

						<button
							type="submit"
							className={styles.formButton}
							onClick={handleFormSubmit}
						>
							Trimite Mesajul
						</button>
					</form>
				</div>
				<div className={styles.contactInfo}>
					<h2 className={styles.heading}>Contacteaza-ne prin telefon</h2>
					<p className={styles.textContact}>
						<Image
							className={styles.Image}
							src="/images/carousel/2.jpg"
							alt="text"
							width={70}
							height={70}
						/>
						David - <span> 0745 123 456 </span>{" "}
					</p>
					<p className={styles.textContact}>
						<Image
							className={styles.Image}
							src="/images/carousel/6.jpg"
							alt="text"
							width={70}
							height={70}
						/>
						Dana - <span> 0745 123 456 </span>{" "}
					</p>
				</div>
			</div>
		</>
	);
};

export default Contact;
