const functions = require("firebase-functions");
const {
	uploadToStorage,
	createNewPersonRef,
	imagesRef,
	colRef,
	AddDoc,
	getDownloadURL,
	uploadBytes,
	getMembersData
} = require("./firestore");
const express = require("express");
const cors = require("cors");

const corsOptions = {
	origin: "http://localhost:5173",
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

app.post("/register", filesUpload, async (req, res) => {
	const { name, age } = req.body;

	const files = req.files;

	const data = {
		name,
		age,
		imageArray: []
	};

	try {
		for (let i = 0; i < files.length; i++) {
			const file = files[i];
			const imgRf = createNewPersonRef(name, file.originalname);
			console.log("inainte de upload");
			const snapshot = await uploadBytes(imgRf, file.buffer);
			console.log("dupa upload");
			const imageSource = await getDownloadURL(snapshot.ref);
			data.imageArray.push(imageSource);
		}
	} catch (error) {
		res.status(500).json({ message: "Something went wrong" });
	}
	await AddDoc(colRef, data);

	//  res.status(200).json({message: "Member added successfully"});
});

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
