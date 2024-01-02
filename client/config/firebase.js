import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { collection, getFirestore, getDocs, getDoc, doc } from "firebase/firestore";
import { getStorage } from "firebase/storage";

import { constants } from "./constants.js";

const config = {
	apiKey: constants.FIREBASE_API_KEY,
	authDomain: "mycasting-c5275.firebaseapp.com",
	projectId: "mycasting-c5275",
	storageBucket: "mycasting-c5275.appspot.com",
	messagingSenderId: "282773183142",
	appId: "1:282773183142:web:b5420f52352cf264ff3267",
	measurementId: "G-3HDH7RE6E2"
};

const app = initializeApp(config);
export const auth = getAuth(app);
export const db = getFirestore();
export const storage = getStorage(app);

export const usersCollection = collection(db, "users");
export const adminsCollection = collection(db, "admins");

export default app;

// //reference to firestore collection and storage

// const storageRef = ref(storage);
// const imagesRef = ref(storage, "images");

// //create a new ref to storage
// const createNewPersonRef = (userName, fileName) => {
// 	return ref(storage, `images/${userName}/${fileName}`);
// };

// const AddDoc = async (colRef, data) => {
// 	const docRef = await addDoc(colRef, data);
// 	console.log("Document written with ID: ", docRef.id);
// };

// const getPersonRef = (name) => {
// 	return ref(storage, `images/${name}`);
// };

// //usage of ref ans storage
// /*

//     const imgRf = ref(imageRef, `images/${createNewPersonRef(name)}`);

//     const snapshot = await uploadBytes(imgRf, file.buffer); - file is the object passed from the request

//     const imageSource = await getDownloadURL(snapshot.ref);

// */

// //upload file to storage via a function
// const uploadToStorage = async (file, person) => {
// 	const storageRef = ref(storage, `images/${person}`);
// 	await uploadBytes(storageRef, file);
// 	return getDownloadURL(storageRef);
// };

//get all members from firestore via an array of objects
export const getMembersData = async () => {
	const arr = [];
	const querySnapshot = await getDocs(collection(db, "users"));
	querySnapshot.forEach((doc) => {
		arr.push(doc.data());
	});
	return arr;
};

export const getUserData = async (uid) => {
	const docRef = doc(db, "users", uid);
	const docSnap = await getDoc(docRef);

	if (docSnap.exists()) {
		return docSnap.data();
	} else try{
		throw new Error("No such document!");
	}
	catch
	{
		console.log("No such document!");
	}
};
