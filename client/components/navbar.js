import Image from "next/image";
import Link from "next/link";
import logo from "../public/logo.png";
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

			<Link href="/login">
				<svg
					className={styles.user}
					width="36"
					height="40"
					viewBox="0 0 36 40"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<g filter="url(#filter0_d_133_206)">
						<path
							d="M11.0018 10.9327C11.4089 14.6906 14.1348 17.1725 18.0002 17.1725C21.8654 17.1725 24.5911 14.6905 24.9983 10.9327L25.5754 6.87264C25.9334 2.88376 22.2828 0 18.0002 0C13.7175 0 10.0669 2.88376 10.4246 6.87264L11.0018 10.9327Z"
							fill="#BFA75D"
						/>
						<path
							d="M32.9699 27.2201L32.6937 25.6516C32.4623 24.3364 31.5352 23.2011 30.2031 22.6008L24.3893 19.9795C24.2073 19.8975 24.0592 19.7738 23.935 19.6357C22.2519 21.2224 20.2072 22.1556 18.0001 22.1556C15.7931 22.1556 13.7481 21.2224 12.0651 19.6357C11.9409 19.7738 11.7927 19.8975 11.6107 19.9795L5.79707 22.6008C4.46474 23.2011 3.53785 24.3364 3.30645 25.6516L3.03004 27.2201C2.93157 27.78 3.06154 28.6017 3.62403 29.0125C4.3761 29.5609 7.15426 32.9809 18.0001 32.9809C28.8458 32.9809 31.6238 29.5609 32.3759 29.0125C32.9386 28.6017 33.0684 27.78 32.9699 27.2201Z"
							fill="#BFA75D"
						/>
					</g>
					<defs>
						<filter
							id="filter0_d_133_206"
							x="0.3"
							y="0"
							width="35.4"
							height="39.6809"
							filterUnits="userSpaceOnUse"
							color-interpolation-filters="sRGB"
						>
							<feFlood
								flood-opacity="0"
								result="BackgroundImageFix"
							/>
							<feColorMatrix
								in="SourceAlpha"
								type="matrix"
								values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
								result="hardAlpha"
							/>
							<feOffset dy="4" />
							<feGaussianBlur stdDeviation="1.35" />
							<feComposite
								in2="hardAlpha"
								operator="out"
							/>
							<feColorMatrix
								type="matrix"
								values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
							/>
							<feBlend
								mode="normal"
								in2="BackgroundImageFix"
								result="effect1_dropShadow_133_206"
							/>
							<feBlend
								mode="normal"
								in="SourceGraphic"
								in2="effect1_dropShadow_133_206"
								result="shape"
							/>
						</filter>
					</defs>
				</svg>
			</Link>
		</div>
	);
};
export default Navbar;
