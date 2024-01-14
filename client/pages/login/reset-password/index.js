import { use, useState } from "react";
import { useAuthContext } from "../../../contexts/auth.context";
import { FormattedMessage } from "react-intl";
import styles from "../../../styles/auth/auth.module.scss";
import Router from "next/router";
import { useRouter } from "next/router";

const ResetPassword = () => {
	const [email, setEmail] = useState("");
	const { sendResetPasswordEmail } = useAuthContext();
	const Router = useRouter();

	const handleFormSubmit = async (event) => {
		event.preventDefault();
		await sendResetPasswordEmail(email);
		alert("Email sent!");
		Router.push("/login");
	};

	return (
		<div className={styles.wrapper}>
			<div className={styles.container}>
				<div className={styles.top_section}>
					<h1 className={styles.title}>
						<FormattedMessage id="reset-password" />
					</h1>
				</div>

				<form onSubmit={handleFormSubmit}>
					<div className={styles.fields}>
						<label htmlFor="email">  
							<FormattedMessage id="email" />
						</label>
						<input
							id="email"
							name="email"
							onChange={(event) => setEmail(event.target.value)}
							required
							type="email"
							value={email}
						/>
					</div>

					<button type="submit">
						<FormattedMessage id="reset-password-call" />
					</button>
				</form>
			</div>
		</div>
	);
};

export default ResetPassword;