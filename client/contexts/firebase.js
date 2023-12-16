//firebase app
const { initializeApp } = require("firebase/app");

//firebase firestore
const { getFirestore, collection, getDocs, addDoc, setDoc, doc, getDoc } = require("firebase/firestore");

//firebase storage
const { getStorage, ref, uploadBytes, getDownloadURL } = require("firebase/storage");

const { getAuth, signInWithEmailAndPassword } = require("firebase/auth");

//firebase auth

//firebase config object
const firebaseConfig = {
	apiKey: "AIzaSyBvsPQCT1pTzIkxW3xcCKDQXCxZQzJTJ4s",
	authDomain: "mycasting-c5275.firebaseapp.com",
	projectId: "mycasting-c5275",
	storageBucket: "mycasting-c5275.appspot.com",
	messagingSenderId: "282773183142",
	appId: "1:282773183142:web:b5420f52352cf264ff3267",
	measurementId: "G-3HDH7RE6E2"
};

//initialize firebase app with storage and firestore, auth
const app = initializeApp(firebaseConfig);
const FirebaseApp = app;
const auth = getAuth(app);
const db = getFirestore();
const storage = getStorage();

//reference to firestore collection and storage
const colRef = collection(db, "Members");
const storageRef = ref(storage);
const imagesRef = ref(storage, "images");

//create a new ref to storage
const createNewPersonRef = (userName, fileName) => {
	return ref(storage, `images/${userName}/${fileName}`);
};

const AddDoc = async (colRef, data) => {
	const docRef = await addDoc(colRef, data);
	console.log("Document written with ID: ", docRef.id);
};

const getPersonRef = (name) => {
	return ref(storage, `images/${name}`);
};

//usage of ref ans storage
/*

    const imgRf = ref(imageRef, `images/${createNewPersonRef(name)}`);

    const snapshot = await uploadBytes(imgRf, file.buffer); - file is the object passed from the request

    const imageSource = await getDownloadURL(snapshot.ref);

*/

//upload file to storage via a function
const uploadToStorage = async (file, person) => {
	const storageRef = ref(storage, `images/${person}`);
	await uploadBytes(storageRef, file);
	return getDownloadURL(storageRef);
};

//get all members from firestore via an array of objects
const getMembersData = async () => {
	const arr = [];
	const querySnapshot = await getDocs(colRef);
	querySnapshot.forEach((doc) => {
		arr.push(doc.data());
	});
	return arr;
};



module.exports = {
	db,
	getDocs,
	uploadToStorage,
	getMembersData,
	storageRef,
	imagesRef,
	createNewPersonRef,
	uploadBytes,
	getDownloadURL,
	colRef,
	AddDoc,
	uploadBytes,
	firebaseConfig,
	FirebaseApp,
	auth,
	signInWithEmailAndPassword,
	ref, 
	imagesRef,
	storage,
	setDoc,
	doc,
	getDoc
};
