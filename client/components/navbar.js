import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaUser } from "react-icons/fa6";
import { HiMenu } from "react-icons/hi";
import GoogleTranslate from "./google-translate";
import LanguageSwitcher from "./langSwithcer";
import { useAuthContext, checkIfAdmin } from "../contexts/auth.context";
import { FormattedMessage } from "react-intl";

import styles from "../styles/navbar.module.scss";
import Logo from "../public/logo.png";

const Navbar = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isAdmin, setIsAdmin] = useState(false);

	const router = useRouter();

	const { currentUser } = useAuthContext();

	useEffect(() => {
		setIsMenuOpen(false);
	}, [router]);

	useEffect(() => {
		if (currentUser) {
			checkIfAdmin(currentUser.uid).then(setIsAdmin);
		} else {
			setIsAdmin(false);
		}
	}, [currentUser]);

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
						<Link href="/servicii">
						<FormattedMessage id="navbar-service" />
						</Link>
					</li>

					<li>
						<Link href="/castings">
						<FormattedMessage id="navbar-casting" />
						</Link>
					</li>

					<li>
						<Link href="/portofoliu">
						<FormattedMessage id="navbar-projects" />
						</Link>
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
						<Link href="/despre-noi">
						<FormattedMessage id="navbar-about" />
						</Link>
					</li>

					<li>
						<Link href="/contact">
						<FormattedMessage id="navbar-contact" />
						</Link>
					</li>

					<li>
						<span>Invisible</span>
					</li>
				</ul>

				<div className={styles.buttons}>
					
				<LanguageSwitcher />
					<div className={styles.profile}>
						{currentUser ? (
							<Link
								href={isAdmin ? `/dashboard` : `/profile/${currentUser.uid}`}
							>
								<FaUser />
							</Link>
						) : (
							<Link href="/login">
								<FaUser />
							</Link>
						)}
					</div>
				</div>
			</div>

			<div className={`${styles.menu} ${isMenuOpen ? styles.active : ""}`}>
				<ul>
					<li>
						<Link href="/servicii">
							<FormattedMessage id="navbar-service" />
						</Link>
					</li>

					<li>
						<Link href="/castings">
							<FormattedMessage id="navbar-casting" />
						</Link>
					</li>

					<li>
						<Link href="/portofoliu">
							<FormattedMessage id="navbar-projects" />
						</Link>
					</li>

					<li>
						<Link href="/despre-noi">
							<FormattedMessage id="navbar-about" />
						</Link>
					</li>

					<li>
						<Link href="/contact">
							<FormattedMessage id="navbar-contact" />
						</Link>
					</li>
				</ul>
			</div>
		</>
	);
};

export default Navbar;
