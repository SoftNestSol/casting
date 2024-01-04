const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const corsOptions = {
	origin: "46.214.10.153",
	optionsSuccessStatus: 200,
	credentials: true,
	allowedHeaders: [
		"Content-Type",
		"Authorization",
		"X-Requested-With",
		"Accept",
		"Origin",
		"X-Access-Token",
		"Access-Control-Allow-Origin"
	],
	methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"]
};

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

app.post("/contact", (req, res) => {
	const { name, email, message } = req.body;

	console.log("am ajuns pe server");
	// Create a transporter
	const transporter = nodemailer.createTransport({
		host: "hosting2303630.online.pro",
		port: 587,
		secure: false,
		auth: {
			user: "contact@mycasting.ro",
			pass: process.env.PASS_CONTACT
		}
	});

	// Create the mail options
	const mailOptions = {
		from: "Formular de contact <contact@mycasting.ro>",
		to: "contact@mycasting.ro",
		subject: `Formular de contact de la ${name} <${email}>`,
		text: `${name}\n\n${message}\n${email}`
	};

	// Send the email
	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			console.log(error);
			res.status(500).json({ message: "Failed to send email" });
		} else {
			console.log("Email sent: " + info.response);
			res.status(200).json({ message: "Email sent successfully!" });
		}
	});
});

app.listen(4000, () => {
	console.log("Server running on port 4000");
});

exports.api = functions
	.region("europe-west1")
	.runWith({ secrets: ["PASS_CONTACT"] })
	.https.onRequest(app);
