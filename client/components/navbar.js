import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaUser } from "react-icons/fa6";
import { HiMenu } from "react-icons/hi";
import LanguageSwitcher from "./langSwithcer";
import { useAuthContext, checkIfAdmin } from "../contexts/auth.context";
import { FormattedMessage } from "react-intl";

import styles from "../styles/navbar.module.scss";
import Logo from "../public/logo.png";

const AdminDropDown = ({ logout }) => {
	return (
		<div className={styles.logoutOptionDropDown}>
			<Link href="/dashboard">
				<FormattedMessage id="navbar-dashboard" />
			</Link>
			<button onClick={logout}>
				<FormattedMessage id="navbar-logout" />
			</button>
		</div>
	);
};

const UserDropDown = ({ logout }) => {
	return (
		<div className={styles.logoutOptionDropDown}>
			<Link href="/profile">
				<a>
					<FormattedMessage id="navbar-profile" />
				</a>
			</Link>
			<button onClick={logout}>
				<FormattedMessage id="navbar-logout" />
			</button>
		</div>
	);
};

const Navbar = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isAdmin, setIsAdmin] = useState(false);
	const [isDropDownOpen, setIsDropDownOpen] = useState(false);
	const router = useRouter();

	const { currentUser } = useAuthContext();

	const { logout } = useAuthContext();

	useEffect(() => {
		setIsMenuOpen(false);
	}, [router.asPath]);

	useEffect(() => {
		if (currentUser) {
			checkIfAdmin(currentUser.uid).then(setIsAdmin);
		} else {
			setIsAdmin(false);
		}
	}, [currentUser]);

	const handleProfileClick = () => {
		setIsDropDownOpen(!isDropDownOpen);
	};

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
					<div
						className={styles.profile}
						onClick={handleProfileClick}
					>
						{currentUser ? (
							<>
								<FaUser />
								{isDropDownOpen &&
									(isAdmin ? (
										<AdminDropDown logout={logout} />
									) : (
										<UserDropDown logout={logout} />
									))}
							</>
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
