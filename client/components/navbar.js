import Image from "next/image";
import Link from "next/link";

import logo from "../public/logo.png";
import ProfileIcon from "../public/usericon.svg";

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

				<li className={styles.logo}>
					<Link href="/">
						<Image
							alt="logo"
							src={logo}
						/>
					</Link>
				</li>

				<li>
					<Link href="/despre-noi">despre noi</Link>
				</li>

				<li>
					<Link href="/contact">contact</Link>
				</li>

				<li className={styles.profile}>
					<Link href="/login">
						<Image
							alt="Profile Icon"
							src={ProfileIcon}
						/>
					</Link>
				</li>
			</ul>
		</div>
	);
};

export default Navbar;
