const functions = require("firebase-functions");
const { AdminApp } = require("./admin");
const express = require("express");
const cors = require("cors");


const corsOptions = {
	origin: "http://localhost:3000",
	optionsSuccessStatus: 200,
	credentials: true,
	allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept", "Origin"],
	methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"]
};

const { filesUpload } = require("./busboy-handle");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cors(corsOptions));


app.get("/getMembers", async (req, res) => {
	try {
		const members = await getMembersData();
		res.status(200).json(members);
	} catch (error) {
		console.error("Error fetching members:", error);
		res.status(500).send("Internal Server Error");
	}
});

app.listen(4000, () => {
	console.log("Server running on port 4000");
});

exports.api = functions.region("europe-west1").runWith({ secrets: [] }).https.onRequest(app);
