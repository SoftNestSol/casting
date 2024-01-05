// Footer.js
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/footer/footer.module.scss"; // ensure the path is correct

const Footer = () => {

	const todayDate = new Date();
	const year = todayDate.getFullYear();


	return (
		<footer className={styles.footer}>
			<div className={styles.footerContent}>
				<div className={styles.logoSection}>
					{/* Logo goes here, replace with your image path */}
					<Image
						src="/logo.png"
						alt="Logo"
						width={100}
						height={100}
					/>
				</div>
				<div className={styles.linksSection}>
					{/* Navigation links go here */}
					<div className={styles.menu}>
						<h5>Navigare</h5>
						<Link href="/">Acasă</Link>
						<Link href="/contact">Contact</Link>
						<Link href="/despre-noi">Despre noi</Link>
						<Link href="/castings">Castinguri</Link>
						<Link href="/portofoliu">Portofoliu</Link>
					</div>
					<div className={styles.address}>
						<h5>Contact</h5>
						<p>Strada Splaiul Unirii nr. 80-82, etaj 1, Bucuresti</p>
						<p> Telefon: +40 750429949</p>
						<p>Email: contact@mycasting.ro </p>
					</div>
					<div className={styles.schedule}>
						<h5>Program</h5>
						<p>L-V | 10:00 - 17:00</p>
					</div>
					<div className={styles.social}>{/* Social links go here */}</div>
				</div>
			</div>
			<p>© {year} MyCasting. Toate drepturile rezervate.</p>
			<div className={styles.footerBottom}>
				<div className={styles.disputeSection}>
					<Link href="https://anpc.ro/ce-este-sal/">
						<Image
							src="/images/sal.png"
							alt="Sal"
							width={200}
							height={50}
						/>
					</Link>

					<Link href="https://anpc.ro/ce-este-sal/">
						<Image
							src="/images/sol.png"
							alt="Sol"
							width={200}
							height={50}
						/>
					</Link>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
