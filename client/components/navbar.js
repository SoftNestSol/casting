import Image from "next/image";
import Link from "next/link";

import logo from "../public/logo.png";
import ProfileIcon from "../public/usericon.svg";

import styles from "../styles/navbar.module.scss";
import { useAuthContext } from "../contexts/auth.context";

const Navbar = () => {
	const { currentUser } = useAuthContext();

	const dynamicLink = currentUser ? `/profile/${currentUser.id}` : "/login";

	return (
		<div className={styles.container}>
			<ul>
				<li>
					<Link href="/casting">Casting-uri</Link>
				</li>

				<li>
					<Link href="/portofoliu">Portofoliu</Link>
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
					<Link href="/despre-noi">Despre noi</Link>
				</li>

				<li>
					<Link href="/contact">Contact</Link>
				</li>

				<li className={styles.profile}>
					<Link href={dynamicLink}>
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
