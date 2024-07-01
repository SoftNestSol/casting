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

const corsOptionsDNS = {
	origin: "https://mycasting.ro",
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

const admin = require("firebase-admin");

const serviceAccount = JSON.parse(
	JSON.stringify(functions.config().service_account)
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount)
});

app.post("/delete-user/:uid", cors(corsOptionsDNS), async (req, res) => {
	const uid = req.params.uid;

	console.log("UID: ", uid);

	const userDeleteAuthSucces = await admin.auth().deleteUser(uid);

	console.log("User deleted from Auth: ", userDeleteAuthSucces);

	const userDeleteFirestoreSucces = await admin
		.firestore()
		.collection("users")
		.doc(uid)
		.delete();

	console.log("User deleted from Firestore: ", userDeleteFirestoreSucces);

	res.status(200).json({
		message: "User deleted successfully!",
		userDeleteAuthSucces,
		userDeleteFirestoreSucces
	});
});

app.get("/get-timestamp/:uid", cors(corsOptionsDNS), async (req, res) => {
	const uid = req.params.uid;

	const user = await admin.auth().getUser(uid);

	console.log(user);
	console.log(user.metadata);
	console.log(user.metadata.creationTime);

	const timestamp = user.metadata.creationTime;

	const date = new Date(timestamp);

	// 1711704546.028
	// 1719752181

	const seconds = date.getTime();

	const authTimestamp = seconds / 1000;

	console.log("authTimestamp: ", authTimestamp);

	res.status(200).json({ timeStamp: authTimestamp });
});

app.post("/contact", cors(corsOptions), (req, res) => {
	const { name, email, message } = req.body;

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
