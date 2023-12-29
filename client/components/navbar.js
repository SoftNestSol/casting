import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaUser } from "react-icons/fa6";
import { HiMenu } from "react-icons/hi";

import { useAuthContext } from "../contexts/auth.context";

import styles from "../styles/navbar.module.scss";
import Logo from "../public/logo.png";

const Navbar = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const router = useRouter();

	const { currentUser } = useAuthContext();

	useEffect(() => {
		setIsMenuOpen(false);
	}, [router]);

	return (
		<>
			<div className={styles.container}>
				<div
					className={styles.hamburger}
					onClick={() => setIsMenuOpen(!isMenuOpen)}
				>
					<HiMenu />
				</div>

				<ul>
					<li>
						<Link href="/casting">Castinguri</Link>
					</li>

					<li>
						<Link href="/portofoliu">Portofoliu</Link>
					</li>

					<li className={styles.logo}>
						<Link href="/">
							<Image
								alt="Logo"
								src={Logo}
							/>
						</Link>
					</li>

					<li>
						<Link href="/despre-noi">Despre noi</Link>
					</li>

					<li>
						<Link href="/contact">Contact</Link>
					</li>
				</ul>

				<div className={styles.profile}>
					{currentUser ? (
						<Link href={`/profile/${currentUser.uid}`}>
							<FaUser />
						</Link>
					) : (
						<Link href="/login">
							<FaUser />
						</Link>
					)}
				</div>
			</div>

			<div className={`${styles.menu} ${isMenuOpen ? styles.active : ""}`}>
				<ul>
					<li>
						<Link href="/casting">Castinguri</Link>
					</li>

					<li>
						<Link href="/portofoliu">Portofoliu</Link>
					</li>

					<li>
						<Link href="/despre-noi">Despre noi</Link>
					</li>

					<li>
						<Link href="/contact">Contact</Link>
					</li>
				</ul>
			</div>
		</>
	);
};

export default Navbar;
