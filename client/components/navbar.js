import Image from "next/image";
import Link from "next/link";
import logo from "../public/logo.png";
import usericon from "../public/usericon.svg";
// Using the SVG component
import styles from "../styles/navbar.module.scss";
const Navbar = () => {
	return (
		<div className={styles.container}>
			<ul>
				<li>
					<Link href="/casting">casting-uri</Link>
				</li>
				<li>
					<Link href="/portofoliu">portofoliu</Link>
				</li>
				<li>
					<Link href="/">
						<Image
							className="logo"
							src={logo}
							alt="logo"
							width={50}
							height={50}
						/>
					</Link>
				</li>
				<li>
					<Link href="/despre-noi">despre noi</Link>
				</li>
				<li>
					<Link href="/contact">contact</Link>
				</li>
			</ul>

			<Link
				href="/login"
				className="usericon"
			>
				<Image
					src={usericon}
					alt="usericon"
					width={50}
					height={50}
				/>
			</Link>
		</div>
	);
};
export default Navbar;
