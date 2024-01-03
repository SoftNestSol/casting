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
